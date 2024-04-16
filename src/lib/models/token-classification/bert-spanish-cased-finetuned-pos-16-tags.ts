import { TokenClassificationBaseModel } from "@/lib/models/base";

export class BertSpanishCasedFinetunedPos16Tags extends TokenClassificationBaseModel {
  public static readonly endpoint: string =
    "https://api.deepinfra.com/v1/inference/mrm8488/bert-spanish-cased-finetuned-pos-16-tags";

  constructor(authToken: string) {
    super(BertSpanishCasedFinetunedPos16Tags.endpoint, authToken);
  }
}
