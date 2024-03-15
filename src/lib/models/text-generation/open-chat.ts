import {TextGenerationBaseModel} from '@/lib/models/base/text-generation';


export class OpenChat extends TextGenerationBaseModel {
  public static endpoint: string = 'https://api.deepinfra.com/v1/inference/openchat/openchat_3.5';

  constructor(authToken: string) {
    super(OpenChat.endpoint, authToken);
  }
}
