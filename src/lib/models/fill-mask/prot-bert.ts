import {FillMaskBaseModel} from '@/lib/models/base';
import {IClientConfig} from '@/lib/types/common/client-config';


export class ProtBert extends FillMaskBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/Rostlab/prot_bert';
  constructor(authToken: string, config?: Partial<IClientConfig>) {
    super(ProtBert.endpoint, authToken, config);
  }
}
