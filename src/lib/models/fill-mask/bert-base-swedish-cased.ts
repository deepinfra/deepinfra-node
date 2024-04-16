import { FillMaskBaseModel } from "@/lib/models/base";

export class BertBaseSwedishCased extends FillMaskBaseModel {
  public static readonly endpoint: string =
    "https://api.deepinfra.com/v1/inference/KB/bert-base-swedish-cased";
  constructor(authToken: string) {
    super(BertBaseSwedishCased.endpoint, authToken);
  }
}
