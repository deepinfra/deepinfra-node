import {TextGenerationBaseModel} from '@/lib/models/base/text-generation';


export class Airoboros_70B extends TextGenerationBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/deepinfra/airoboros-70b';

  constructor(authToken: string) {
    super(Airoboros_70B.endpoint, authToken);
  }
}
