import {DeepInfraClient} from '@/clients';
import {ClientConfig} from "@/lib/types/common/client-config";


export class BaseModel {
  protected client: DeepInfraClient;
  constructor(protected readonly endpoint: string,protected authToken: string, config?: ClientConfig) {
    this.client = new DeepInfraClient(this.endpoint, this.authToken, config);
  }
}
