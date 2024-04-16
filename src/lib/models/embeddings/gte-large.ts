import {TextEmbeddingBaseModel} from '@/lib/models/base';
import {ClientConfig} from "@/lib/types/common/client-config";


export class GteLarge extends TextEmbeddingBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/thenlper/gte-large';

  constructor(authToken: string, config?: ClientConfig) {
    super(GteLarge.endpoint, authToken, config);
  }
}
