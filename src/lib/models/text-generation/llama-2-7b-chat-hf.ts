import {TextGenerationBaseModel} from '@/lib/models/base';
import {IClientConfig} from '@/lib/types/common/client-config';


export class Llama2_7B extends TextGenerationBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/meta-llama/Llama-2-7b-chat-hf';

  constructor(authToken: string, config?: Partial<IClientConfig>) {
    super(Llama2_7B.endpoint, authToken, config);
  }
}
