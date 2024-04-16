import {TextEmbeddingBaseModel} from '@/lib/models/base';
import {ClientConfig} from "@/lib/types/common/client-config";

export class BgeLargeEnV15 extends TextEmbeddingBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/BAAI/bge-large-en-v1.5';
  constructor(authToken: string, config?: ClientConfig) {
    super(BgeLargeEnV15.endpoint, authToken, config);
  }
}
