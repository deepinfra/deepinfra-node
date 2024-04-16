import { AxiosError } from "axios";
import { BaseModel } from "@/lib/models/base";
import { TextGenerationResponse } from "@/lib/types/text-generation/response";
import { TextGenerationRequest } from "@/lib/types/text-generation/request";
import { IClientConfig } from "@/lib/types/common/client-config";

export abstract class TextGenerationBaseModel extends BaseModel {
  protected constructor(
    protected endpoint: string,
    authToken: string,
    config?: Partial<IClientConfig>,
  ) {
    super(endpoint, authToken, config);
  }

  public async generate<T extends TextGenerationResponse>(
    body: TextGenerationRequest,
  ): Promise<T> {
    try {
      const response = await this.client.post<T>(body);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw new Error("Failed to generate text");
    }
  }

  private handleError(error: unknown) {
    if (error instanceof AxiosError) {
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Status:", error.response.status);
        console.error("Headers:", error.response.headers);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
    } else {
      console.error("An unexpected error occurred:", error);
    }
  }
}
