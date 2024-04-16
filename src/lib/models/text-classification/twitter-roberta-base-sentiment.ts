import {TextClassificationBaseModel} from '@/lib/models/base';
import {IClientConfig} from '@/lib/types/common/client-config';


export class TwitterRobertaBaseSentiment extends TextClassificationBaseModel {
  public static readonly endpoint = 'https://api.deepinfra.com/v1/inference/cardiffnlp/twitter-roberta-base-sentiment';
  constructor(authToken: string, config?: IClientConfig) {
    super(TwitterRobertaBaseSentiment.endpoint, authToken, config);
  }
}
