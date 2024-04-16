import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {INITIAL_BACKOFF, MAX_RETRIES, SUBSEQUENT_BACKOFF, USER_AGENT} from '@/lib/constants/client';
import {ClientConfig} from "@/lib/types/common/client-config";

export class DeepInfraClient {
  private axiosClient: AxiosInstance;
  private readonly maxRetries: number
  private readonly initialBackoff: number;
  private readonly subsequentBackoff: number;

  constructor(private readonly url: string, private readonly authToken: string,config?: ClientConfig) {
    this.axiosClient = axios.create({
      baseURL: this.url,
    });

    this.maxRetries = config?.maxRetries ?? MAX_RETRIES;
    this.initialBackoff = config?.initialBackoff ?? INITIAL_BACKOFF;
    this.subsequentBackoff = config?.subsequentBackoff ?? SUBSEQUENT_BACKOFF;
  }

  private async backoffDelay(attempt: number): Promise<void> {
    const delay = attempt === 1 ? this.initialBackoff : this.subsequentBackoff;
    return new Promise((resolve) => setTimeout(resolve, delay));
  }

  public async post<T>(data: object, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    const headers = {
      'Content-Type': 'application/json', 'Authorization': `Bearer ${this.authToken}`, 'User-Agent': USER_AGENT
    };
    for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
      try {
        const response = await this.axiosClient.post(this.url, data, {headers, ...config});
        return response;
      } catch (error) {
        if (attempt < this.maxRetries) {
          await this.backoffDelay(attempt);

        } else {
          throw error;
        }
      }
    }
    throw new Error('Maximum retries exceeded');
  }
}


