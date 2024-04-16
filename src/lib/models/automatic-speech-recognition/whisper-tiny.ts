import {AutomaticSpeechRecognitionBaseModel} from '@/lib/models/base';
import {IClientConfig} from '@/lib/types/common/client-config';

export class WhisperTiny extends AutomaticSpeechRecognitionBaseModel {
  public static readonly endpoint = 'https://api.deepinfra.com/v1/inference/openai/whisper-tiny';

  constructor(authToken: string, config?: Partial<IClientConfig>) {
    super(WhisperTiny.endpoint, authToken, config);
  }
}
