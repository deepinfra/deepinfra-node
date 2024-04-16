import {TokenClassificationBaseModel} from '@/lib/models/base';
import {IClientConfig} from '@/lib/types/common/client-config';


export class BertBaseMultilingualCasedNerHrl extends TokenClassificationBaseModel {

  public static readonly endpoint : string = 'https://api.deepinfra.com/v1/inference/Davlan/bert-base-multilingual-cased-ner-hrl';

  constructor(authToken: string, config?: IClientConfig) {
    super(BertBaseMultilingualCasedNerHrl.endpoint, authToken, config);
  }

}
