import { QuestionAnsweringRequest } from "@/lib/types/questions-answering/request";
import { QuestionAnsweringResponse } from "@/lib/types/questions-answering/response";
import { CustomModel } from "@/lib/models/base/custom-model";
import { IClientConfig } from "@/lib/types/common/client-config";
import { QuestionAnsweringModels } from "@/lib/models/model-names";

export class QuestionAnswering extends CustomModel<
  QuestionAnsweringRequest,
  QuestionAnsweringResponse
> {
  constructor(
    modelName: QuestionAnsweringModels,
    authToken: string,
    config?: Partial<IClientConfig>,
  ) {
    super(modelName, authToken, config);
  }
}
