import {Status} from '@/lib/types/common/status';

export interface EmbeddingsResponse {
  embeddings: number[][];
  input_tokens: number;
  request_id?: string;
  inference_status: Status;
}
