import {TextEmbeddingBaseModel} from '@/lib/models/base';
import {IClientConfig} from '@/lib/types/common/client-config';


export class AllMpNetBaseV2 extends TextEmbeddingBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/sentence-transformers/all-mpnet-base-v2';
  constructor(authToken: string, config?: Partial<IClientConfig>) {
    super(AllMpNetBaseV2.endpoint, authToken, config);
  }
}
