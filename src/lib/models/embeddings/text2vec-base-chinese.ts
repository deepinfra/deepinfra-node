import { TextEmbeddingBaseModel } from "@/lib/models/base";

export class Text2VecBaseChinese extends TextEmbeddingBaseModel {
  public static readonly endpoint: string =
    "https://api.deepinfra.com/v1/inference/shibing624/text2vec-base-chinese";

  constructor(authToken: string) {
    super(Text2VecBaseChinese.endpoint, authToken);
  }
}
