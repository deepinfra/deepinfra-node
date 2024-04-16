import {BaseModel} from '@/lib/models/base';
import {AxiosResponse} from 'axios';
import {TextToImageResponse} from '@/lib/types/text-to-image/response';
import {TextToImageRequest} from '@/lib/types/text-to-image/request';
import {IClientConfig} from '@/lib/types/common/client-config';


export abstract class TextToImageBaseModel extends BaseModel {

  protected constructor(endpoint: string, authToken: string, config?: Partial<IClientConfig>) {
    super(endpoint, authToken, config);
  }

  public async generate(body: TextToImageRequest): Promise<TextToImageResponse> {

    try {
      const response: AxiosResponse<TextToImageResponse> = await this.client.post<TextToImageResponse>(body);
      return response.data;
    } catch (error) {
      console.error('Error generating image:', error);
      throw error;
    }
  }
}
