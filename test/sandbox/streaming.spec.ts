import { Readable } from "node:stream";
import {
  ExecEvent,
  foldExecEvents,
  iterNdjson,
  toExecEvents,
} from "@/lib/sandbox/streaming";
import { SandboxExecError } from "@/lib/errors";

function streamOf(chunks: string[]): Readable {
  return Readable.from(chunks.map((chunk) => Buffer.from(chunk)));
}

async function collect<T>(iterable: AsyncIterable<T>): Promise<T[]> {
  const out: T[] = [];
  for await (const item of iterable) {
    out.push(item);
  }
  return out;
}

describe("iterNdjson", () => {
  it("decodes one event per line", async () => {
    const events = await collect(
      iterNdjson(streamOf(['{"stdout":"a"}\n{"stdout":"b"}\n'])),
    );
    expect(events).toEqual([{ stdout: "a" }, { stdout: "b" }]);
  });

  it("reassembles a line split across chunks", async () => {
    const events = await collect(
      iterNdjson(streamOf(['{"std', 'out":"chunked"}\n'])),
    );
    expect(events).toEqual([{ stdout: "chunked" }]);
  });

  it("skips blank lines and {} heartbeats", async () => {
    const events = await collect(
      iterNdjson(streamOf(['{"stdout":"a"}\n\n{}\n{"stdout":"b"}\n'])),
    );
    expect(events).toEqual([{ stdout: "a" }, { stdout: "b" }]);
  });

  it("yields a final event with no trailing newline", async () => {
    const events = await collect(iterNdjson(streamOf(['{"returncode":0}'])));
    expect(events).toEqual([{ returncode: 0 }]);
  });

  it("decodes a multi-byte UTF-8 character split across a chunk boundary", async () => {
    // "é" is 2 bytes (0xC3 0xA9) in UTF-8; split the buffer between them so
    // neither chunk holds a complete character on its own.
    const full = Buffer.from('{"stdout":"héllo"}\n', "utf8");
    const splitAt = full.indexOf(Buffer.from("é", "utf8")) + 1;
    const stream = Readable.from([
      full.subarray(0, splitAt),
      full.subarray(splitAt),
    ]);

    const events = await collect(iterNdjson(stream));

    expect(events).toEqual([{ stdout: "héllo" }]);
  });
});

describe("toExecEvents", () => {
  it("types output chunks and ends with the exit event", async () => {
    const wire = [{ stdout: "a" }, { stderr: "x" }, { returncode: 3 }];
    expect(await collect(toExecEvents(fromArray(wire)))).toEqual([
      { type: "stdout", data: "a" },
      { type: "stderr", data: "x" },
      { type: "exit", returncode: 3 },
    ]);
  });

  it("throws SandboxExecError on an {error} event, after the output before it", async () => {
    const events = toExecEvents(
      fromArray([{ stdout: "partial" }, { error: "boom" }]),
    );
    expect((await events.next()).value).toEqual({
      type: "stdout",
      data: "partial",
    });
    const error = await events.next().catch((error_) => error_);
    expect(error).toBeInstanceOf(SandboxExecError);
    expect(error.message).toBe("boom");
  });

  it("throws SandboxExecError when the stream ends without a return code", async () => {
    const events = toExecEvents(fromArray([{ stdout: "no end" }]));
    await expect(collect(events)).rejects.toThrow(/without a return code/);
  });
});

describe("foldExecEvents", () => {
  it("accumulates interleaved stdout/stderr and captures the return code", async () => {
    const events: ExecEvent[] = [
      { type: "stdout", data: "a" },
      { type: "stderr", data: "x" },
      { type: "stdout", data: "b" },
      { type: "exit", returncode: 0 },
    ];
    const result = await foldExecEvents(fromArray(events));
    expect(result.stdout).toBe("ab");
    expect(result.stderr).toBe("x");
    expect(result.returncode).toBe(0);
  });

  it("throws SandboxExecError when the events end without an exit", async () => {
    const events: ExecEvent[] = [{ type: "stdout", data: "no end" }];
    await expect(foldExecEvents(fromArray(events))).rejects.toThrow(
      SandboxExecError,
    );
  });
});

async function* fromArray<T>(items: T[]): AsyncGenerator<T> {
  for (const item of items) {
    yield item;
  }
}
