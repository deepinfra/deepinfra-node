import { TextEmbeddingBaseModel } from "@/lib/models/base";
import { IClientConfig } from "@/lib/types/common/client-config";

export class E5LargeV2 extends TextEmbeddingBaseModel {
  public static readonly endpoint: string =
    "https://api.deepinfra.com/v1/inference/intfloat/e5-large-v2";
  constructor(authToken: string, config?: Partial<IClientConfig>) {
    super(E5LargeV2.endpoint, authToken, config);
  }
}
