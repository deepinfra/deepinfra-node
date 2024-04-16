import { QuestionAnsweringRequest } from "@/lib/types/questions-answering/request";
import { QuestionAnsweringResponse } from "@/lib/types/questions-answering/response";
import { CustomModel } from "@/lib/models/base/custom-model";
import { IClientConfig } from "@/lib/types/common/client-config";

export class QuestionAnsweringBaseModel extends CustomModel<
  QuestionAnsweringRequest,
  QuestionAnsweringResponse
> {
  protected constructor(
    protected endpoint: string,
    protected authToken: string,
    config?: Partial<IClientConfig>,
  ) {
    super(endpoint, authToken, config);
  }
}
