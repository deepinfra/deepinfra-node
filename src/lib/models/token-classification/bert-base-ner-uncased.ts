import {TokenClassificationBaseModel} from '@/lib/models/base';
import {ClientConfig} from "@/lib/types/common/client-config";


export class BertBaseNerUncased extends TokenClassificationBaseModel {

  public static readonly endpoint : string = 'https://api.deepinfra.com/v1/inference/dslim/bert-base-NER-uncased';

  constructor(authToken: string, config?: ClientConfig) {
    super(BertBaseNerUncased.endpoint, authToken, config);
  }

}
