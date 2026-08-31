import { Readable } from "node:stream";
import { StringDecoder } from "node:string_decoder";
import {
  APIConnectionError,
  APITimeoutError,
  SandboxExecError,
} from "@/lib/errors";
import { ExecResult } from "@/lib/sandbox/exec-result";

/**
 * NDJSON decoding for the sandbox exec stream. The wire format is one JSON
 * object per line:
 *   {"stdout": "chunk"} / {"stderr": "chunk"}   interleaved output
 *   {"returncode": 0}                            terminal line
 *   {"error": "message"}                         terminal line on failure
 *   {}                                            heartbeat (ignored)
 */
export type NdjsonEvent = Record<string, unknown>;

function parseEventLine(rawLine: string): NdjsonEvent | undefined {
  const line = rawLine.trim();
  if (!line) {
    return undefined;
  }
  const event: unknown = JSON.parse(line);
  if (
    event &&
    typeof event === "object" &&
    !Array.isArray(event) &&
    Object.keys(event).length > 0
  ) {
    return event as NdjsonEvent;
  }
  return undefined;
}

/** Split a byte/text stream into decoded NDJSON events; blank lines and {} heartbeats are skipped. */
export async function* iterNdjson(
  stream: Readable,
): AsyncGenerator<NdjsonEvent> {
  let buffer = "";
  // StringDecoder holds back any trailing incomplete multi-byte UTF-8
  // sequence between writes, so a character split across two chunks decodes
  // correctly instead of producing replacement characters on either side.
  const decoder = new StringDecoder("utf8");
  try {
    for await (const chunk of stream) {
      buffer += decoder.write(chunk);
      let newlineIndex: number;
      while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
        const event = parseEventLine(buffer.slice(0, newlineIndex));
        buffer = buffer.slice(newlineIndex + 1);
        if (event) {
          yield event;
        }
      }
    }
  } catch (err) {
    throw mapStreamError(err);
  }
  buffer += decoder.end();
  const lastEvent = parseEventLine(buffer);
  if (lastEvent) {
    yield lastEvent;
  }
}

/**
 * Map a raw Node stream error (e.g. a stalled connection aborted mid-body)
 * to a typed SDK error. Unlike the initial request/headers phase, errors
 * here aren't necessarily AxiosErrors, so this checks message/code directly.
 */
function mapStreamError(err: unknown): APIConnectionError {
  if (err instanceof Error) {
    const code = (err as NodeJS.ErrnoException).code;
    if (
      err.message === "aborted" ||
      code === "ECONNABORTED" ||
      code === "ECONNRESET"
    ) {
      return new APITimeoutError(err.message || "Request timed out");
    }
    return new APIConnectionError(err.message || "Connection error");
  }
  return new APIConnectionError("Connection error");
}

/** Accumulate exec-stream events into an ExecResult. */
export async function foldExecEvents(
  events: AsyncIterable<NdjsonEvent>,
): Promise<ExecResult> {
  const stdout: string[] = [];
  const stderr: string[] = [];
  let returncode: number | undefined;
  for await (const event of events) {
    if ("error" in event) {
      throw new SandboxExecError(String(event.error));
    }
    if ("stdout" in event) {
      stdout.push(String(event.stdout));
    }
    if ("stderr" in event) {
      stderr.push(String(event.stderr));
    }
    if ("returncode" in event) {
      returncode = Number(event.returncode);
    }
  }
  if (returncode === undefined) {
    throw new SandboxExecError("Exec stream ended without a return code");
  }
  return new ExecResult({
    stdout: stdout.join(""),
    stderr: stderr.join(""),
    returncode,
  });
}
