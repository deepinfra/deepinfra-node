import {TextGenerationBaseModel} from '@/lib/models/base';
import {IClientConfig} from '@/lib/types/common/client-config';


export class Airoboros_70B extends TextGenerationBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/deepinfra/airoboros-70b';

  constructor(authToken: string, config?: Partial<IClientConfig>) {
    super(Airoboros_70B.endpoint, authToken, config);
  }
}
