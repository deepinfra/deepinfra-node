import {TokenClassificationBaseModel} from '@/lib/models/base';
import {ClientConfig} from "@/lib/types/common/client-config";


export class Gilbert extends TokenClassificationBaseModel {

  public static readonly endpoint : string = 'https://api.deepinfra.com/v1/inference/rajpurkarlab/gilbert';

  constructor(authToken: string, config?: ClientConfig) {
    super(Gilbert.endpoint, authToken, config);
  }

}
