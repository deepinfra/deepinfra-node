import {TextGenerationBaseModel} from '@/lib/models/base';


export class Starcoder extends TextGenerationBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/bigcode/starcoder';

  constructor(authToken: string) {
    super(Starcoder.endpoint, authToken);
  }
}
