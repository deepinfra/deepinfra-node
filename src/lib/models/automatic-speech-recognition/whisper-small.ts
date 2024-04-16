import {AutomaticSpeechRecognitionBaseModel} from '@/lib/models/base';
import {ClientConfig} from "@/lib/types/common/client-config";

export class WhisperSmall extends AutomaticSpeechRecognitionBaseModel {
  public static readonly endpoint = 'https://api.deepinfra.com/v1/inference/openai/whisper-small';

  constructor(authToken: string, config?: ClientConfig) {
    super(WhisperSmall.endpoint, authToken, config);
  }
}
