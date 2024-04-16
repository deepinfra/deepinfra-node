import {TokenClassificationBaseModel} from '@/lib/models/base';
import {ClientConfig} from "@/lib/types/common/client-config";

export class TinyDistilBertBaseCased extends TokenClassificationBaseModel {

  public static readonly endpoint : string = 'https://api.deepinfra.com/v1/inference/sshleifer/tiny-distilbert-base-cased';

  constructor(authToken: string, config?: ClientConfig) {
    super(TinyDistilBertBaseCased.endpoint, authToken, config);
  }

}
