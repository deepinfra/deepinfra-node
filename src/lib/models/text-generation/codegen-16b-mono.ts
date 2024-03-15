import {TextGenerationBaseModel} from '@/lib/models/base/text-generation';


export class Codegen_16B_Mono extends TextGenerationBaseModel {
  public static endpoint: string = 'https://api.deepinfra.com/v1/inference/Salesforce/codegen-16B-mono';

  constructor(authToken: string) {
    super(Codegen_16B_Mono.endpoint, authToken);
  }
}
