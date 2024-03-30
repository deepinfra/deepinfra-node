import {TextClassificationBaseModel} from '@/lib/models/base';


export class TwitterRobertaBaseEmotion extends TextClassificationBaseModel {
  public static readonly endpoint = 'https://api.deepinfra.com/v1/inference/cardiffnlp/twitter-roberta-base-emotion';
  constructor(authToken: string) {
    super(TwitterRobertaBaseEmotion.endpoint, authToken);
  }
}
