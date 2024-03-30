import {TextToImageBaseModel} from '@/lib/models/base/text-to-image';

export class DreamShaper extends TextToImageBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/Lykon/DreamShaper';
  constructor(authToken: string) {
    super(DreamShaper.endpoint, authToken);
  }
}
