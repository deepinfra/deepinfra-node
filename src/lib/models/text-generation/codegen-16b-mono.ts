import {TextGenerationBaseModel} from '@/lib/models/base';
import {IClientConfig} from '@/lib/types/common/client-config';


export class Codegen_16B_Mono extends TextGenerationBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/Salesforce/codegen-16B-mono';

  constructor(authToken: string, config?: IClientConfig) {
    super(Codegen_16B_Mono.endpoint, authToken, config);
  }
}
