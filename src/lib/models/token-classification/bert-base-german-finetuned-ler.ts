import {TokenClassificationBaseModel} from '@/lib/models/base';


export class BertBaseGermanFinetunedLer extends TokenClassificationBaseModel {

  public static readonly endpoint : string = 'https://api.deepinfra.com/v1/inference/mrm8488/bert-base-german-finetuned-ler';

  constructor(authToken: string) {
    super(BertBaseGermanFinetunedLer.endpoint, authToken);
  }

}
