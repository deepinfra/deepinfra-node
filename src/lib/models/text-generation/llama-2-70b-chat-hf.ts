import {TextGenerationBaseModel} from '@/lib/models/base';
import {ClientConfig} from "@/lib/types/common/client-config";

export class Llama2_70B extends TextGenerationBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/meta-llama/Llama-2-70b-chat-hf';
  constructor(authToken: string, config?: ClientConfig) {
    super(Llama2_70B.endpoint, authToken, config);
  }
}
