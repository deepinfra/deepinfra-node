import { TextEmbeddingBaseModel } from "@/lib/models/base";
import { IClientConfig } from "@/lib/types/common/client-config";

export class GteBase extends TextEmbeddingBaseModel {
  public static readonly endpoint: string =
    "https://api.deepinfra.com/v1/inference/thenlper/gte-base";

  constructor(authToken: string, config?: Partial<IClientConfig>) {
    super(GteBase.endpoint, authToken, config);
  }
}
