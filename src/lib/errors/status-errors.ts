import { AxiosResponse } from "axios";
import { DeepInfraError } from "@/lib/errors/deep-infra-error";

/** The API returned a non-success HTTP status code. */
export class APIStatusError extends DeepInfraError {
  statusCode: number;
  response?: AxiosResponse;

  constructor(
    message: string,
    { statusCode, response }: { statusCode: number; response?: AxiosResponse },
  ) {
    super(`${statusCode}: ${message}`);
    this.statusCode = statusCode;
    this.response = response;
  }
}

export class BadRequestError extends APIStatusError {}

export class AuthenticationError extends APIStatusError {
  constructor({
    message = "No API key provided. Pass apiKey or set the " +
      "DEEPINFRA_API_KEY environment variable " +
      "(https://deepinfra.com/dash/api_keys).",
    statusCode = 401,
    response,
  }: { message?: string; statusCode?: number; response?: AxiosResponse } = {}) {
    super(message, { statusCode, response });
  }
}

export class PermissionDeniedError extends APIStatusError {}

export class NotFoundError extends APIStatusError {}

export class ConflictError extends APIStatusError {}

export class ContentTooLargeError extends APIStatusError {}

/**
 * The API returned 429: a rate or resource limit was exceeded. For the
 * sandbox API this is the per-account active-sandbox cap; TooManySandboxesError
 * is kept as an alias for that reading.
 */
export class RateLimitError extends APIStatusError {}

export const TooManySandboxesError = RateLimitError;

export class CapacityError extends APIStatusError {}

export class InternalServerError extends APIStatusError {}

const STATUS_TO_ERROR: Record<
  number,
  new (
    message: string,
    opts: { statusCode: number; response?: AxiosResponse },
  ) => APIStatusError
> = {
  400: BadRequestError,
  401: AuthenticationError as unknown as new (
    message: string,
    opts: { statusCode: number; response?: AxiosResponse },
  ) => APIStatusError,
  403: PermissionDeniedError,
  404: NotFoundError,
  409: ConflictError,
  413: ContentTooLargeError,
  429: RateLimitError,
  503: CapacityError,
};

/**
 * Pull a human-readable message out of the known API error body shapes.
 * Handles {"error": "..."}, the OpenAI-style {"error": {"message": ...}},
 * and FastAPI's {"detail": ...} wrapping of either.
 */
export function extractErrorMessage(body: unknown): string | undefined {
  if (typeof body !== "object" || body === null) {
    return undefined;
  }
  const record = body as Record<string, unknown>;
  for (const key of ["error", "detail"]) {
    const value = record[key];
    if (typeof value === "string" && value) {
      return value;
    }
    if (typeof value === "object" && value !== null) {
      const nested =
        extractErrorMessage(value) ??
        (value as Record<string, unknown>).message;
      if (typeof nested === "string" && nested) {
        return nested;
      }
    }
  }
  return undefined;
}

/** Build the right APIStatusError subclass from an error response. */
export function exceptionFromResponse(response: AxiosResponse): APIStatusError {
  const message =
    extractErrorMessage(response.data) ||
    (typeof response.data === "string" && response.data.slice(0, 500)) ||
    response.statusText ||
    "API error";
  const status = response.status;
  const ErrorClass =
    STATUS_TO_ERROR[status] ??
    (status >= 500 ? InternalServerError : APIStatusError);
  return new ErrorClass(message, { statusCode: status, response });
}
