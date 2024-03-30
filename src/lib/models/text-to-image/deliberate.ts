import {TextToImageBaseModel} from '@/lib/models/base/text-to-image';

export class Deliberate extends TextToImageBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/XpucT/Deliberate';
  constructor(authToken: string) {
    super(Deliberate.endpoint, authToken);
  }
}