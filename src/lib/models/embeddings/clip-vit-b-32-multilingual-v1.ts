import {TextEmbeddingBaseModel} from '@/lib/models/base';
import {ClientConfig} from "@/lib/types/common/client-config";


export class ClipVitB32MultiLingualV1 extends TextEmbeddingBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/sentence-transformers/clip-ViT-B-32-multilingual-v1';

  constructor(authToken: string, config?: ClientConfig) {
    super(ClipVitB32MultiLingualV1.endpoint, authToken, config);
  }
}
