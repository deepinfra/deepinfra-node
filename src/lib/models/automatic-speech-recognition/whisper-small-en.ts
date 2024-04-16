import {AutomaticSpeechRecognitionBaseModel} from '@/lib/models/base';
import {ClientConfig} from "@/lib/types/common/client-config";

export class WhisperSmallEn extends AutomaticSpeechRecognitionBaseModel {
  public static readonly endpoint = 'https://api.deepinfra.com/v1/inference/openai/whisper-small.en';

  constructor(authToken: string, config?: ClientConfig) {
    super(WhisperSmallEn.endpoint, authToken, config);
  }
}
