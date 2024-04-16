import { FillMaskBaseModel } from "@/lib/models/base";
import { IClientConfig } from "@/lib/types/common/client-config";

export class BertBaseMultilingualCased extends FillMaskBaseModel {
  public static readonly endpoint: string =
    "https://api.deepinfra.com/v1/inference/GroNLP/bert-base-multilingual-cased";
  constructor(authToken: string, config?: Partial<IClientConfig>) {
    super(BertBaseMultilingualCased.endpoint, authToken, config);
  }
}
