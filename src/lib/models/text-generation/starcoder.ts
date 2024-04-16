import {TextGenerationBaseModel} from '@/lib/models/base';
import {ClientConfig} from "@/lib/types/common/client-config";


export class Starcoder extends TextGenerationBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/bigcode/starcoder';

  constructor(authToken: string, config?: ClientConfig) {
    super(Starcoder.endpoint, authToken, config);
  }
}
