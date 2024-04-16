import { TextEmbeddingBaseModel } from "@/lib/models/base";

export class E5BaseV2 extends TextEmbeddingBaseModel {
  public static readonly endpoint: string =
    "https://api.deepinfra.com/v1/inference/intfloat/e5-base-v2";
  constructor(authToken: string) {
    super(E5BaseV2.endpoint, authToken);
  }
}
