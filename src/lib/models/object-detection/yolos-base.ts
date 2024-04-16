import { ObjectDetectionBaseModel } from "@/lib/models/base";

export class YolosBase extends ObjectDetectionBaseModel {
  public static readonly endpoint: string =
    "https://api.deepinfra.com/v1/inference/hustvl/yolos-base";
  constructor(authToken: string) {
    super(YolosBase.endpoint, authToken);
  }
}
