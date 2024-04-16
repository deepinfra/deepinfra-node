import {TokenClassificationBaseModel} from '@/lib/models/base';
import {IClientConfig} from '@/lib/types/common/client-config';


export class BertSpanishCasedFinetunedNer extends TokenClassificationBaseModel {

  public static readonly endpoint : string = 'https://api.deepinfra.com/v1/inference/mrm8488/bert-spanish-cased-finetuned-ner';

  constructor(authToken: string, config?: IClientConfig) {
    super(BertSpanishCasedFinetunedNer.endpoint, authToken, config);
  }

}
