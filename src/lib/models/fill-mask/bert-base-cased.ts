import {FillMaskBaseModel} from '@/lib/models/base';


export class BertBaseCased extends FillMaskBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/bert-base-cased';
  constructor(authToken: string) {
    super(BertBaseCased.endpoint, authToken);
  }
}
