import { DeepInfraClient } from "@/clients";
import { IClientConfig } from "@/lib/types/common/client-config";
import { ROOT_URL } from "@/lib/constants/client";
import { URLUtils } from "@/lib/utils/url";

export class BaseModel {
  protected client: DeepInfraClient;
  protected readonly endpoint: string;
  constructor(
    readonly modelName: string,
    protected authToken: string,
    config?: Partial<IClientConfig>,
  ) {
    this.endpoint = URLUtils.isValidUrl(modelName)
      ? modelName
      : ROOT_URL + modelName;
    this.client = new DeepInfraClient(this.endpoint, this.authToken, config);
  }
}
