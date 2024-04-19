import { DeepInfraClient } from "@/clients";
import { IClientConfig } from "@/lib/types/common/client-config";

import { ROOT_URL } from "@/lib/constants/client";
import { URLUtils } from "@/lib/utils/url";

export class BaseModel {
  protected client: DeepInfraClient;
  protected readonly endpoint: string;
  protected authToken: string;
  constructor(
    readonly modelName: string,
    authToken?: string,
    config?: Partial<IClientConfig>,
  ) {
    this.endpoint = URLUtils.isValidUrl(modelName)
      ? modelName
      : ROOT_URL + modelName;
    this.authToken = authToken || this.getAuthTokenFromEnv() || this.warnAboutMissingApiKey();
    this.client = new DeepInfraClient(this.endpoint, this.authToken, config);
  }

  private warnAboutMissingApiKey() {
    console.warn(
      "API key is not provided. Please provide an API key as an argument or set DEEPINFRA_API_KEY environment variable.",
    );
    return "";
  }

  private getAuthTokenFromEnv() {
    const apiKey = process.env.DEEPINFRA_API_KEY;
    return apiKey || "";
  }
}
