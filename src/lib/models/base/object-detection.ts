import { BaseModel } from "@/lib/models/base/base-model";
import * as fs from "node:fs";
import { ObjectDetectionRequest } from "@/lib/types/object-detection/request";
import { ObjectDetectionResponse } from "@/lib/types/object-detection/response";
import { IClientConfig } from "@/lib/types/common/client-config";

export class ObjectDetection extends BaseModel {
  constructor(
    modelName: string,
    authToken?: string,
    config?: Partial<IClientConfig>,
  ) {
    super(modelName, authToken, config);
  }

  async generate(
    body: ObjectDetectionRequest,
  ): Promise<ObjectDetectionResponse> {
    const { image } = body;
    const base64Content = fs.readFileSync(image).toString("base64");
    const response = await this.client.post<ObjectDetectionResponse>({
      ...body,
      image: base64Content,
    });
    return response.data;
  }
}
