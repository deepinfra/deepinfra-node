import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { USER_AGENT } from "@/lib/constants/client";
import { ClientConfig, IClientConfig } from "@/lib/types/common/client-config";

export class DeepInfraClient {
  private axiosClient: AxiosInstance;
  private readonly clientConfig: ClientConfig;

  constructor(
    private readonly url: string,
    private readonly authToken: string,
    config?: Partial<IClientConfig>,
  ) {
    this.axiosClient = axios.create({
      baseURL: this.url,
    });
    this.clientConfig = new ClientConfig(config);
  }

  private async backoffDelay(attempt: number): Promise<void> {
    const delay =
      attempt === 1
        ? this.clientConfig.initialBackoff
        : this.clientConfig.subsequentBackoff;
    return new Promise((resolve) => setTimeout(resolve, delay));
  }

  public async post<T>(
    data: object,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    const headers = {
      "User-Agent": USER_AGENT,
      "Content-Type": "application/json",
      ...config?.headers,
      Authorization: `Bearer ${this.authToken}`,
    };

    for (let attempt = 0; attempt <= this.clientConfig.maxRetries; attempt++) {
      try {
        return await this.axiosClient.post(this.url, data, {
          ...config,
          headers,
        });
      } catch (error) {
        if (attempt < this.clientConfig.maxRetries) {
          await this.backoffDelay(attempt);
        } else {
          throw error;
        }
      }
    }
    throw new Error("Maximum retries exceeded");
  }
}
