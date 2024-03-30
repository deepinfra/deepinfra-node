import {FillMaskBaseModel} from '@/lib/models/base';


export class BertBaseDutchCased extends FillMaskBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/GroNLP/bert-base-dutch-cased';
  constructor(authToken: string) {
    super(BertBaseDutchCased.endpoint, authToken);
  }
}
