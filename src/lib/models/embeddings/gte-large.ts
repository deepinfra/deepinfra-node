import {TextEmbeddingBaseModel} from '@/lib/models/base/text-embedding';


export class GteLarge extends TextEmbeddingBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/thenlper/gte-large';

  constructor(authToken: string) {
    super(GteLarge.endpoint, authToken);
  }
}
