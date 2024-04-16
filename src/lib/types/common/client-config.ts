import {
  INITIAL_BACKOFF,
  MAX_RETRIES,
  SUBSEQUENT_BACKOFF,
} from "@/lib/constants/client";

export interface IClientConfig {
  maxRetries: number;
  initialBackoff: number;
  subsequentBackoff: number;
}

export class ClientConfig implements IClientConfig {
  maxRetries: number;
  initialBackoff: number;
  subsequentBackoff: number;

  constructor(config?: Partial<IClientConfig>) {
    this.maxRetries = config?.maxRetries ?? MAX_RETRIES;
    this.initialBackoff = config?.initialBackoff ?? INITIAL_BACKOFF;
    this.subsequentBackoff = config?.subsequentBackoff ?? SUBSEQUENT_BACKOFF;
  }
}
