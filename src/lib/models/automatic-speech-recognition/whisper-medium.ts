import {AutomaticSpeechRecognitionBaseModel} from '@/lib/models/base';
import {IClientConfig} from '@/lib/types/common/client-config';

export class WhisperMedium extends AutomaticSpeechRecognitionBaseModel {
  public static readonly endpoint = 'https://api.deepinfra.com/v1/inference/openai/whisper-medium';

  constructor(authToken: string, config?: Partial<IClientConfig>) {
    super(WhisperMedium.endpoint, authToken, config);
  }
}
