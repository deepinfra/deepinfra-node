import {AutomaticSpeechRecognitionBaseModel} from '@/lib/models/base';
import {ClientConfig} from "@/lib/types/common/client-config";

export class WhisperMedium extends AutomaticSpeechRecognitionBaseModel {
  public static readonly endpoint = 'https://api.deepinfra.com/v1/inference/openai/whisper-medium';

  constructor(authToken: string, config?: ClientConfig) {
    super(WhisperMedium.endpoint, authToken, config);
  }
}
