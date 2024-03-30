import {FillMaskBaseModel} from '@/lib/models/base';

export class AlbertBaseV1 extends FillMaskBaseModel {
  public static readonly endpoint = 'https://api.deepinfra.com/v1/inference/albert-base-v1';
  constructor(authToken: string) {
    super(AlbertBaseV1.endpoint, authToken);
  }
}
