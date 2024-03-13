import {TextGenerationResponse} from '@/lib/types/text-generation-response';
import {BaseModel} from '@/lib/models/base';


export class Dolphin extends BaseModel {
  public static endpoint: string = 'https://api.deepinfra.com/v1/inference/cognitivecomputations/dolphin-2.6-mixtral-8x7b';

  constructor(authToken: string) {
    super(Dolphin.endpoint, authToken);
  }

  public async generate(input: string, stream: boolean = false): Promise<TextGenerationResponse> {

    const body = {
      input: input,
      stream: stream,
    };

    try {
      const response = await this.client.post(body);
      const {data,status} = response;
      if (status !== 200) {
        throw new Error(`HTTP error! status: ${status}`);
      }
      return data as TextGenerationResponse;
    } catch (error) {
      console.error('Error generating text:', error);
      throw error;
    }
  }
}
