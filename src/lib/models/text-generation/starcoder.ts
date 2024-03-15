import {TextGenerationBaseModel} from '@/lib/models/base/text-generation';


export class Starcoder extends TextGenerationBaseModel {
  public static endpoint: string = 'https://api.deepinfra.com/v1/inference/bigcode/starcoder';

  constructor(authToken: string) {
    super(Starcoder.endpoint, authToken);
  }
}
