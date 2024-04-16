import {AutomaticSpeechRecognitionBaseModel} from '@/lib/models/base';
import {ClientConfig} from "@/lib/types/common/client-config";

export class WhisperMediumEn extends AutomaticSpeechRecognitionBaseModel {
  public static readonly endpoint = 'https://api.deepinfra.com/v1/inference/openai/whisper-medium.en';

  constructor(authToken: string, config?: ClientConfig) {
    super(WhisperMediumEn.endpoint, authToken, config);
  }
}
