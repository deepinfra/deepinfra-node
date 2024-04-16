import {AutomaticSpeechRecognitionBaseModel} from '@/lib/models/base';
import {ClientConfig} from "@/lib/types/common/client-config";

export class WhisperTinyEn extends AutomaticSpeechRecognitionBaseModel {
  public static readonly endpoint = 'https://api.deepinfra.com/v1/inference/openai/whisper-tiny.en';

  constructor(authToken: string, config?: ClientConfig) {
    super(WhisperTinyEn.endpoint, authToken, config);
  }
}
