import {ObjectDetectionBaseModel} from '@/lib/models/base';
import {IClientConfig} from '@/lib/types/common/client-config';


export class YolosBase extends ObjectDetectionBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/hustvl/yolos-base';
  constructor(authToken: string, config?: Partial<IClientConfig>) {
    super(YolosBase.endpoint, authToken, config);
  }
}
