import fs from "node:fs";
import { BaseModel } from "@/lib/models/base/base-model";
import { IClientConfig } from "@/lib/types/common/client-config";
import { ImageRequest } from "@/lib/types/common/image-request";
import FormData from "form-data";
import {ReadStreamUtils} from "@/lib/utils/read-stream";

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
    const { image , ...rest} = body;
    const formData = new FormData();
    const readStream = await ReadStreamUtils.getReadStream(image);
    formData.append("image", readStream);
    Object.entries(rest).forEach(([key, value]) => {
      formData.append(key, JSON.stringify(value));
    });
    const response = await this.client.post<ResponseType>(formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });
    return response.data;
  }
}
