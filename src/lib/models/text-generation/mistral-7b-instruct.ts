import { TextGenerationBaseModel } from "@/lib/models/base";
import { IClientConfig } from "@/lib/types/common/client-config";

export class Mistral_7B extends TextGenerationBaseModel {
  public static readonly endpoint: string =
    "https://api.deepinfra.com/v1/inference/mistralai/Mistral-7B-Instruct-v0.1";

  constructor(authToken: string, config?: Partial<IClientConfig>) {
    super(Mistral_7B.endpoint, authToken, config);
  }
}
