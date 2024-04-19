import { CustomModel } from "@/lib/models/base/custom-model";
import { FillMaskRequest } from "@/lib/types/token-classification/request";
import { TokenClassificationResponse } from "@/lib/types/token-classification/response";
import { IClientConfig } from "@/lib/types/common/client-config";

export class FillMask extends CustomModel<
  FillMaskRequest,
  TokenClassificationResponse
> {
  constructor(
    modelName: string,
    authToken?: string,
    config?: Partial<IClientConfig>,
  ) {
    super(modelName, authToken, config);
  }
}
