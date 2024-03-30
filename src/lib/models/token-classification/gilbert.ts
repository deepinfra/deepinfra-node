import {TokenClassificationBaseModel} from '@/lib/models/base';


export class Gilbert extends TokenClassificationBaseModel {

  public static readonly endpoint : string = 'https://api.deepinfra.com/v1/inference/rajpurkarlab/gilbert';

  constructor(authToken: string) {
    super(Gilbert.endpoint, authToken);
  }

}
