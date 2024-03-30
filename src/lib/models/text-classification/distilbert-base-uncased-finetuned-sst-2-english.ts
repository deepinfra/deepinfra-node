import {TextClassificationBaseModel} from '@/lib/models/base';


export class DistilBertBaseUncasedFinetunedSst2English extends TextClassificationBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/distilbert-base-uncased-finetuned-sst-2-english';

  constructor(authToken: string) {
    super(DistilBertBaseUncasedFinetunedSst2English.endpoint, authToken);
  }
}
