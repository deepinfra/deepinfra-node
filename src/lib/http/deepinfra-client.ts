import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { Readable } from "node:stream";
import { inspect } from "node:util";
import {
  APIConnectionError,
  APITimeoutError,
  AuthenticationError,
  MaxRetriesExceededError,
  exceptionFromResponse,
} from "@/lib/errors";
import { RequestSpec } from "@/lib/http/request-spec";
import { parseJsonBody } from "@/lib/http/parse-json-body";
import { backoffDelays, sleep } from "@/lib/utils/backoff";

const DEFAULT_BASE_URL = "https://api.deepinfra.com";
const DEFAULT_TIMEOUT = 60;
const DEFAULT_MAX_RETRIES = 2;
const RETRYABLE_STATUSES = new Set([502, 503, 504]);

const USER_AGENT = `deepinfra-node node/${process.version}`;

/**
 * Holds auth/base-url config and lazily-created axios instance.
 *
 * Every SDK feature that isn't a legacy per-model inference call (sandboxes,
 * and eventually the inference wrappers) funnels through this client.
 */
export class DeepInfraClient {
  #apiKeyValue?: string;
  readonly baseUrl: string;
  /** In seconds, matching RequestSpec.timeout and the rest of the SDK's duration values. */
  readonly timeout: number;
  readonly maxRetries: number;
  private httpClient?: AxiosInstance;

  constructor(
    apiKey?: string,
    {
      baseUrl,
      timeout = DEFAULT_TIMEOUT,
      maxRetries = DEFAULT_MAX_RETRIES,
    }: { baseUrl?: string; timeout?: number; maxRetries?: number } = {},
  ) {
    this.#apiKeyValue = apiKey;
    this.baseUrl = (
      baseUrl ||
      process.env.DEEPINFRA_BASE_URL ||
      DEFAULT_BASE_URL
    ).replace(/\/+$/, "");
    this.timeout = timeout;
    this.maxRetries = maxRetries;
  }

  get apiKey(): string {
    if (this.#apiKeyValue === undefined) {
      this.#apiKeyValue = process.env.DEEPINFRA_API_KEY;
    }
    if (!this.#apiKeyValue) {
      throw new AuthenticationError();
    }
    return this.#apiKeyValue;
  }

  async request(spec: RequestSpec): Promise<AxiosResponse> {
    const delays = backoffDelays();
    for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
      let response: AxiosResponse | undefined;
      let error: APIConnectionError | undefined;
      try {
        response = await this.http().request(this.requestConfig(spec));
      } catch (error_) {
        // Only genuine axios/network failures are connection errors; anything
        // else (e.g. AuthenticationError while building the request config)
        // must propagate as-is, not get folded into transport-error retries.
        if (!axios.isAxiosError(error_)) {
          throw error_;
        }
        error = mapTransportError(error_);
      }
      if (response) {
        if (this.shouldRetryStatus(spec, response, attempt)) {
          await sleep(delays.next().value * 1000);
          continue;
        }
        // Outside the try/catch above, so a thrown APIStatusError here
        // propagates directly instead of being folded into transport retries.
        return checked(response);
      }
      if (spec.retryConnect && attempt < this.maxRetries) {
        await sleep(delays.next().value * 1000);
        continue;
      }
      throw this.finalError(spec, error, attempt);
    }
    throw new Error("unreachable");
  }

  /**
   * Issue a streaming request; error statuses throw before returning.
   * Streaming requests are never retried (exec is not idempotent).
   */
  async stream(spec: RequestSpec): Promise<AxiosResponse<Readable>> {
    let response: AxiosResponse<Readable>;
    try {
      response = await this.http().request<Readable>({
        ...this.requestConfig(spec),
        responseType: "stream",
      });
    } catch (error) {
      if (!axios.isAxiosError(error)) {
        throw error;
      }
      throw mapTransportError(error);
    }
    if (isErrorStatus(response.status)) {
      const body = await readStreamToBuffer(response.data);
      throw exceptionFromResponse({ ...response, data: parseJsonBody(body) });
    }
    return response;
  }

  toString(): string {
    return `DeepInfraClient(baseUrl=${JSON.stringify(this.baseUrl)})`;
  }

  [inspect.custom](): string {
    return this.toString();
  }

  private requestConfig(spec: RequestSpec) {
    const headers: Record<string, string> = {
      Authorization: `Bearer ${this.apiKey}`,
      "User-Agent": USER_AGENT,
      ...spec.headers,
    };
    const url = /^https?:\/\//.test(spec.path)
      ? spec.path
      : this.baseUrl + spec.path;
    return {
      method: spec.method,
      url,
      headers,
      params: spec.params,
      data: spec.json === undefined ? spec.content : spec.json,
      timeout: (spec.timeout ?? this.timeout) * 1000,
      validateStatus: () => true,
      // Fetch raw bytes always (like httpx's `.content`) instead of axios's
      // default JSON auto-parsing, so binary fs.read() bodies aren't corrupted.
      // Callers that expect JSON parse response.data themselves via parseJsonBody().
      responseType: "arraybuffer" as const,
    };
  }

  private shouldRetryStatus(
    spec: RequestSpec,
    response: AxiosResponse,
    attempt: number,
  ): boolean {
    // Status-code retries only for GETs: a 502/503/504 on a POST may have
    // already had a side effect (created a sandbox, billed an inference).
    return (
      !!spec.retryConnect &&
      spec.method === "GET" &&
      RETRYABLE_STATUSES.has(response.status) &&
      attempt < this.maxRetries
    );
  }

  private finalError(
    spec: RequestSpec,
    error: APIConnectionError | undefined,
    attempt: number,
  ): APIConnectionError {
    if (spec.retryConnect && attempt >= this.maxRetries && error) {
      return new MaxRetriesExceededError(
        `Maximum retries exceeded (${this.maxRetries}): ${error.message}`,
      );
    }
    return error ?? new APIConnectionError();
  }

  private http(): AxiosInstance {
    if (!this.httpClient) {
      this.httpClient = axios.create({ timeout: this.timeout * 1000 });
    }
    return this.httpClient;
  }
}

function checked(response: AxiosResponse): AxiosResponse {
  if (isErrorStatus(response.status)) {
    throw exceptionFromResponse({
      ...response,
      data: parseJsonBody(response.data),
    });
  }
  return response;
}

function isErrorStatus(status: number): boolean {
  return status >= 400;
}

/** Callers must have already confirmed `err` is an AxiosError (network/transport failure). */
function mapTransportError(err: AxiosError): APIConnectionError {
  if (err.code === "ECONNABORTED" || err.code === "ETIMEDOUT") {
    return new APITimeoutError(err.message || "Request timed out");
  }
  return new APIConnectionError(err.message || "Connection error");
}

function readStreamToBuffer(stream: Readable): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    stream.on("data", (chunk: Buffer) => chunks.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(chunks)));
    stream.on("error", reject);
  });
}

let defaultClientInstance: DeepInfraClient | undefined;

/** Lazy process-wide client backing zero-config Sandbox.create() etc. */
export function defaultClient(): DeepInfraClient {
  if (!defaultClientInstance) {
    defaultClientInstance = new DeepInfraClient();
  }
  return defaultClientInstance;
}
