import {TextEmbeddingBaseModel} from '@/lib/models/base';
import {ClientConfig} from "@/lib/types/common/client-config";


export class AllMpNetBaseV2 extends TextEmbeddingBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/sentence-transformers/all-mpnet-base-v2';
  constructor(authToken: string, config?: ClientConfig) {
    super(AllMpNetBaseV2.endpoint, authToken, config);
  }
}
