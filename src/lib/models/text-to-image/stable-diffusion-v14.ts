import {TextToImageBaseModel} from '@/lib/models/base/text-to-image';

export class StableDiffusionV14 extends TextToImageBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/CompVis/stable-diffusion-v1-4';
  constructor(authToken: string) {
    super(StableDiffusionV14.endpoint, authToken);
  }
}
