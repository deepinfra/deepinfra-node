import { TextEmbeddingBaseModel } from "@/lib/models/base";

export class AllMiniLmL6V2 extends TextEmbeddingBaseModel {
  public static readonly endpoint: string =
    "https://api.deepinfra.com/v1/inference/sentence-transformers/all-MiniLM-L6-v2";
  constructor(authToken: string) {
    super(AllMiniLmL6V2.endpoint, authToken);
  }
}
