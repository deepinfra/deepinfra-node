import {TextToImageBaseModel} from '@/lib/models/base/text-to-image';
import {TextToImageResponse} from '@/lib/types/text-to-image/response';
import {TextToImageRequest} from '@/lib/types/text-to-image/request';
import {AxiosResponse} from 'axios';


export class Sdxl extends TextToImageBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/stability-ai/sdxl';
  constructor(authToken: string) {
    super(Sdxl.endpoint, authToken);
  }

  public async generate(input: TextToImageRequest): Promise<TextToImageResponse> {
    const body = {
      input
    };

    try {
      const response: AxiosResponse<TextToImageResponse> = await this.client.post<TextToImageResponse>(body);
      return response.data;
    } catch (error) {
      console.error('Error generating image:', error);
      throw error;
    }
  }
}
