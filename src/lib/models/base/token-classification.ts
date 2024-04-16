import {CustomModel} from '@/lib/models/base/custom-model';
import {FillMaskRequest} from '@/lib/types/token-classification/request';
import {TokenClassificationResponse} from '@/lib/types/token-classification/response';
import {IClientConfig} from '@/lib/types/common/client-config';

export class TokenClassificationBaseModel extends CustomModel<FillMaskRequest, TokenClassificationResponse> {
  protected constructor(protected endpoint: string, protected authToken: string, config?: Partial<IClientConfig>) {
    super(endpoint, authToken, config);
  }
}
