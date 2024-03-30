import {ObjectDetectionBaseModel} from '@/lib/models/base';


export class YolosSmall extends ObjectDetectionBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/hustvl/yolos-small';
  constructor(authToken: string) {
    super(YolosSmall.endpoint, authToken);
  }
}
