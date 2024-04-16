import {TextClassificationBaseModel} from '@/lib/models/base';
import {ClientConfig} from "@/lib/types/common/client-config";


export class FinBert extends TextClassificationBaseModel {
  public static readonly endpoint = 'https://api.deepinfra.com/v1/inference/ProsusAI/finbert';
  constructor(authToken: string, config?: ClientConfig) {
    super(FinBert.endpoint, authToken, config);
  }
}
