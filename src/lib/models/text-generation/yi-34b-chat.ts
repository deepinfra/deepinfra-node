import {TextGenerationBaseModel} from '@/lib/models/base';
import {ClientConfig} from "@/lib/types/common/client-config";


export class Yi_34B extends TextGenerationBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/01-ai/Yi-34B-Chat';

  constructor(authToken: string, config?: ClientConfig) {
    super(Yi_34B.endpoint, authToken, config);
  }
}
