import { FillMaskBaseModel } from "@/lib/models/base";
import { IClientConfig } from "@/lib/types/common/client-config";

export class BertBaseGermanCased extends FillMaskBaseModel {
  public static readonly endpoint: string =
    "https://api.deepinfra.com/v1/inference/GroNLP/bert-base-german-cased";
  constructor(authToken: string, config?: Partial<IClientConfig>) {
    super(BertBaseGermanCased.endpoint, authToken, config);
  }
}
