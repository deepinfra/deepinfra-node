import {TokenClassificationBaseModel} from '@/lib/models/base';


export class BertLargeNer extends TokenClassificationBaseModel {

  public static readonly endpoint : string = 'https://api.deepinfra.com/v1/inference/dslim/bert-large-NER';

  constructor(authToken: string) {
    super(BertLargeNer.endpoint, authToken);
  }

}
