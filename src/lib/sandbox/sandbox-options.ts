import { DeepInfraClient } from "@/lib/http";
import { Duration } from "@/lib/sandbox/duration";

export interface ExecOptions {
  timeout?: Duration;
  /**
   * Stop waiting for the command: the pending call or loop throws the
   * signal's reason. The command keeps running in the sandbox until it exits
   * or times out.
   */
  signal?: AbortSignal;
}

export interface WaitOptions {
  wait?: boolean;
  waitTimeout?: number;
}

export interface CreateOptions extends WaitOptions {
  plan?: string;
  timeout?: Duration;
  tags?: Record<string, string>;
  client?: DeepInfraClient;
}
