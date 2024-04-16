import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {USER_AGENT} from '@/lib/constants/client';
import {ClientConfig, IClientConfig} from '@/lib/types/common/client-config';

export class DeepInfraClient {
  private axiosClient: AxiosInstance;
  private readonly clientConfig : IClientConfig;

  constructor(private readonly url: string, private readonly authToken: string,config?: IClientConfig) {
    this.axiosClient = axios.create({
      baseURL: this.url,
    });
    this.clientConfig = config || new ClientConfig();
  }

  private async backoffDelay(attempt: number): Promise<void> {
    const delay = attempt === 1 ? this.clientConfig.initialBackoff : this.clientConfig.subsequentBackoff;
    return new Promise((resolve) => setTimeout(resolve, delay));
  }

  public async post<T>(data: object, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    const headers = {
      'Content-Type': 'application/json', 'Authorization': `Bearer ${this.authToken}`, 'User-Agent': USER_AGENT
    };
    for (let attempt = 0; attempt <= this.clientConfig.maxRetries; attempt++) {
      try {
        return await this.axiosClient.post(this.url, data, {headers, ...config});
      } catch (error) {
        if (attempt < this.clientConfig.maxRetries) {
          await this.backoffDelay(attempt);

        } else {
          throw error;
        }
      }
    }
    throw new Error('Maximum retries exceeded');
  }
}


