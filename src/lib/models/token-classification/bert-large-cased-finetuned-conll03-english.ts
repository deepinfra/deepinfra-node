import {TokenClassificationBaseModel} from '@/lib/models/base';
import {ClientConfig} from "@/lib/types/common/client-config";


export class BertLargeCasedFinetunedConll03English extends TokenClassificationBaseModel {

  public static readonly endpoint : string = 'https://api.deepinfra.com/v1/inference/dbmdz/bert-large-cased-finetuned-conll03-english';

  constructor(authToken: string, config?: ClientConfig) {
    super(BertLargeCasedFinetunedConll03English.endpoint, authToken, config);
  }

}
