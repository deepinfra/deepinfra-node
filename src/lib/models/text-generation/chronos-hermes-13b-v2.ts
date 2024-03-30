import {TextGenerationBaseModel} from '@/lib/models/base';


export class ChronosHermes_13B_V2 extends TextGenerationBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/Austism/chronos-hermes-13b-v2';

  constructor(authToken: string) {
    super(ChronosHermes_13B_V2.endpoint, authToken);
  }
}
