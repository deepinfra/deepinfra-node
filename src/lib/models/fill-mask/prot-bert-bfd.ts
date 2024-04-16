import {FillMaskBaseModel} from '@/lib/models/base';
import {ClientConfig} from "@/lib/types/common/client-config";


export class ProtBertBfd extends FillMaskBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/Rostlab/prot_bert_bfd';
  constructor(authToken: string, config?: ClientConfig) {
    super(ProtBertBfd.endpoint, authToken, config);
  }
}
