import {FillMaskBaseModel} from '@/lib/models/base';
import {IClientConfig} from '@/lib/types/common/client-config';


export class BertLargeUncased extends FillMaskBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/bert-large-uncased';
  constructor(authToken: string, config?: Partial<IClientConfig>) {
    super(BertLargeUncased.endpoint, authToken, config);
  }
}
