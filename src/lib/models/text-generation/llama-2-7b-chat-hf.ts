import {TextGenerationBaseModel} from '@/lib/models/base/text-generation';


export class Llama2_7B extends TextGenerationBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/meta-llama/Llama-2-7b-chat-hf';

  constructor(authToken: string) {
    super(Llama2_7B.endpoint, authToken);
  }
}
