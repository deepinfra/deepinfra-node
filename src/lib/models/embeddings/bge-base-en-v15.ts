import {TextEmbeddingBaseModel} from '@/lib/models/base';
import {ClientConfig} from "@/lib/types/common/client-config";

export class BgeBaseEnV15 extends TextEmbeddingBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/BAAI/bge-base-en-v1.5';
  constructor(authToken: string, config?: ClientConfig) {
    super(BgeBaseEnV15.endpoint, authToken, config);
  }
}
