import {TextGenerationBaseModel} from '@/lib/models/base';
import {IClientConfig} from '@/lib/types/common/client-config';

export class Mixtral extends TextGenerationBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/mistralai/Mixtral-8x7B-Instruct-v0.1';

  constructor(authToken: string, config?: IClientConfig) {
    super(Mixtral.endpoint, authToken, config);
  }
}
