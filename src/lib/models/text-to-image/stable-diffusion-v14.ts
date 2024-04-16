import { TextToImageBaseModel } from "@/lib/models/base";
import { IClientConfig } from "@/lib/types/common/client-config";

export class StableDiffusionV14 extends TextToImageBaseModel {
  public static readonly endpoint: string =
    "https://api.deepinfra.com/v1/inference/CompVis/stable-diffusion-v1-4";
  constructor(authToken: string, config?: Partial<IClientConfig>) {
    super(StableDiffusionV14.endpoint, authToken, config);
  }
}
