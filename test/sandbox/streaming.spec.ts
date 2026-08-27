import { Readable } from "node:stream";
import { foldExecEvents, iterNdjson } from "@/lib/sandbox/streaming";
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

describe("foldExecEvents", () => {
  it("accumulates interleaved stdout/stderr and captures the return code", async () => {
    const events = [
      { stdout: "a" },
      { stderr: "x" },
      { stdout: "b" },
      { returncode: 0 },
    ];
    const result = await foldExecEvents(fromArray(events));
    expect(result.stdout).toBe("ab");
    expect(result.stderr).toBe("x");
    expect(result.returncode).toBe(0);
  });

  it("throws SandboxExecError on an {error} event", async () => {
    const events = [{ stdout: "partial" }, { error: "boom" }];
    await expect(foldExecEvents(fromArray(events))).rejects.toThrow(
      SandboxExecError,
    );
  });

  it("throws SandboxExecError when the stream ends without a return code", async () => {
    const events = [{ stdout: "no end" }];
    await expect(foldExecEvents(fromArray(events))).rejects.toThrow(
      /without a return code/,
    );
  });
});

async function* fromArray<T>(items: T[]): AsyncGenerator<T> {
  for (const item of items) {
    yield item;
  }
}
