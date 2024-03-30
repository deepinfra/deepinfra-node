import {TokenClassificationBaseModel} from '@/lib/models/base';


export class BertBaseMultilingualCasedNerHrl extends TokenClassificationBaseModel {

  public static readonly endpoint : string = 'https://api.deepinfra.com/v1/inference/Davlan/bert-base-multilingual-cased-ner-hrl';

  constructor(authToken: string) {
    super(BertBaseMultilingualCasedNerHrl.endpoint, authToken);
  }

}
