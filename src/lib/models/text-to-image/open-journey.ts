import { TextToImageBaseModel } from "@/lib/models/base";

export class OpenJourney extends TextToImageBaseModel {
  public static readonly endpoint: string =
    "https://api.deepinfra.com/v1/inference/prompthero/openjourney";
  constructor(authToken: string) {
    super(OpenJourney.endpoint, authToken);
  }
}
