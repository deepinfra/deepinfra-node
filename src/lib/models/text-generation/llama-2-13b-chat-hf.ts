import { TextGenerationBaseModel } from "@/lib/models/base";
import { IClientConfig } from "@/lib/types/common/client-config";

export class Llama2_13B extends TextGenerationBaseModel {
  public static readonly endpoint: string =
    "https://api.deepinfra.com/v1/inference/meta-llama/Llama-2-13b-chat-hf";

  constructor(authToken: string, config?: Partial<IClientConfig>) {
    super(Llama2_13B.endpoint, authToken, config);
  }
}
