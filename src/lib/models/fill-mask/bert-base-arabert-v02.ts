import { FillMaskBaseModel } from "@/lib/models/base";

export class BertBaseAraBertV02 extends FillMaskBaseModel {
  public static readonly endpoint =
    "https://api.deepinfra.com/v1/inference/aubmindlab/bert-base-arabertv02";
  constructor(authToken: string) {
    super(BertBaseAraBertV02.endpoint, authToken);
  }
}
