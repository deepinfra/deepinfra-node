import {TextEmbeddingBaseModel} from '@/lib/models/base';


export class ClipVitB32 extends TextEmbeddingBaseModel {
  static endpoint: string = 'https://api.deepinfra.com/v1/inference/sentence-transformers/clip-ViT-B-32';

  constructor(authToken: string) {
    super(ClipVitB32.endpoint, authToken);
  }
}
