import { TextToImageBaseModel } from "@/lib/models/base";
import { IClientConfig } from "@/lib/types/common/client-config";

export class OpenJourney extends TextToImageBaseModel {
  public static readonly endpoint: string =
    "https://api.deepinfra.com/v1/inference/prompthero/openjourney";
  constructor(authToken: string, config?: Partial<IClientConfig>) {
    super(OpenJourney.endpoint, authToken, config);
  }
}
