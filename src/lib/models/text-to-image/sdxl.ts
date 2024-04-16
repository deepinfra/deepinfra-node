import {CogBaseModel} from '@/lib/models/base/cog-model';
import {SdxlIn} from '@/lib/types/cog/sdxl/request';
import {SdxlOut} from '@/lib/types/cog/sdxl/response';
import {IClientConfig} from '@/lib/types/common/client-config';

export class Sdxl extends CogBaseModel<SdxlIn, SdxlOut> {
  public static readonly endpoint: string = 'https://api.deepinfra.com/v1/inference/stability-ai/sdxl';
  constructor(authToken: string, config?: IClientConfig) {
    super(Sdxl.endpoint, authToken, config);
  }
}
