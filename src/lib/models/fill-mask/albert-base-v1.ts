import {FillMaskBaseModel} from '@/lib/models/base';
import {ClientConfig} from "@/lib/types/common/client-config";

export class AlbertBaseV1 extends FillMaskBaseModel {
  public static readonly endpoint = 'https://api.deepinfra.com/v1/inference/albert-base-v1';
  constructor(authToken: string, config?: ClientConfig) {
    super(AlbertBaseV1.endpoint, authToken, config);
  }
}
