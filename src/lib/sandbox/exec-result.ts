import { CommandFailedError } from "@/lib/errors";

/** Aggregated result of a sandbox command. */
export class ExecResult {
  stdout: string;
  stderr: string;
  returncode: number;

  constructor({
    stdout = "",
    stderr = "",
    returncode,
  }: {
    stdout?: string;
    stderr?: string;
    returncode: number;
  }) {
    this.stdout = stdout;
    this.stderr = stderr;
    this.returncode = returncode;
  }

  /** Return self, or throw CommandFailedError if the command exited non-zero. */
  check(): ExecResult {
    if (this.returncode !== 0) {
      throw new CommandFailedError(this);
    }
    return this;
  }
}
