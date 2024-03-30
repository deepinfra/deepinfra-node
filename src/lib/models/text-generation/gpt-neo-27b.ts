import {TextGenerationBaseModel} from '@/lib/models/base/text-generation';


export class GptNeo_2_7B extends TextGenerationBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/EleutherAI/gpt-neo-2.7B';

  constructor(authToken: string) {
    super(GptNeo_2_7B.endpoint, authToken);
  }
}
