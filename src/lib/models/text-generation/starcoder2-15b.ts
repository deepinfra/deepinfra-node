import {TextGenerationBaseModel} from '@/lib/models/base';
import {IClientConfig} from '@/lib/types/common/client-config';


export class Starcoder_2_15B extends TextGenerationBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/bigcode/starcoder2-15b';

  constructor(authToken: string, config?: IClientConfig) {
    super(Starcoder_2_15B.endpoint, authToken, config);
  }
}
