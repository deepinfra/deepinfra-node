import { TokenClassificationBaseModel } from "@/lib/models/base";

export class CamembertNer extends TokenClassificationBaseModel {
  public static readonly endpoint: string =
    "https://api.deepinfra.com/v1/inference/Jean-Baptiste/camembert-ner";

  constructor(authToken: string) {
    super(CamembertNer.endpoint, authToken);
  }
}
