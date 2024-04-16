import { TextClassificationRequest } from "@/lib/types/text-classification/request";
import { TextClassificationResponse } from "@/lib/types/text-classification/response";
import { CustomModel } from "@/lib/models/base/custom-model";

export class TextClassificationBaseModel extends CustomModel<
  TextClassificationRequest,
  TextClassificationResponse
> {
  protected constructor(
    protected endpoint: string,
    protected authToken: string,
  ) {
    super(endpoint, authToken);
  }
}
