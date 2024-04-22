import fs from "node:fs";
import { BaseModel } from "@/lib/models/base/base-model";
import { IClientConfig } from "@/lib/types/common/client-config";
import { ImageRequest } from "@/lib/types/common/image-request";

export class ImageBaseModel<
  RequestType extends ImageRequest,
  ResponseType,
> extends BaseModel {
  constructor(
    modelName: string,
    authToken?: string,
    config?: Partial<IClientConfig>,
  ) {
    super(modelName, authToken, config);
  }

  async generate(body: RequestType): Promise<ResponseType> {
    const { image } = body;
    const base64Content = fs.readFileSync(image).toString("base64");
    const response = await this.client.post<ResponseType>({
      ...body,
      image: base64Content,
    });
    return response.data;
  }
}
