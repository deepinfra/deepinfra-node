import {TextEmbeddingBaseModel} from '@/lib/models/base/text-embedding';

export class GteBase extends TextEmbeddingBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/thenlper/gte-base';

  constructor(authToken: string) {
    super(GteBase.endpoint, authToken);
  }
}
