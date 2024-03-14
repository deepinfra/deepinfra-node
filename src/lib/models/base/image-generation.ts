import {BaseModel} from '@/lib/models/base';
import {AxiosResponse} from 'axios';
import {ImageGenerationResponse} from '@/lib/types/image-generation/response';
import {ImageGenerationRequest} from '@/lib/types/image-generation/request';


export abstract class ImageGenerationBaseModel extends BaseModel {

  protected constructor(endpoint: string, authToken: string) {
    super(endpoint, authToken);
  }

  public async generate(input: ImageGenerationRequest): Promise<ImageGenerationResponse> {

    const body = {
      input,
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
