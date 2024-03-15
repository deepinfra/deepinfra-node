import {TextGenerationBaseModel} from '@/lib/models/base/text-generation';


export class Gemma_7B extends TextGenerationBaseModel {
  public static endpoint: string = 'https://api.deepinfra.com/v1/inference/google/gemma-7b-it';

  constructor(authToken: string) {
    super(Gemma_7B.endpoint, authToken);
  }
}
