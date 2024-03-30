import {TextToImageBaseModel} from '@/lib/models/base/text-to-image';


export class StableDiffusionV21 extends TextToImageBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/stabilityai/stable-diffusion-2-1';
  constructor(authToken: string) {
    super(StableDiffusionV21.endpoint, authToken);
  }
}

