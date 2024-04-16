import {AutomaticSpeechRecognitionBaseModel} from '@/lib/models/base';
import {ClientConfig} from "@/lib/types/common/client-config";

export class WhisperBaseEn extends AutomaticSpeechRecognitionBaseModel {
  public static readonly endpoint = 'https://api.deepinfra.com/v1/inference/openai/whisper-base.en';

  constructor(authToken: string, config?: ClientConfig) {
    super(WhisperBaseEn.endpoint, authToken, config);
  }
}
