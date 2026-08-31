import { DeepInfraError } from "@/lib/errors/deep-infra-error";

/** Structural shape of ExecResult (@/lib/sandbox/exec-result) — kept local to avoid a cross-module import cycle. */
interface ExecResultLike {
  stdout: string;
  stderr: string;
  returncode: number;
}

/** Base class for sandbox-lifecycle errors raised client-side. */
export class SandboxError extends DeepInfraError {}

/**
 * Waiting for a sandbox state transition failed. `sandboxId` identifies the
 * sandbox so callers can inspect or clean it up
 * (`(await Sandbox.fromId(err.sandboxId)).terminate()`) — in particular when
 * `Sandbox.create({ wait: true })` throws and no handle was returned.
 */
export class SandboxWaitError extends SandboxError {
  sandboxId?: string;

  constructor(message: string, { sandboxId }: { sandboxId?: string } = {}) {
    super(message);
    this.sandboxId = sandboxId;
  }
}

/** Waiting for a sandbox state transition timed out. */
export class SandboxTimeoutError extends SandboxWaitError {}

/** The sandbox entered a terminal failed/deleted state. */
export class SandboxFailedError extends SandboxWaitError {}

/** The exec stream reported an error or ended without a return code. */
export class SandboxExecError extends SandboxError {}

/** Raised by ExecResult.check() when the command exited non-zero. */
export class CommandFailedError extends SandboxError {
  result: ExecResultLike;

  constructor(result: ExecResultLike) {
    const stderrTail = result.stderr ? result.stderr.slice(-500) : "";
    super(
      `Command exited with code ${result.returncode}` +
        (stderrTail ? `: ${stderrTail}` : ""),
    );
    this.result = result;
  }
}
