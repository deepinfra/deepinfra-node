

export interface TextGenerationResponse {
  request_id: string;
  inference_status: {
    status: string;
    runtime_ms: number;
    cost: number;
    tokens_generated: number;
  };
  results: GeneratedText[];
  num_tokens: number;
  num_input_tokens: number;
}

export interface GeneratedText {
  generated_text: string;
}
