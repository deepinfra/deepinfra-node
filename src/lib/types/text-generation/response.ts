import {Status} from "@/lib/types/common/status";


export interface TextGenerationResponse {
  request_id: string;
  inference_status: Status;
  results: GeneratedText[];
  num_tokens: number;
  num_input_tokens: number;
}

export interface GeneratedText {
  generated_text: string;
}
