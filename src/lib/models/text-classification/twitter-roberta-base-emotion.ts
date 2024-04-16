import { TextClassificationBaseModel } from "@/lib/models/base";
import { IClientConfig } from "@/lib/types/common/client-config";

export class TwitterRobertaBaseEmotion extends TextClassificationBaseModel {
  public static readonly endpoint =
    "https://api.deepinfra.com/v1/inference/cardiffnlp/twitter-roberta-base-emotion";
  constructor(authToken: string, config?: Partial<IClientConfig>) {
    super(TwitterRobertaBaseEmotion.endpoint, authToken, config);
  }
}
