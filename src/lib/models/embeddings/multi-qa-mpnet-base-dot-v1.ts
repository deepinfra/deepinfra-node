import {TextEmbeddingBaseModel} from '@/lib/models/base';
import {ClientConfig} from "@/lib/types/common/client-config";


export class MultiQaMpnetBaseDotV1 extends TextEmbeddingBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/sentence-transformers/multi-qa-mpnet-base-dot-v1';

  constructor(authToken: string, config?: ClientConfig) {
    super(MultiQaMpnetBaseDotV1.endpoint, authToken, config);
  }
}
