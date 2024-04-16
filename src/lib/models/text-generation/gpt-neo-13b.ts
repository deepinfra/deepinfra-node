import { TextGenerationBaseModel } from "@/lib/models/base";

export class GptNeo_13B extends TextGenerationBaseModel {
  public static readonly endpoint: string =
    "https://api.deepinfra.com/v1/inference/EleutherAI/gpt-neo-1.3B";

  constructor(authToken: string) {
    super(GptNeo_13B.endpoint, authToken);
  }
}
