import {TextGenerationBaseModel} from '@/lib/models/base';


export class AiroborosL2_70B extends TextGenerationBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/jondurbin/airoboros-l2-70b-gpt4-1.4.1';

  constructor(authToken: string) {
    super(AiroborosL2_70B.endpoint, authToken);
  }
}
