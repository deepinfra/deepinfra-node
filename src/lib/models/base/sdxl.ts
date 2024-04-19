import { CogBaseModel } from "@/lib/models/base/cog-model";
import { SdxlIn } from "@/lib/types/cog/sdxl/request";
import { SdxlOut } from "@/lib/types/cog/sdxl/response";
import { IClientConfig } from "@/lib/types/common/client-config";

export class Sdxl extends CogBaseModel<SdxlIn, SdxlOut> {
  public static readonly modelName: string = "stability-ai/sdxl";
  constructor(authToken?: string, config?: Partial<IClientConfig>) {
    super(Sdxl.modelName, authToken, config);
  }
}
