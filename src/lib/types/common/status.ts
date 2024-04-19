export interface Status {
  status: 'unknown' | 'queued' | 'running' | 'succeeded' | 'failed';
  runtime_ms: number;
  cost: number;
  tokens_generated: number;
  tokens_input: number;
}
