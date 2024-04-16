import {TextToImageBaseModel} from '@/lib/models/base';
import {ClientConfig} from "@/lib/types/common/client-config";

export class Deliberate extends TextToImageBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/XpucT/Deliberate';
  constructor(authToken: string, config?: ClientConfig) {
    super(Deliberate.endpoint, authToken, config);
  }
}
