import {TextToImageBaseModel} from '@/lib/models/base';
import {ClientConfig} from "@/lib/types/common/client-config";

export class DreamShaper extends TextToImageBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/Lykon/DreamShaper';
  constructor(authToken: string, config?: ClientConfig) {
    super(DreamShaper.endpoint, authToken, config);
  }
}
