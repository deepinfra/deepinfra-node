import {FillMaskBaseModel} from '@/lib/models/base';


export class ProtBertBfd extends FillMaskBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/Rostlab/prot_bert_bfd';
  constructor(authToken: string) {
    super(ProtBertBfd.endpoint, authToken);
  }
}
