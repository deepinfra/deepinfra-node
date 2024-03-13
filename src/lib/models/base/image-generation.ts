import {BaseModel} from '@/lib/models/base';
import {AxiosResponse} from 'axios';
import {ImageGenerationResponse} from '@/lib/types/image-generation/response';


export abstract class ImageGenerationBaseModel extends BaseModel {

  protected constructor(endpoint: string, authToken: string) {
    super(endpoint, authToken);
  }

  public async generate(prompt: string): Promise<ImageGenerationResponse> {

    const body = {
      input:{prompt},
    };

    try {
      const response: AxiosResponse<ImageGenerationResponse> = await this.client.post<ImageGenerationResponse>(body);
      return response.data;
    } catch (error) {
      console.error('Error generating image:', error);
      throw error;
    }
  }
}
