import {AutomaticSpeechRecognitionBaseModel} from '@/lib/models/base';
import {ClientConfig} from "@/lib/types/common/client-config";


export class WhisperLarge extends AutomaticSpeechRecognitionBaseModel {
  public static readonly endpoint = 'https://api.deepinfra.com/v1/inference/openai/whisper-large';

  constructor(authToken: string, config?: ClientConfig) {
    super(WhisperLarge.endpoint, authToken, config);
  }
}
