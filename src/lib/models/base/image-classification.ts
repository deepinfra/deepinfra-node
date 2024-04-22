import { ImageClassificationRequest } from "@/lib/types/image-classification/request";
import { ImageClassificationResponse } from "@/lib/types/image-classification/response";
import fs from "node:fs";
import {BaseModel} from "@/lib/models/base/base-model";
import {IClientConfig} from "@/lib/types/common/client-config";

export class ImageClassification extends BaseModel {
  constructor(
    modelName: string,
    authToken?: string,
    config?: Partial<IClientConfig>,
  ) {
    super(modelName, authToken, config);
  }

  async generate(
    body: ImageClassificationRequest,
  ): Promise<ImageClassificationResponse> {
    const { image } = body;
    const base64Content = fs.readFileSync(image).toString("base64");
    const response = await this.client.post<ImageClassificationResponse>({
      ...body,
      image: base64Content,
    });
    return response.data;
  }
}
