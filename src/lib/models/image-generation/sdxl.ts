import {ImageGenerationBaseModel} from '@/lib/models/base/image-generation';


export class Sdxl extends ImageGenerationBaseModel {
  public static endpoint: string = 'https://api.deepinfra.com/v1/inference/stability-ai/sdxl';
  constructor(authToken: string) {
    super(Sdxl.endpoint, authToken);
  }
}
