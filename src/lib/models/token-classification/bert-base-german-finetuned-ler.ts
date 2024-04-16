import { TokenClassificationBaseModel } from "@/lib/models/base";
import { IClientConfig } from "@/lib/types/common/client-config";

export class BertBaseGermanFinetunedLer extends TokenClassificationBaseModel {
  public static readonly endpoint: string =
    "https://api.deepinfra.com/v1/inference/mrm8488/bert-base-german-finetuned-ler";

  constructor(authToken: string, config?: Partial<IClientConfig>) {
    super(BertBaseGermanFinetunedLer.endpoint, authToken, config);
  }
}
