import { TextEmbeddingBaseModel } from "@/lib/models/base";
import { IClientConfig } from "@/lib/types/common/client-config";

export class ClipVitB32 extends TextEmbeddingBaseModel {
  public static readonly endpoint: string =
    "https://api.deepinfra.com/v1/inference/sentence-transformers/clip-ViT-B-32";

  constructor(authToken: string, config?: Partial<IClientConfig>) {
    super(ClipVitB32.endpoint, authToken, config);
  }
}
