import axios, {AxiosError} from 'axios';

export interface MixtralTextGenerationInput {
  input: string;
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
  stream?: boolean;
}

interface GeneratedText {
  generated_text: string;
}

interface TextGenerationOut {
  results: GeneratedText[];
  num_tokens: number;
  num_input_tokens?: number;
  request_id: string;
  inference_status: {
    status: string; runtime_ms: number; cost: number; tokens_generated: number; tokens_input?: number;
  };
}

export class MixtralModelService {

  constructor(private readonly authToken: string) {}


  async generate(input: string, stream: boolean = false): Promise<TextGenerationOut> {
    try {
      const body = {
        input, stream
      } as MixtralTextGenerationInput;
      const response = await axios.post<TextGenerationOut>('https://api.deepinfra.com/v1/inference/mistralai/Mixtral-8x7B-Instruct-v0.1', body, {
        headers: {
          'Content-Type': 'application/json', 'Authorization': `Bearer ${this.authToken}`
        }, timeout: 5000
      });

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        // Handle Axios errors
        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Status:', error.response.status);
          console.error('Headers:', error.response.headers);
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Error message:', error.message);
        }
      } else {
        console.error('An unexpected error occurred:', error);
      }

      throw new Error('Failed to generate text');
    }
  }
}
