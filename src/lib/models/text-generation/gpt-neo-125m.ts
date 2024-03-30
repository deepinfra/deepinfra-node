import {TextGenerationBaseModel} from '@/lib/models/base/text-generation';


export class GptNeo_125M extends TextGenerationBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/EleutherAI/gpt-neo-125M';

  constructor(authToken: string) {
    super(GptNeo_125M.endpoint, authToken);
  }
}
