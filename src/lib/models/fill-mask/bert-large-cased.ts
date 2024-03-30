import {FillMaskBaseModel} from '@/lib/models/base';


export class BertLargeCased extends FillMaskBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/bert-large-cased';
  constructor(authToken: string) {
    super(BertLargeCased.endpoint, authToken);
  }
}
