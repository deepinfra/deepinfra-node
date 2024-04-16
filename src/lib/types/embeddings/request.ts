export interface EmbeddingsRequest {
  inputs: string[];
  normalize?: boolean;
  image?: string;
  webhook?: string;
}
