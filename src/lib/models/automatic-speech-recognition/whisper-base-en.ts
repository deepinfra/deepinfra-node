import {AutomaticSpeechRecognitionBaseModel} from '@/lib/models/base/automatic-speech-recognition';

export class WhisperBaseEn extends AutomaticSpeechRecognitionBaseModel {
  public static readonly endpoint = 'https://api.deepinfra.com/v1/inference/openai/whisper-base.en';

  constructor(authToken: string) {
    super(WhisperBaseEn.endpoint, authToken);
  }
}
