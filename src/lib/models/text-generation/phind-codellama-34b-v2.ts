import {TextGenerationBaseModel} from '@/lib/models/base';
import {IClientConfig} from '@/lib/types/common/client-config';


export class PhindCodeLlama_34B_V2 extends TextGenerationBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/Phind/Phind-CodeLlama-34B-v2';

  constructor(authToken: string, config?: IClientConfig) {
    super(PhindCodeLlama_34B_V2.endpoint, authToken, config);
  }
}
