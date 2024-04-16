import { TextGenerationBaseModel } from "@/lib/models/base";

export class Starcoder_2_15B extends TextGenerationBaseModel {
  public static readonly endpoint: string =
    "https://api.deepinfra.com/v1/inference/bigcode/starcoder2-15b";

  constructor(authToken: string) {
    super(Starcoder_2_15B.endpoint, authToken);
  }
}
