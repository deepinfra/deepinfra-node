import {TextToImageBaseModel} from '@/lib/models/base';
import {IClientConfig} from '@/lib/types/common/client-config';


export class StableDiffusionV15 extends TextToImageBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/runwayml/stable-diffusion-v1-5';
  constructor(authToken: string, config?: IClientConfig) {
    super(StableDiffusionV15.endpoint, authToken, config);
  }
}

