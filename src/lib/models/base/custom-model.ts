import {BaseModel} from '@/lib/models/base/base-model';

export abstract class CustomModel<Body extends object,Response extends object> extends BaseModel {

  protected constructor(endpoint: string, authToken: string) {
    super(endpoint, authToken);
  }

  abstract generate(body: Body): Promise<Response>;
}
