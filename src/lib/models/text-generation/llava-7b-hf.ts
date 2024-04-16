import {TextGenerationBaseModel} from '@/lib/models/base';
import {ClientConfig} from "@/lib/types/common/client-config";


export class LlavaHF extends TextGenerationBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/llava-hf/llava-1.5-7b-hf';

  constructor(authToken: string, config?: ClientConfig) {
    super(LlavaHF.endpoint, authToken, config);
  }
}

