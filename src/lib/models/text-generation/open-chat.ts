import {TextGenerationBaseModel} from '@/lib/models/base';
import {IClientConfig} from '@/lib/types/common/client-config';


export class OpenChat extends TextGenerationBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/openchat/openchat_3.5';

  constructor(authToken: string, config?: IClientConfig) {
    super(OpenChat.endpoint, authToken, config);
  }
}
