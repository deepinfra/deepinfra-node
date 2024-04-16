import {TextGenerationBaseModel} from '@/lib/models/base';
import {IClientConfig} from '@/lib/types/common/client-config';


export class Pygmalion_7B extends TextGenerationBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/cognitivecomputations/pygmalion-1.0-7b';
  constructor(authToken: string, config?: Partial<IClientConfig>) {
    super(Pygmalion_7B.endpoint, authToken, config);
  }
}
