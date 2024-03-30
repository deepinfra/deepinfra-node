import {TokenClassificationBaseModel} from '@/lib/models/base';


export class BertBaseNerUncased extends TokenClassificationBaseModel {

  public static readonly endpoint : string = 'https://api.deepinfra.com/v1/inference/dslim/bert-base-NER-uncased';

  constructor(authToken: string) {
    super(BertBaseNerUncased.endpoint, authToken);
  }

}
