import {AutomaticSpeechRecognitionBaseModel} from '@/lib/models/base/automatic-speech-recognition';

export class WhisperTimestampedMedium extends AutomaticSpeechRecognitionBaseModel {
  public static readonly endpoint = 'https://api.deepinfra.com/v1/inference/openai/whisper-timestamped-medium';

  constructor(authToken: string) {
    super(WhisperTimestampedMedium.endpoint, authToken);
  }
}
