import {AutomaticSpeechRecognitionBaseModel} from '@/lib/models/base/automatic-speech-recognition';

export class WhisperTinyEn extends AutomaticSpeechRecognitionBaseModel {
  public static readonly endpoint = 'https://api.deepinfra.com/v1/inference/openai/whisper-tiny.en';

  constructor(authToken: string) {
    super(WhisperTinyEn.endpoint, authToken);
  }
}
