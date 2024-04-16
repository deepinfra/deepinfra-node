import {AutomaticSpeechRecognitionBaseModel} from '@/lib/models/base';
import {ClientConfig} from "@/lib/types/common/client-config";

export class WhisperTiny extends AutomaticSpeechRecognitionBaseModel {
  public static readonly endpoint = 'https://api.deepinfra.com/v1/inference/openai/whisper-tiny';

  constructor(authToken: string, config?: ClientConfig) {
    super(WhisperTiny.endpoint, authToken, config);
  }
}
