import {TextGenerationBaseModel} from '@/lib/models/base';
import {ClientConfig} from "@/lib/types/common/client-config";


export class GptNeo_13B extends TextGenerationBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/EleutherAI/gpt-neo-1.3B';

  constructor(authToken: string, config?: ClientConfig) {
    super(GptNeo_13B.endpoint, authToken, config);
  }
}
