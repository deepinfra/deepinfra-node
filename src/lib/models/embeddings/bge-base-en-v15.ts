import { TextEmbeddingBaseModel } from "@/lib/models/base";

export class BgeBaseEnV15 extends TextEmbeddingBaseModel {
  public static readonly endpoint: string =
    "https://api.deepinfra.com/v1/inference/BAAI/bge-base-en-v1.5";
  constructor(authToken: string) {
    super(BgeBaseEnV15.endpoint, authToken);
  }
}
