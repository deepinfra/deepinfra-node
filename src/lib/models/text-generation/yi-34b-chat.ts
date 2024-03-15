import {TextGenerationBaseModel} from '@/lib/models/base/text-generation';


export class Yi_34B extends TextGenerationBaseModel {
  public static endpoint: string = 'https://api.deepinfra.com/v1/inference/01-ai/Yi-34B-Chat';

  constructor(authToken: string) {
    super(Yi_34B.endpoint, authToken);
  }
}
