export interface ClientConfig {
  maxRetries?: number;
  initialBackoff?: number;
  subsequentBackoff?: number;
}
