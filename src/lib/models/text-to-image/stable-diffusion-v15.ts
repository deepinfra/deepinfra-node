import {TextToImageBaseModel} from '@/lib/models/base/text-to-image';


export class StableDiffusionV15 extends TextToImageBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/runwayml/stable-diffusion-v1-5';
  constructor(authToken: string) {
    super(StableDiffusionV15.endpoint, authToken);
  }
}

