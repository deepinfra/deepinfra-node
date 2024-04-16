import { TextEmbeddingBaseModel } from "@/lib/models/base";
import { IClientConfig } from "@/lib/types/common/client-config";

export class Text2VecBaseChinese extends TextEmbeddingBaseModel {
  public static readonly endpoint: string =
    "https://api.deepinfra.com/v1/inference/shibing624/text2vec-base-chinese";

  constructor(authToken: string, config?: Partial<IClientConfig>) {
    super(Text2VecBaseChinese.endpoint, authToken, config);
  }
}
