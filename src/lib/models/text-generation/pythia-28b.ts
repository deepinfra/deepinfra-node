import {TextGenerationBaseModel} from '@/lib/models/base';
import {ClientConfig} from "@/lib/types/common/client-config";


export class Pythia_28B extends TextGenerationBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/EleutherAI/pythia-2.8b';

  constructor(authToken: string, config?: ClientConfig) {
    super(Pythia_28B.endpoint, authToken, config);
  }
}
