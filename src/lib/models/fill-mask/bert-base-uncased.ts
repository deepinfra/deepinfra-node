import {FillMaskBaseModel} from '@/lib/models/base';


export class BertBaseUncased extends FillMaskBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/bert-base-uncased';
  constructor(authToken: string) {
    super(BertBaseUncased.endpoint, authToken);
  }
}
