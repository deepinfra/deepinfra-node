import { Method } from "axios";

/**
 * A single API operation, independent of how it's executed.
 *
 * `path` is relative to the client's base URL, or a full absolute URL.
 * `retryConnect`: retry on transport errors (and, for GETs, 502/503/504).
 * `timeout` is in seconds, matching the rest of the SDK's duration values.
 */
export interface RequestSpec {
  method: Method;
  path: string;
  params?: Record<string, unknown>;
  json?: unknown;
  content?: Buffer | string;
  headers?: Record<string, string>;
  retryConnect?: boolean;
  timeout?: number;
}
