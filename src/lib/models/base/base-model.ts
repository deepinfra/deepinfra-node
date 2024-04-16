import { DeepInfraClient } from "@/clients";
import { IClientConfig } from "@/lib/types/common/client-config";

export class BaseModel {
  protected client: DeepInfraClient;
  constructor(
    protected readonly endpoint: string,
    protected authToken: string,
    config?: Partial<IClientConfig>,
  ) {
    this.client = new DeepInfraClient(this.endpoint, this.authToken, config);
  }
}
