import {TextGenerationBaseModel} from '@/lib/models/base';
import {IClientConfig} from '@/lib/types/common/client-config';


export class MythoMaxL2_13B extends TextGenerationBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/Gryphe/MythoMax-L2-13b';

  constructor(authToken: string, config?: IClientConfig) {
    super(MythoMaxL2_13B.endpoint, authToken, config);
  }
}
