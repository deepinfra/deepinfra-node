import {FillMaskBaseModel} from '@/lib/models/base';
import {ClientConfig} from "@/lib/types/common/client-config";

export class BertBaseAraBertV02 extends FillMaskBaseModel {
  public static readonly endpoint = 'https://api.deepinfra.com/v1/inference/aubmindlab/bert-base-arabertv02';
  constructor(authToken: string, config?: ClientConfig) {
    super(BertBaseAraBertV02.endpoint, authToken, config);
  }
}
