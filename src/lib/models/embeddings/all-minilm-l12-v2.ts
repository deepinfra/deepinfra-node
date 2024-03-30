import {TextEmbeddingBaseModel} from '@/lib/models/base';


export class AllMiniLmL12V2 extends TextEmbeddingBaseModel {
  static endpoint: string = 'https://api.deepinfra.com/v1/inference/sentence-transformers/all-MiniLM-L12-v2';
  constructor(authToken: string) {
    super(AllMiniLmL12V2.endpoint, authToken);
  }
}
