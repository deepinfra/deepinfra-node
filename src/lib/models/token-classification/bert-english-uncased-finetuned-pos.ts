import { TokenClassificationBaseModel } from "@/lib/models/base";
import { IClientConfig } from "@/lib/types/common/client-config";

export class BertEnglishUncasedFinetunedPos extends TokenClassificationBaseModel {
  public static readonly endpoint: string =
    "https://api.deepinfra.com/v1/inference/vblagoje/bert-english-uncased-finetuned-pos";

  constructor(authToken: string, config?: Partial<IClientConfig>) {
    super(BertEnglishUncasedFinetunedPos.endpoint, authToken, config);
  }
}
