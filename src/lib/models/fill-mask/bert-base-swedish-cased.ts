import {FillMaskBaseModel} from '@/lib/models/base';
import {IClientConfig} from '@/lib/types/common/client-config';


export class BertBaseSwedishCased extends FillMaskBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/KB/bert-base-swedish-cased';
  constructor(authToken: string, config?: IClientConfig) {
    super(BertBaseSwedishCased.endpoint, authToken, config);
  }
}
