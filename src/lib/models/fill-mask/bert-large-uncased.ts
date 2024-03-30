import {FillMaskBaseModel} from '@/lib/models/base';


export class BertLargeUncased extends FillMaskBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/bert-large-uncased';
  constructor(authToken: string) {
    super(BertLargeUncased.endpoint, authToken);
  }
}
