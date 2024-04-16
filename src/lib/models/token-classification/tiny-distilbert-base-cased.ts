import { TokenClassificationBaseModel } from "@/lib/models/base";
import { IClientConfig } from "@/lib/types/common/client-config";

export class TinyDistilBertBaseCased extends TokenClassificationBaseModel {
  public static readonly endpoint: string =
    "https://api.deepinfra.com/v1/inference/sshleifer/tiny-distilbert-base-cased";

  constructor(authToken: string, config?: Partial<IClientConfig>) {
    super(TinyDistilBertBaseCased.endpoint, authToken, config);
  }
}
