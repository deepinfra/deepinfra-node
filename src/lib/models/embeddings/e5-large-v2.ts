import {TextEmbeddingBaseModel} from '@/lib/models/base';

export class E5LargeV2 extends TextEmbeddingBaseModel {
  static endpoint: string = 'https://api.deepinfra.com/v1/inference/intfloat/e5-large-v2';
  constructor(authToken: string) {
    super(E5LargeV2.endpoint, authToken);
  }
}
