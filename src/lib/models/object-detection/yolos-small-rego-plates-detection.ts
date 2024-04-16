import { ObjectDetectionBaseModel } from "@/lib/models/base";

export class YolosSmallRegoPlatesDetection extends ObjectDetectionBaseModel {
  public static readonly endpoint: string =
    "https://api.deepinfra.com/v1/inference/nickmuchi/yolos-small-rego-plates-detection";
  constructor(authToken: string) {
    super(YolosSmallRegoPlatesDetection.endpoint, authToken);
  }
}
