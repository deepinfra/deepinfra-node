import {FillMaskBaseModel} from "@/lib/models/base";


export class BertBaseChinese extends FillMaskBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/bert-base-chinese';
  constructor(authToken: string) {
    super(BertBaseChinese.endpoint, authToken);
  }
}
