import {TextGenerationBaseModel} from '@/lib/models/base';
import {ClientConfig} from "@/lib/types/common/client-config";


export class GptJ_6B extends TextGenerationBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/EleutherAI/gpt-j-6B';

  constructor(authToken: string, config?: ClientConfig) {
    super(GptJ_6B.endpoint, authToken, config);
  }
}
