import { CustomModel } from "@/lib/models/base/custom-model";
import { FillMaskRequest } from "@/lib/types/token-classification/request";
import { TokenClassificationResponse } from "@/lib/types/token-classification/response";

export class TokenClassificationBaseModel extends CustomModel<
  FillMaskRequest,
  TokenClassificationResponse
> {
  protected constructor(
    protected endpoint: string,
    protected authToken: string,
  ) {
    super(endpoint, authToken);
  }
}
