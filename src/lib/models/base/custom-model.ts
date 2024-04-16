import { BaseModel } from "@/lib/models/base/base-model";

export abstract class CustomModel<
  Request extends object,
  Response extends object,
> extends BaseModel {
  protected constructor(endpoint: string, authToken: string) {
    super(endpoint, authToken);
  }

  public async generate(body: Request): Promise<Response> {
    const response = await this.client.post<Response>(body);
    return response.data;
  }
}
