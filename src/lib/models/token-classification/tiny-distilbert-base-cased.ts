import { TokenClassificationBaseModel } from "@/lib/models/base";

export class TinyDistilBertBaseCased extends TokenClassificationBaseModel {
  public static readonly endpoint: string =
    "https://api.deepinfra.com/v1/inference/sshleifer/tiny-distilbert-base-cased";

  constructor(authToken: string) {
    super(TinyDistilBertBaseCased.endpoint, authToken);
  }
}
