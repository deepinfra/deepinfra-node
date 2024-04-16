import {TokenClassificationBaseModel} from '@/lib/models/base';
import {IClientConfig} from '@/lib/types/common/client-config';


export class BertLargeNer extends TokenClassificationBaseModel {

  public static readonly endpoint : string = 'https://api.deepinfra.com/v1/inference/dslim/bert-large-NER';

  constructor(authToken: string, config?: IClientConfig) {
    super(BertLargeNer.endpoint, authToken, config);
  }

}
