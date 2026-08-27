import { Readable } from "node:stream";

const requestMock = jest.fn();
jest.mock("axios", () => {
  return {
    create: jest.fn(() => ({ request: requestMock })),
    isAxiosError: jest.fn(() => false),
  };
});

import {
  AuthenticationError,
  ConflictError,
  DeepInfraClient,
  Sandbox,
  SandboxFailedError,
  SandboxInfo,
} from "@/index";

function jsonResponse(status: number, body: unknown) {
  return {
    status,
    statusText: "",
    data: Buffer.from(JSON.stringify(body)),
    headers: {},
    config: {},
  };
}

function bufferResponse(status: number, data: Buffer) {
  return { status, statusText: "", data, headers: {}, config: {} };
}

function streamResponse(status: number, lines: string[]) {
  return {
    status,
    statusText: "",
    data: Readable.from(lines.map((line) => Buffer.from(line))),
    headers: {},
    config: {},
  };
}

function testSandbox(
  overrides: Partial<SandboxInfo> = {},
  client: DeepInfraClient,
) {
  return new Sandbox(
    {
      sandbox_id: "sb_1",
      plan: "",
      image: "",
      state: "running",
      tags: {},
      created_at: 0,
      provider: "",
      ...overrides,
    },
    { client },
  );
}

describe("Sandbox", () => {
  const client = new DeepInfraClient("test-key");

  beforeEach(() => {
    requestMock.mockReset();
  });

  it("create() posts to /v1/sandboxes and waits until running", async () => {
    requestMock
      .mockResolvedValueOnce(jsonResponse(200, { sandbox_id: "sb_1" }))
      .mockResolvedValueOnce(
        jsonResponse(200, {
          sandbox_id: "sb_1",
          state: "running",
          plan: "small",
          image: "",
          tags: { demo: "1" },
          created_at: 1_710_000_000,
          provider: "aws",
        }),
      );

    const sb = await Sandbox.create({
      plan: "small",
      tags: { demo: "1" },
      client,
    });

    expect(sb.id).toBe("sb_1");
    expect(sb.state).toBe("running");
    expect(sb.plan).toBe("small");
    expect(sb.tags).toEqual({ demo: "1" });
    expect(sb.provider).toBe("aws");
    expect(requestMock).toHaveBeenCalledTimes(2);

    const createCall = requestMock.mock.calls[0][0];
    expect(createCall.method).toBe("POST");
    expect(createCall.url).toBe("https://api.deepinfra.com/v1/sandboxes");
    expect(createCall.data).toEqual({
      image: "",
      plan: "small",
      tags: { demo: "1" },
      timeout_seconds: 0,
    });
    expect(createCall.headers.Authorization).toBe("Bearer test-key");
  });

  it("create() rejects with SandboxFailedError if the sandbox enters a terminal state", async () => {
    requestMock
      .mockResolvedValueOnce(jsonResponse(200, { sandbox_id: "sb_1" }))
      .mockResolvedValueOnce(
        jsonResponse(200, { sandbox_id: "sb_1", state: "failed" }),
      );

    await expect(Sandbox.create({ client })).rejects.toThrow(
      SandboxFailedError,
    );
  });

  it("fromId() fetches and maps a sandbox's info", async () => {
    requestMock.mockResolvedValueOnce(
      jsonResponse(200, {
        sandbox_id: "sb_1",
        state: "running",
        plan: "medium",
      }),
    );

    const sb = await Sandbox.fromId("sb_1", { client });

    expect(sb.id).toBe("sb_1");
    expect(sb.plan).toBe("medium");
    expect(requestMock.mock.calls[0][0]).toMatchObject({
      method: "GET",
      url: "https://api.deepinfra.com/v1/sandboxes/sb_1",
    });
  });

  it("list() filters by tag subset client-side", async () => {
    requestMock.mockResolvedValueOnce(
      jsonResponse(200, [
        { sandbox_id: "sb_1", tags: { job: "etl-42" } },
        { sandbox_id: "sb_2", tags: { job: "other" } },
      ]),
    );

    const sandboxes = await Sandbox.list({ tags: { job: "etl-42" }, client });

    expect(sandboxes.map((sb) => sb.id)).toEqual(["sb_1"]);
  });

  it("catalog() returns plans with fields verbatim from the API", async () => {
    requestMock.mockResolvedValueOnce(
      jsonResponse(200, [
        { id: "small", vcpu: 2, ram_gb: 4, disk_gb: 20, price_per_hour: 0.1 },
      ]),
    );

    const plans = await Sandbox.catalog({ client });

    expect(plans).toEqual([
      { id: "small", vcpu: 2, ram_gb: 4, disk_gb: 20, price_per_hour: 0.1 },
    ]);
  });

  it("stop() posts the op and waits for the stopped state", async () => {
    requestMock
      .mockResolvedValueOnce(bufferResponse(200, Buffer.alloc(0)))
      .mockResolvedValueOnce(
        jsonResponse(200, { sandbox_id: "sb_1", state: "stopped" }),
      );

    const sb = testSandbox({}, client);
    await sb.stop();

    expect(sb.state).toBe("stopped");
    expect(requestMock.mock.calls[0][0]).toMatchObject({
      method: "POST",
      url: "https://api.deepinfra.com/v1/sandboxes/sb_1/stop",
    });
  });

  it("terminate() sends a DELETE for the sandbox id", async () => {
    requestMock.mockResolvedValueOnce(bufferResponse(200, Buffer.alloc(0)));

    const sb = testSandbox({}, client);
    await sb.terminate();

    expect(requestMock.mock.calls[0][0]).toMatchObject({
      method: "DELETE",
      url: "https://api.deepinfra.com/v1/sandboxes/sb_1",
    });
  });

  it("exec() streams NDJSON and folds it into an ExecResult", async () => {
    requestMock.mockResolvedValueOnce(
      streamResponse(200, ['{"stdout":"hi"}\n', '{"returncode":0}\n']),
    );

    const sb = testSandbox({}, client);
    const result = await sb.exec("echo", "hi");

    expect(result.stdout).toBe("hi");
    expect(result.returncode).toBe(0);
    expect(result.check()).toBe(result);

    const call = requestMock.mock.calls[0][0];
    expect(call.method).toBe("POST");
    expect(call.responseType).toBe("stream");
    expect(call.url).toBe("https://api.deepinfra.com/v1/sandboxes/sb_1/exec");
    expect(call.data).toEqual({ command: ["echo", "hi"], timeout_seconds: 0 });
  });

  it("exec() maps a non-2xx stream response to a typed error", async () => {
    requestMock.mockResolvedValueOnce(
      streamResponse(409, ['{"error":"sandbox is stopped"}']),
    );

    const sb = testSandbox({}, client);
    await expect(sb.exec("true")).rejects.toThrow(ConflictError);
  });

  it("runPython() sugars to exec('python3', '-c', code)", async () => {
    requestMock.mockResolvedValueOnce(
      streamResponse(200, ['{"stdout":"42"}\n{"returncode":0}\n']),
    );

    const sb = testSandbox({}, client);
    const result = await sb.runPython("print(21 * 2)");

    expect(result.stdout).toBe("42");
    expect(requestMock.mock.calls[0][0].data.command).toEqual([
      "python3",
      "-c",
      "print(21 * 2)",
    ]);
  });

  it("fs.write() PUTs octet-stream content and fs.read() GETs it back", async () => {
    requestMock
      .mockResolvedValueOnce(bufferResponse(200, Buffer.alloc(0)))
      .mockResolvedValueOnce(
        bufferResponse(200, Buffer.from("hello from the host\n")),
      );

    const sb = testSandbox({}, client);
    await sb.fs.write("/work/hello.txt", "hello from the host\n");
    const data = await sb.fs.read("/work/hello.txt");

    expect(data.toString("utf8")).toBe("hello from the host\n");

    const writeCall = requestMock.mock.calls[0][0];
    expect(writeCall.method).toBe("PUT");
    expect(writeCall.params).toEqual({ path: "/work/hello.txt" });
    expect(writeCall.headers["Content-Type"]).toBe("application/octet-stream");
    expect(Buffer.isBuffer(writeCall.data)).toBe(true);

    const readCall = requestMock.mock.calls[1][0];
    expect(readCall.method).toBe("GET");
    expect(readCall.params).toEqual({ path: "/work/hello.txt" });
  });

  it("maps error statuses to typed errors", async () => {
    requestMock.mockResolvedValueOnce(
      jsonResponse(401, { error: "bad token" }),
    );
    await expect(Sandbox.fromId("sb_x", { client })).rejects.toThrow(
      AuthenticationError,
    );

    requestMock.mockResolvedValueOnce(
      jsonResponse(409, { error: "sandbox stopped" }),
    );
    await expect(Sandbox.fromId("sb_x", { client })).rejects.toThrow(
      ConflictError,
    );
  });

  it("propagates a missing-API-key AuthenticationError as-is, not wrapped as a connection error", async () => {
    const unauthedClient = new DeepInfraClient("");

    await expect(
      Sandbox.fromId("sb_x", { client: unauthedClient }),
    ).rejects.toThrow(AuthenticationError);
    expect(requestMock).not.toHaveBeenCalled();
  });
});
