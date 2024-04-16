import {AutomaticSpeechRecognitionBaseModel} from '@/lib/models/base';
import {ClientConfig} from "@/lib/types/common/client-config";

export class WhisperTimestampedMediumEn extends AutomaticSpeechRecognitionBaseModel {
  public static readonly endpoint = 'https://api.deepinfra.com/v1/inference/openai/whisper-timestamped-medium.en';

  constructor(authToken: string, config?: ClientConfig) {
    super(WhisperTimestampedMediumEn.endpoint, authToken, config);
  }
}
