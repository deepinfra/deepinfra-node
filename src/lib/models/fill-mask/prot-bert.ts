import { FillMaskBaseModel } from "@/lib/models/base";

export class ProtBert extends FillMaskBaseModel {
  public static readonly endpoint: string =
    "https://api.deepinfra.com/v1/inference/Rostlab/prot_bert";
  constructor(authToken: string) {
    super(ProtBert.endpoint, authToken);
  }
}
