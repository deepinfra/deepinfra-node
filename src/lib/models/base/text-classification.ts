import {TextClassificationRequest} from '@/lib/types/text-classification/request';
import {TextClassificationResponse} from '@/lib/types/text-classification/response';
import {CustomModel} from '@/lib/models/base/custom-model';
import {ClientConfig} from "@/lib/types/common/client-config";


export class TextClassificationBaseModel extends CustomModel<TextClassificationRequest,TextClassificationResponse> {
  protected constructor(protected endpoint: string, protected authToken: string, config?: ClientConfig) {
    super(endpoint, authToken, config);
  }
}
