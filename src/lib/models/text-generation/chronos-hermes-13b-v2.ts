import {TextGenerationBaseModel} from '@/lib/models/base';
import {IClientConfig} from '@/lib/types/common/client-config';


export class ChronosHermes_13B_V2 extends TextGenerationBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/Austism/chronos-hermes-13b-v2';

  constructor(authToken: string, config?: IClientConfig) {
    super(ChronosHermes_13B_V2.endpoint, authToken, config);
  }
}
