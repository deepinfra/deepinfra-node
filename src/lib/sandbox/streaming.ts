import { Readable } from "node:stream";
import { SandboxExecError } from "@/lib/errors";
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
  for await (const chunk of stream) {
    buffer += chunk.toString("utf8");
    let newlineIndex: number;
    while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
      const event = parseEventLine(buffer.slice(0, newlineIndex));
      buffer = buffer.slice(newlineIndex + 1);
      if (event) {
        yield event;
      }
    }
  }
  const lastEvent = parseEventLine(buffer);
  if (lastEvent) {
    yield lastEvent;
  }
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
