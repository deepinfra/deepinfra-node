import {TextGenerationBaseModel} from '@/lib/models/base/text-generation';


export class GptJ_6B extends TextGenerationBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/EleutherAI/gpt-j-6B';

  constructor(authToken: string) {
    super(GptJ_6B.endpoint, authToken);
  }
}
