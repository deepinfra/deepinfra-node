import { TextClassificationRequest } from "@/lib/types/text-classification/request";
import { TextClassificationResponse } from "@/lib/types/text-classification/response";
import { CustomModel } from "@/lib/models/base/custom-model";
import { IClientConfig } from "@/lib/types/common/client-config";

export class TextClassification extends CustomModel<
  TextClassificationRequest,
  TextClassificationResponse
> {
  constructor(
    modelName: string,
    authToken?: string,
    config?: Partial<IClientConfig>,
  ) {
    super(modelName, authToken, config);
  }
}
