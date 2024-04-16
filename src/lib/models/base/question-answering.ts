import { QuestionAnsweringRequest } from "@/lib/types/questions-answering/request";
import { QuestionAnsweringResponse } from "@/lib/types/questions-answering/response";
import { CustomModel } from "@/lib/models/base/custom-model";

export class QuestionAnsweringBaseModel extends CustomModel<
  QuestionAnsweringRequest,
  QuestionAnsweringResponse
> {
  protected constructor(
    protected endpoint: string,
    protected authToken: string,
  ) {
    super(endpoint, authToken);
  }
}
