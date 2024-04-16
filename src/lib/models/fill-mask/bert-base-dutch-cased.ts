import { FillMaskBaseModel } from "@/lib/models/base";
import { IClientConfig } from "@/lib/types/common/client-config";

export class BertBaseDutchCased extends FillMaskBaseModel {
  public static readonly endpoint: string =
    "https://api.deepinfra.com/v1/inference/GroNLP/bert-base-dutch-cased";
  constructor(authToken: string, config?: Partial<IClientConfig>) {
    super(BertBaseDutchCased.endpoint, authToken, config);
  }
}
