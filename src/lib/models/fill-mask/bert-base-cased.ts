import {FillMaskBaseModel} from '@/lib/models/base';
import {IClientConfig} from '@/lib/types/common/client-config';


export class BertBaseCased extends FillMaskBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/bert-base-cased';
  constructor(authToken: string, config?: Partial<IClientConfig>) {
    super(BertBaseCased.endpoint, authToken, config);
  }
}
