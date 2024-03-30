import {TextClassificationBaseModel} from "@/lib/models/base";


export class TwitterRobertaBaseSentiment extends TextClassificationBaseModel {
  public static readonly endpoint = 'https://api.deepinfra.com/v1/inference/cardiffnlp/twitter-roberta-base-sentiment';
  constructor(authToken: string) {
    super(TwitterRobertaBaseSentiment.endpoint, authToken);
  }
}
