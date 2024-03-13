import {TextGenerationBaseModel} from '@/lib/models/base/text-generation';

export class Dolphin extends TextGenerationBaseModel {
  public static endpoint: string = 'https://api.deepinfra.com/v1/inference/cognitivecomputations/dolphin-2.6-mixtral-8x7b';

  constructor(authToken: string) {
    super(Dolphin.endpoint, authToken);
  }
}
