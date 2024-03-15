import {TextGenerationBaseModel} from '@/lib/models/base/text-generation';


export class Pygmalion_7B extends TextGenerationBaseModel {
  public static endpoint: string = 'https://api.deepinfra.com/v1/inference/cognitivecomputations/pygmalion-1.0-7b';
  constructor(authToken: string) {
    super(Pygmalion_7B.endpoint, authToken);
  }
}
