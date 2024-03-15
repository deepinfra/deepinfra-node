import {TextGenerationBaseModel} from '@/lib/models/base/text-generation';


export class PhindCodeLlama_34B_V2 extends TextGenerationBaseModel {
  public static endpoint: string = 'https://api.deepinfra.com/v1/inference/Phind/Phind-CodeLlama-34B-v2';

  constructor(authToken: string) {
    super(PhindCodeLlama_34B_V2.endpoint, authToken);
  }
}
