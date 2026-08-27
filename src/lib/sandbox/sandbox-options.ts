import { DeepInfraClient } from "@/lib/http";
import { Duration } from "@/lib/sandbox/duration";

export interface ExecOptions {
  timeout?: Duration;
}

export interface WaitOptions {
  wait?: boolean;
  waitTimeout?: number;
}

export interface CreateOptions extends WaitOptions {
  image?: string;
  plan?: string;
  timeout?: Duration;
  tags?: Record<string, string>;
  client?: DeepInfraClient;
}
