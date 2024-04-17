import { BaseModel } from "@/lib/models/base";
import { EmbeddingsRequest } from "@/lib/types/embeddings/request";
import { EmbeddingsResponse } from "@/lib/types/embeddings/response";
import { IClientConfig } from "@/lib/types/common/client-config";

export class Embeddings extends BaseModel {
  constructor(
    modelName: string,
    authToken: string,
    config?: Partial<IClientConfig>,
  ) {
    super(modelName, authToken, config);
  }

  public async generate(body: EmbeddingsRequest): Promise<EmbeddingsResponse> {
    try {
      const response = await this.client.post<EmbeddingsResponse>(body);
      const { data, status } = response;
      if (status !== 200) {
        throw new Error(`HTTP error! status: ${status}`);
      }
      return data;
    } catch (error) {
      console.error("Error generating embeddings:", error);
      throw error;
    }
  }
}
