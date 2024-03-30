import {DeepInfraClient} from '@/clients';


export class BaseModel {
  protected client: DeepInfraClient;
  constructor(protected readonly endpoint: string,protected authToken: string) {
    this.client = new DeepInfraClient(this.endpoint, this.authToken);
  }
}
