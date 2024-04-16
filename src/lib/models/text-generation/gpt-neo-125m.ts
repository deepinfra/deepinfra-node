import { TextGenerationBaseModel } from "@/lib/models/base";
import { IClientConfig } from "@/lib/types/common/client-config";

export class GptNeo_125M extends TextGenerationBaseModel {
  public static readonly endpoint: string =
    "https://api.deepinfra.com/v1/inference/EleutherAI/gpt-neo-125M";

  constructor(authToken: string, config?: Partial<IClientConfig>) {
    super(GptNeo_125M.endpoint, authToken, config);
  }
}
