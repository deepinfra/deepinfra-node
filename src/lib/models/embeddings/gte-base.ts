import {TextEmbeddingBaseModel} from '@/lib/models/base/text-embedding';

export class GteBase extends TextEmbeddingBaseModel {
  public static endpoint: string = 'https://api.deepinfra.com/v1/inference/thenlper/gte-base';

  constructor(authToken: string) {
    super(authToken, GteBase.endpoint);
  }
}
