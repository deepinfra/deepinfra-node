import {TokenClassificationBaseModel} from '@/lib/models/base';
import {ClientConfig} from "@/lib/types/common/client-config";


export class BertLargeNer extends TokenClassificationBaseModel {

  public static readonly endpoint : string = 'https://api.deepinfra.com/v1/inference/dslim/bert-large-NER';

  constructor(authToken: string, config?: ClientConfig) {
    super(BertLargeNer.endpoint, authToken, config);
  }

}
