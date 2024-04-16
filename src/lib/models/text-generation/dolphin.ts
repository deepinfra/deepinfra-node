import {TextGenerationBaseModel} from '@/lib/models/base';
import {IClientConfig} from '@/lib/types/common/client-config';

export class Dolphin extends TextGenerationBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/cognitivecomputations/dolphin-2.6-mixtral-8x7b';

  constructor(authToken: string, config?: IClientConfig) {
    super(Dolphin.endpoint, authToken, config);
  }
}
