import { BaseModel } from '@/lib/models/base/base-model';
import { IClientConfig } from '@/lib/types/common/client-config';

export abstract class CustomModel<
  Request extends object,
  Response extends object,
> extends BaseModel {
  protected constructor(
    modelName: string,
    authToken?: string,
    config?: Partial<IClientConfig>,
  ) {
    super(modelName, authToken, config);
  }

  public async generate(body: Request): Promise<Response> {
    const response = await this.client.post<Response>(body);
    return response.data;
  }
}
