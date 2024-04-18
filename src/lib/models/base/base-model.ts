import { DeepInfraClient } from "@/clients";
import { IClientConfig } from "@/lib/types/common/client-config";
import { ROOT_URL } from "@/lib/constants/client";
import {URLUtils} from "@/lib/utils/url";

export class BaseModel {
  protected client: DeepInfraClient;
  protected readonly endpoint: string;
  constructor(
    readonly modelName: string,
    protected authToken: string,
    config?: Partial<IClientConfig>,
  ) {
    if(!URLUtils.isValidUrl(modelName)) {
      this.endpoint = ROOT_URL + modelName;
    }else{
      this.endpoint = modelName;
    }
    this.client = new DeepInfraClient(this.endpoint, this.authToken, config);
  }
}
