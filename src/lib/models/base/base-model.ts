import {DeepInfraClient} from '@/lib/clients';


export class BaseModel {
  protected client: DeepInfraClient;
  constructor(private readonly endpoint: string,protected authToken: string) {
    this.client = new DeepInfraClient(this.endpoint, this.authToken);
  }
}
