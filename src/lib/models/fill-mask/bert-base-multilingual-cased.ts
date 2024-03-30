import {FillMaskBaseModel} from '@/lib/models/base';


export class BertBaseMultilingualCased extends FillMaskBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/GroNLP/bert-base-multilingual-cased';
  constructor(authToken: string) {
    super(BertBaseMultilingualCased.endpoint, authToken);
  }
}
