import { CogBaseModel } from "@/lib/models/base/cog-model";
import { SdxlIn } from "@/lib/types/cog/sdxl/request";
import { SdxlOut } from "@/lib/types/cog/sdxl/response";

export class Sdxl extends CogBaseModel<SdxlIn, SdxlOut> {
  public static readonly endpoint: string =
    "https://api.deepinfra.com/v1/inference/stability-ai/sdxl";
  constructor(authToken: string) {
    super(Sdxl.endpoint, authToken);
  }
}
