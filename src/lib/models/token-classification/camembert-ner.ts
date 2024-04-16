import {TokenClassificationBaseModel} from '@/lib/models/base';
import {IClientConfig} from '@/lib/types/common/client-config';


export class CamembertNer extends TokenClassificationBaseModel {

  public static readonly endpoint : string = 'https://api.deepinfra.com/v1/inference/Jean-Baptiste/camembert-ner';

  constructor(authToken: string, config?: Partial<IClientConfig>) {
    super(CamembertNer.endpoint, authToken, config);
  }

}
