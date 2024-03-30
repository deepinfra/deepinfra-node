import {TextEmbeddingBaseModel} from '@/lib/models/base';


export class AllMpNetBaseV2 extends TextEmbeddingBaseModel {
  static endpoint: string = 'https://api.deepinfra.com/v1/inference/sentence-transformers/all-mpnet-base-v2';
  constructor(authToken: string) {
    super(AllMpNetBaseV2.endpoint, authToken);
  }
}
