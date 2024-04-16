import {ObjectDetectionBaseModel} from '@/lib/models/base';
import {IClientConfig} from '@/lib/types/common/client-config';


export class YolosTiny extends ObjectDetectionBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/hustvl/yolos-tiny';
  constructor(authToken: string, config?: Partial<IClientConfig>) {
    super(YolosTiny.endpoint, authToken, config);
  }
}
