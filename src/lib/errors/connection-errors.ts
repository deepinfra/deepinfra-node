import { DeepInfraError } from "@/lib/errors/deep-infra-error";

/** The request never received a response (DNS, connect, TLS, socket errors). */
export class APIConnectionError extends DeepInfraError {
  constructor(message = "Connection error") {
    super(message);
  }
}

/** The request timed out on the client side. */
export class APITimeoutError extends APIConnectionError {
  constructor(message = "Request timed out") {
    super(message);
  }
}

/** Retries were exhausted without getting a response. */
export class MaxRetriesExceededError extends APIConnectionError {
  constructor(message = "Maximum retries exceeded") {
    super(message);
  }
}
