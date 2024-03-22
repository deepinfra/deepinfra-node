import {TextEmbeddingBaseModel} from '@/lib/models/base/text-embedding';

export class BgeLargeEnV15 extends TextEmbeddingBaseModel {
  static endpoint: string = 'https://api.deepinfra.com/v1/inference/BAAI/bge-large-en-v1.5';
  constructor(authToken: string) {
    super(BgeLargeEnV15.endpoint, authToken);
  }
}
