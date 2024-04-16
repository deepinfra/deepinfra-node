import { TextGenerationBaseModel } from "@/lib/models/base";

export class Lizpreciator extends TextGenerationBaseModel {
  public static readonly endpoint: string =
    "https://api.deepinfra.com/v1/inference/lizpreciatior/lzlv_70b_fp16_hf";

  constructor(authToken: string) {
    super(Lizpreciator.endpoint, authToken);
  }
}
