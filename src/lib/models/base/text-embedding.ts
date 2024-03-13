import { BaseModel } from '@/lib/models/base';
import { EmbeddingsRequest } from '@/lib/types/embeddings/request';
import { EmbeddingsResponse } from '@/lib/types/embeddings/response';

export abstract class TextEmbeddingBaseModel extends BaseModel {

  protected constructor(authToken: string, protected endpoint: string) {
    super(endpoint, authToken);
  }

  public async generate(inputs: string[], normalize: boolean = false): Promise<EmbeddingsResponse> {
    const body = {
      inputs,
      normalize,
    } as EmbeddingsRequest;

    try {
      const response = await this.client.post<EmbeddingsResponse>(body);
      const { data, status } = response;
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
