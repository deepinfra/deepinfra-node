import {FillMaskBaseModel} from '@/lib/models/base';
import {IClientConfig} from '@/lib/types/common/client-config';


export class BertLargeCased extends FillMaskBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/bert-large-cased';
  constructor(authToken: string, config?: IClientConfig) {
    super(BertLargeCased.endpoint, authToken, config);
  }
}
