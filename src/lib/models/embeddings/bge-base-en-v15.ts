import {TextEmbeddingBaseModel} from '@/lib/models/base';
import {IClientConfig} from '@/lib/types/common/client-config';

export class BgeBaseEnV15 extends TextEmbeddingBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/BAAI/bge-base-en-v1.5';
  constructor(authToken: string, config?: Partial<IClientConfig>) {
    super(BgeBaseEnV15.endpoint, authToken, config);
  }
}
