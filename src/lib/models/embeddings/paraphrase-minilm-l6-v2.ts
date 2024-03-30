import {TextEmbeddingBaseModel} from '@/lib/models/base';


export class ParaphraseMinilmL6V2 extends TextEmbeddingBaseModel {
  static endpoint: string = 'https://api.deepinfra.com/v1/inference/sentence-transformers/paraphrase-MiniLM-L6-v2';

  constructor(authToken: string) {
    super(ParaphraseMinilmL6V2.endpoint, authToken);
  }
}
