import {ObjectDetectionBaseModel} from '@/lib/models/base';
import {ClientConfig} from "@/lib/types/common/client-config";


export class YolosSmallRegoPlatesDetection extends ObjectDetectionBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/nickmuchi/yolos-small-rego-plates-detection';
  constructor(authToken: string, config?: ClientConfig) {
    super(YolosSmallRegoPlatesDetection.endpoint, authToken, config);
  }
}
