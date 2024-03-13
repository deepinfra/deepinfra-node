import {EmbeddingStatus} from './status';
export interface EmbeddingsResponse {
  embeddings: number[][];
  input_tokens: number;
  request_id?: string;
  inference_status: EmbeddingStatus;
}
