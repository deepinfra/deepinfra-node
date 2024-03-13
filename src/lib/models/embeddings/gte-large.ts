import {BaseModel} from '@/lib/models/base';
import {EmbeddingsResponse} from '@/lib/models/embeddings/types/response';
import {EmbeddingsRequest} from '@/lib/models/embeddings/types/request';


export class GteLarge extends BaseModel {
  public static endpoint: string = 'https://api.deepinfra.com/v1/inference/thenlper/gte-large';

  constructor(authToken: string) {
    super(GteLarge.endpoint, authToken);
  }

  public async generate(inputs: string[], normalize: boolean = false): Promise<EmbeddingsResponse> {

    const body = {
      inputs, normalize,
    } as EmbeddingsRequest;

    try {
      const response = await this.client.post(body);
      const {data, status} = response;
      if (status !== 200) {
        throw new Error(`HTTP error! status: ${status}`);
      }
      return data as EmbeddingsResponse;
    } catch (error) {
      console.error('Error generating text:', error);
      throw error;
    }
  }
}
