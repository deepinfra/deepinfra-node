import { TextGenerationBaseModel } from "@/lib/models/base";

export class Pythia_28B extends TextGenerationBaseModel {
  public static readonly endpoint: string =
    "https://api.deepinfra.com/v1/inference/EleutherAI/pythia-2.8b";

  constructor(authToken: string) {
    super(Pythia_28B.endpoint, authToken);
  }
}
