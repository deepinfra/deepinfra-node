import { FillMaskBaseModel } from "@/lib/models/base";
import { IClientConfig } from "@/lib/types/common/client-config";

export class BertBaseChinese extends FillMaskBaseModel {
  public static readonly endpoint: string =
    "https://api.deepinfra.com/v1/inference/bert-base-chinese";
  constructor(authToken: string, config?: Partial<IClientConfig>) {
    super(BertBaseChinese.endpoint, authToken, config);
  }
}
