import {ObjectDetectionBaseModel} from '@/lib/models/base';
import {ClientConfig} from "@/lib/types/common/client-config";


export class YolosSmall extends ObjectDetectionBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/hustvl/yolos-small';
  constructor(authToken: string, config?: ClientConfig) {
    super(YolosSmall.endpoint, authToken, config);
  }
}
