import {TokenClassificationBaseModel} from '@/lib/models/base';


export class BertEnglishUncasedFinetunedPos extends TokenClassificationBaseModel {

  public static readonly endpoint : string = 'https://api.deepinfra.com/v1/inference/vblagoje/bert-english-uncased-finetuned-pos';

  constructor(authToken: string) {
    super(BertEnglishUncasedFinetunedPos.endpoint, authToken);
  }

}
