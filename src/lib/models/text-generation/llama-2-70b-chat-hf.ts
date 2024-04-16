import { TextGenerationBaseModel } from "@/lib/models/base";

export class Llama2_70B extends TextGenerationBaseModel {
  public static readonly endpoint: string =
    "https://api.deepinfra.com/v1/inference/meta-llama/Llama-2-70b-chat-hf";
  constructor(authToken: string) {
    super(Llama2_70B.endpoint, authToken);
  }
}
