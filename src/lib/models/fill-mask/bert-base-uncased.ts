import {FillMaskBaseModel} from '@/lib/models/base';
import {ClientConfig} from "@/lib/types/common/client-config";


export class BertBaseUncased extends FillMaskBaseModel {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/bert-base-uncased';
  constructor(authToken: string, config?: ClientConfig) {
    super(BertBaseUncased.endpoint, authToken, config);
  }
}
