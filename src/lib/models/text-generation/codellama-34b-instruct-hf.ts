import {TextGenerationBaseModel} from '@/lib/models/base/text-generation';


export class CodeLlama_34B_Instruct_HF extends TextGenerationBaseModel {
  public static endpoint: string = 'https://api.deepinfra.com/v1/inference/codellama/CodeLlama-34b-Instruct-hf';
  constructor(authToken: string) {
    super(CodeLlama_34B_Instruct_HF.endpoint, authToken);
  }
}
