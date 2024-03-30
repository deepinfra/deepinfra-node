import {TokenClassificationBaseModel} from '@/lib/models/base';

export class RobertaLargeNerEnglish extends TokenClassificationBaseModel {

  public static readonly endpoint : string = 'https://api.deepinfra.com/v1/inference/Jean-Baptiste/roberta-large-ner-english';

  constructor(authToken: string) {
    super(RobertaLargeNerEnglish.endpoint, authToken);
  }

}
