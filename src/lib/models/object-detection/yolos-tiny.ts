import {ObjectDetectionBaseModel} from '@/lib/models/base';


export class YolosTiny extends ObjectDetectionBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/hustvl/yolos-tiny';
  constructor(authToken: string) {
    super(YolosTiny.endpoint, authToken);
  }
}
