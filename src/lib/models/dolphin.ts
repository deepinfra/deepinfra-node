import {TextGenerationResponse} from '@/lib/types/text-generation-response';


export class DolphinModelService {
  private static endpoint: string = 'https://api.deepinfra.com/v1/inference/cognitivecomputations/dolphin-2.6-mixtral-8x7b';

  constructor(private readonly authToken: string) {}

  public async generate(input: string, stream: boolean = false): Promise<TextGenerationResponse> {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authToken}`,
    };

    const body = {
      input: input,
      stream: stream,
    };

    try {
      const response = await fetch(DolphinModelService.endpoint, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error generating text:', error);
      throw error;
    }
  }
}
