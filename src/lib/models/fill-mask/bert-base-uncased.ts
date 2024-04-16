import {FillMaskBaseModel} from '@/lib/models/base';
import {IClientConfig} from '@/lib/types/common/client-config';


export class BertBaseUncased extends FillMaskBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/bert-base-uncased';
  constructor(authToken: string, config?: Partial<IClientConfig>) {
    super(BertBaseUncased.endpoint, authToken, config);
  }
}
