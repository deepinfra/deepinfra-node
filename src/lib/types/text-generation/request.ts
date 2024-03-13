export interface TextGenerationRequest {
  input: string;
  stream?: boolean;
  max_new_tokens?: number;
  temperature?: number;
  top_p?: number;
  top_k?: number;
  repetition_penalty?: number;
  stop?: string[];
  num_responses?: number;
  response_format?: {
    type: string;
  };
  presence_penalty?: number;
  frequency_penalty?: number;
  webhook?: string;
}


