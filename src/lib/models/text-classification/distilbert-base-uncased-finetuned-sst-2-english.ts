import {TextClassificationBaseModel} from '@/lib/models/base';
import {IClientConfig} from '@/lib/types/common/client-config';


export class DistilBertBaseUncasedFinetunedSst2English extends TextClassificationBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/distilbert-base-uncased-finetuned-sst-2-english';

  constructor(authToken: string, config?: IClientConfig) {
    super(DistilBertBaseUncasedFinetunedSst2English.endpoint, authToken, config);
  }
}
