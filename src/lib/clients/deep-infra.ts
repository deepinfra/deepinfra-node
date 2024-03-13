import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {INITIAL_BACKOFF, MAX_RETRIES, SUBSEQUENT_BACKOFF, USER_AGENT} from '@/lib/constants/client';

export class DeepInfraClient {
  private axiosClient: AxiosInstance;
  private readonly maxRetries: number = MAX_RETRIES;
  private readonly initialBackoff: number = INITIAL_BACKOFF;
  private readonly subsequentBackoff: number = SUBSEQUENT_BACKOFF;

  constructor(private readonly url: string, private readonly authToken: string) {
    this.axiosClient = axios.create({
      baseURL: this.url,
    });
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
          console.log(`Request failed, retrying... Attempt ${attempt + 1}/${this.maxRetries}`);
          await this.backoffDelay(attempt);

        } else {
          // Re-throw error on last attempt
          throw error;
        }
      }
    }
    throw new Error('Maximum retries exceeded');
  }
}


