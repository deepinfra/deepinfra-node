import {
  DeepInfraClient,
  RequestSpec,
  defaultClient,
  parseJsonBody,
} from "@/lib/http";
import { SandboxFailedError, SandboxTimeoutError } from "@/lib/errors";
import { SandboxInfo, parseSandboxInfo } from "@/lib/sandbox/sandbox-info";
import { SandboxPlan, parseSandboxPlan } from "@/lib/sandbox/sandbox-plan";
import { ExecResult } from "@/lib/sandbox/exec-result";
import {
  ExecOptions,
  WaitOptions,
  CreateOptions,
} from "@/lib/sandbox/sandbox-options";
import { foldExecEvents, iterNdjson } from "@/lib/sandbox/streaming";
import { Duration, parseDuration } from "@/lib/sandbox/duration";
import { tagsMatch } from "@/lib/sandbox/tags";
import { SANDBOXES, idPath } from "@/lib/sandbox/paths";
import { SandboxFS } from "@/lib/sandbox/sandbox-fs";
import { backoffDelays, sleep } from "@/lib/utils/backoff";

const DEFAULT_WAIT_TIMEOUT = 300;
const DEFAULT_EXEC_TIMEOUT = 60;
const EXEC_HTTP_GRACE = 30;

const RUNNING = "running";
const STOPPED = "stopped";
const TERMINAL_STATES = new Set(["failed", "deleted"]);

/** Handle to one sandbox. Fields mirror the server; refresh() updates them. */
export class Sandbox {
  private info: SandboxInfo;
  /** The client backing this sandbox's requests. Not part of the stable public API. */
  readonly _client: DeepInfraClient;
  readonly fs: SandboxFS;

  constructor(
    info: SandboxInfo,
    { client }: { client?: DeepInfraClient } = {},
  ) {
    this.info = info;
    this._client = client ?? defaultClient();
    this.fs = new SandboxFS(this);
  }

  get id(): string {
    return this.info.sandbox_id;
  }

  get plan(): string {
    return this.info.plan;
  }

  get image(): string {
    return this.info.image;
  }

  get state(): string {
    return this.info.state;
  }

  get tags(): Record<string, string> {
    return this.info.tags;
  }

  get createdAt(): number {
    return this.info.created_at;
  }

  get provider(): string {
    return this.info.provider;
  }

  toString(): string {
    return `Sandbox(id=${JSON.stringify(this.id)}, state=${JSON.stringify(this.state)}, plan=${JSON.stringify(this.plan)})`;
  }

  // -- constructors --

  /** Create a sandbox; by default block until it is running. */
  static async create({
    image = "",
    plan = "",
    timeout,
    tags,
    wait = true,
    waitTimeout = DEFAULT_WAIT_TIMEOUT,
    client,
  }: CreateOptions = {}): Promise<Sandbox> {
    const c = client ?? defaultClient();
    const response = await c.request(createSpec(image, plan, timeout, tags));
    const body = parseJsonBody(response.data) as { sandbox_id: string };
    const sandbox = new Sandbox(
      parseSandboxInfo({ sandbox_id: body.sandbox_id }),
      {
        client: c,
      },
    );
    await (wait ? sandbox.waitUntilRunning(waitTimeout) : sandbox.refresh());
    return sandbox;
  }

  static async fromId(
    sandboxId: string,
    { client }: { client?: DeepInfraClient } = {},
  ): Promise<Sandbox> {
    const c = client ?? defaultClient();
    const response = await c.request(getSpec(sandboxId));
    return new Sandbox(
      parseSandboxInfo(parseJsonBody(response.data) as Record<string, unknown>),
      {
        client: c,
      },
    );
  }

  /** List this account's sandboxes, optionally filtered by tag subset. */
  static async list({
    tags,
    client,
  }: { tags?: Record<string, string>; client?: DeepInfraClient } = {}): Promise<
    Sandbox[]
  > {
    const c = client ?? defaultClient();
    const response = await c.request(listSpec());
    const items = parseJsonBody(response.data) as Record<string, unknown>[];
    return fromList(items, tags, c);
  }

  /** List available sandbox plans with their specs and hourly pricing. */
  static async catalog({ client }: { client?: DeepInfraClient } = {}): Promise<
    SandboxPlan[]
  > {
    const c = client ?? defaultClient();
    const response = await c.request(catalogSpec());
    const items = parseJsonBody(response.data) as Record<string, unknown>[];
    return items.map((item) => parseSandboxPlan(item));
  }

  // -- lifecycle --

  async refresh(): Promise<this> {
    const response = await this._client.request(getSpec(this.id));
    this.info = parseSandboxInfo(
      parseJsonBody(response.data) as Record<string, unknown>,
    );
    return this;
  }

  waitUntilRunning(timeout = DEFAULT_WAIT_TIMEOUT): Promise<this> {
    return this.waitForState(RUNNING, timeout);
  }

  waitUntilStopped(timeout = DEFAULT_WAIT_TIMEOUT): Promise<this> {
    return this.waitForState(STOPPED, timeout);
  }

  /**
   * Stop the sandbox (frees compute, keeps disk).
   *
   * Stopping is asynchronous server-side; by default block until the state
   * is "stopped", so a following start() cannot race it.
   */
  async stop({
    wait = true,
    waitTimeout = DEFAULT_WAIT_TIMEOUT,
  }: WaitOptions = {}): Promise<void> {
    await this._client.request(opSpec(this.id, "stop"));
    if (wait) {
      await this.waitUntilStopped(waitTimeout);
    }
  }

  async start({
    wait = true,
    waitTimeout = DEFAULT_WAIT_TIMEOUT,
  }: WaitOptions = {}): Promise<void> {
    await this._client.request(opSpec(this.id, "start"));
    if (wait) {
      await this.waitUntilRunning(waitTimeout);
    }
  }

  async terminate(): Promise<void> {
    await this._client.request(deleteSpec(this.id));
  }

  // -- execution --

  /** Run a command and return its aggregated stdout/stderr/returncode. */
  async exec(...args: Array<string | ExecOptions>): Promise<ExecResult> {
    const { command, options } = splitExecArgs(args);
    if (command.length === 0) {
      throw new Error("exec() needs at least one command argument");
    }
    const response = await this._client.stream(
      this.execSpec(command, options.timeout),
    );
    return foldExecEvents(iterNdjson(response.data));
  }

  /**
   * Run a Python snippet (python3 -c).
   *
   * For large scripts prefer fs.write("/workspace/script.py", code) then
   * exec("python3", "/workspace/script.py").
   */
  runPython(code: string, options: ExecOptions = {}): Promise<ExecResult> {
    return this.exec("python3", "-c", code, options);
  }

  // -- internals --

  private async waitForState(
    target: string,
    timeoutSeconds: number,
  ): Promise<this> {
    const deadline = Date.now() + timeoutSeconds * 1000;
    const delays = backoffDelays();
    for (;;) {
      await this.refresh();
      this.checkWaitState(target);
      if (this.state === target) {
        return this;
      }
      const delay = delays.next().value;
      if (Date.now() + delay * 1000 > deadline) {
        throw this.waitTimeoutError(target, timeoutSeconds);
      }
      await sleep(delay * 1000);
    }
  }

  private checkWaitState(target: string): void {
    if (TERMINAL_STATES.has(this.state) && this.state !== target) {
      throw new SandboxFailedError(
        `Sandbox ${this.id} entered state ${JSON.stringify(this.state)}`,
        {
          sandboxId: this.id,
        },
      );
    }
  }

  private waitTimeoutError(
    target: string,
    timeoutSeconds: number,
  ): SandboxTimeoutError {
    return new SandboxTimeoutError(
      `Sandbox ${this.id} still ${JSON.stringify(this.state)} (waiting for ${JSON.stringify(target)}) ` +
        `after ${timeoutSeconds}s (terminate it if unwanted)`,
      { sandboxId: this.id },
    );
  }

  private execSpec(
    command: string[],
    timeout: Duration | undefined,
  ): RequestSpec {
    const timeoutSeconds = timeout === undefined ? 0 : parseDuration(timeout);
    // Read timeout outlives the server-side command timeout so the server's
    // kill surfaces as a terminal error line, not a socket error.
    const httpTimeout =
      (timeoutSeconds || DEFAULT_EXEC_TIMEOUT) + EXEC_HTTP_GRACE;
    return {
      method: "POST",
      path: idPath(this.id, "exec"),
      json: { command, timeout_seconds: timeoutSeconds },
      timeout: httpTimeout,
    };
  }
}

function splitExecArgs(args: Array<string | ExecOptions>): {
  command: string[];
  options: ExecOptions;
} {
  const last = args.at(-1);
  if (args.length > 0 && typeof last === "object" && last !== null) {
    return { command: args.slice(0, -1) as string[], options: last };
  }
  return { command: args as string[], options: {} };
}

function fromList(
  items: Record<string, unknown>[],
  tags: Record<string, string> | undefined,
  client: DeepInfraClient,
): Sandbox[] {
  const sandboxes = items.map(
    (item) => new Sandbox(parseSandboxInfo(item), { client }),
  );
  return tags ? sandboxes.filter((sb) => tagsMatch(tags, sb.tags)) : sandboxes;
}

function createSpec(
  image: string,
  plan: string,
  timeout: Duration | undefined,
  tags: Record<string, string> | undefined,
): RequestSpec {
  return {
    method: "POST",
    path: SANDBOXES,
    json: {
      image,
      plan,
      tags: tags ?? {},
      timeout_seconds: timeout === undefined ? 0 : parseDuration(timeout),
    },
  };
}

function getSpec(sandboxId: string): RequestSpec {
  return { method: "GET", path: idPath(sandboxId), retryConnect: true };
}

function listSpec(): RequestSpec {
  return { method: "GET", path: SANDBOXES, retryConnect: true };
}

function catalogSpec(): RequestSpec {
  return { method: "GET", path: `${SANDBOXES}/catalog`, retryConnect: true };
}

function opSpec(sandboxId: string, op: string): RequestSpec {
  return { method: "POST", path: idPath(sandboxId, op) };
}

function deleteSpec(sandboxId: string): RequestSpec {
  return { method: "DELETE", path: idPath(sandboxId) };
}
