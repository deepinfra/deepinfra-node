import { TextClassificationRequest } from "@/lib/types/text-classification/request";
import { TextClassificationResponse } from "@/lib/types/text-classification/response";
import { CustomModel } from "@/lib/models/base/custom-model";
import { IClientConfig } from "@/lib/types/common/client-config";

export class TextClassificationBaseModel extends CustomModel<
  TextClassificationRequest,
  TextClassificationResponse
> {
  protected constructor(
    protected endpoint: string,
    protected authToken: string,
    config?: Partial<IClientConfig>,
  ) {
    super(endpoint, authToken, config);
  }
}
