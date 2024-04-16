import {TextGenerationBaseModel} from '@/lib/models/base';
import {IClientConfig} from '@/lib/types/common/client-config';


export class CodeLlama_34B_Instruct_HF extends TextGenerationBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/codellama/CodeLlama-34b-Instruct-hf';
  constructor(authToken: string, config?: Partial<IClientConfig>) {
    super(CodeLlama_34B_Instruct_HF.endpoint, authToken, config);
  }
}
