import {FillMaskBaseModel} from "@/lib/models/base";

export class AlbertBaseV2 extends FillMaskBaseModel {
  public static readonly endpoint = "https://api.deepinfra.com/v1/inference/albert-base-v2";
  constructor(authToken: string) {
    super(AlbertBaseV2.endpoint, authToken);
  }
}
