import { FillMaskBaseModel } from "@/lib/models/base";

export class BertBaseGermanCased extends FillMaskBaseModel {
  public static readonly endpoint: string =
    "https://api.deepinfra.com/v1/inference/GroNLP/bert-base-german-cased";
  constructor(authToken: string) {
    super(BertBaseGermanCased.endpoint, authToken);
  }
}
