import {CustomModel} from '@/lib/models/base/custom-model';
import {TokenClassificationRequest} from '@/lib/types/token-classification/request';
import {TokenClassificationResponse} from '@/lib/types/token-classification/response';

export class TokenClassificationBaseModel extends CustomModel<TokenClassificationRequest, TokenClassificationResponse> {
  protected constructor(protected endpoint: string, protected authToken: string) {
    super(endpoint, authToken);
  }

  async generate(body: TokenClassificationRequest): Promise<TokenClassificationResponse> {
    const response = await this.client.post<TokenClassificationResponse>(body);
    return response.data;
  }
}
