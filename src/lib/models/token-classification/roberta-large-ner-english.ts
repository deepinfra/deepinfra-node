import {TokenClassificationBaseModel} from '@/lib/models/base';
import {ClientConfig} from "@/lib/types/common/client-config";

export class RobertaLargeNerEnglish extends TokenClassificationBaseModel {

  public static readonly endpoint : string = 'https://api.deepinfra.com/v1/inference/Jean-Baptiste/roberta-large-ner-english';

  constructor(authToken: string, config?: ClientConfig) {
    super(RobertaLargeNerEnglish.endpoint, authToken, config);
  }

}
