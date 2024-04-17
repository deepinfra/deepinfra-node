import { CustomModel } from "@/lib/models/base/custom-model";
import { FillMaskRequest } from "@/lib/types/token-classification/request";
import { TokenClassificationResponse } from "@/lib/types/token-classification/response";
import { IClientConfig } from "@/lib/types/common/client-config";
import { FillMaskModels } from "@/lib/models/model-names/fill-mask";

export class FillMask extends CustomModel<
  FillMaskRequest,
  TokenClassificationResponse
> {
  constructor(
    modelName: FillMaskModels,
    authToken: string,
    config?: Partial<IClientConfig>,
  ) {
    super(modelName, authToken, config);
  }
}
