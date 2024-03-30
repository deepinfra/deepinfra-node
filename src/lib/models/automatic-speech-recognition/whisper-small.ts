import {AutomaticSpeechRecognitionBaseModel} from '@/lib/models/base/automatic-speech-recognition';

export class WhisperSmall extends AutomaticSpeechRecognitionBaseModel {
  public static readonly endpoint = 'https://api.deepinfra.com/v1/inference/openai/whisper-small';

  constructor(authToken: string) {
    super(WhisperSmall.endpoint, authToken);
  }
}
