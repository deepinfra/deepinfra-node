import {TextClassificationBaseModel} from '@/lib/models/base';
import {ClientConfig} from "@/lib/types/common/client-config";


export class TwitterRobertaBaseEmotion extends TextClassificationBaseModel {
  public static readonly endpoint = 'https://api.deepinfra.com/v1/inference/cardiffnlp/twitter-roberta-base-emotion';
  constructor(authToken: string, config?: ClientConfig) {
    super(TwitterRobertaBaseEmotion.endpoint, authToken, config);
  }
}
