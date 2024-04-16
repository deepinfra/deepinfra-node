import {TokenClassificationBaseModel} from '@/lib/models/base';
import {IClientConfig} from '@/lib/types/common/client-config';


export class BertBaseNer extends TokenClassificationBaseModel {

  public static readonly endpoint : string = 'https://api.deepinfra.com/v1/inference/dslim/bert-base-NER';

  constructor(authToken: string, config?: Partial<IClientConfig>) {
    super(BertBaseNer.endpoint, authToken, config);
  }

}
