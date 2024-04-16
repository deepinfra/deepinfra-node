import {TextGenerationBaseModel} from '@/lib/models/base';
import {IClientConfig} from '@/lib/types/common/client-config';


export class Gemma_7B extends TextGenerationBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/google/gemma-7b-it';

  constructor(authToken: string, config?: IClientConfig) {
    super(Gemma_7B.endpoint, authToken, config);
  }
}
