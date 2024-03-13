import {BaseModel} from '@/lib/models/base';
import {EmbeddingsResponse} from '@/lib/models/embeddings/types/response';
import {EmbeddingsRequest} from '@/lib/models/embeddings/types/request';



export class BgeBaseEnV15 extends BaseModel{
  public static endpoint: string = 'https://api.deepinfra.com/v1/inference/BAAI/bge-base-en-v1.5';

  constructor(authToken: string) {
    super(BgeBaseEnV15.endpoint, authToken);
  }

  public async generate(inputs: string[], normalize: boolean = false): Promise<EmbeddingsResponse> {

    const body = {
      inputs,
      normalize,
    } as EmbeddingsRequest;

    try {
      const response = await this.client.post<EmbeddingsResponse>(body);
      const {data,status} = response;
      if (status !== 200) {
        throw new Error(`HTTP error! status: ${status}`);
      }
      return data;
    } catch (error) {
      console.error('Error generating embeddings:', error);
      throw error;
    }
  }
}
