import { BaseModel } from "@/lib/models/base/base-model";
import { IClientConfig } from "@/lib/types/common/client-config";
import { ImageRequest } from "@/lib/types/common/image-request";
import {FormDataUtils} from "@/lib/utils/form-data";

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
    const formData = await FormDataUtils.prepareFormData<RequestType>(body, ["image"]);
    const response = await this.client.post<ResponseType>(formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });
    return response.data;
  }
}
