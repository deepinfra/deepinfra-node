import {AutomaticSpeechRecognitionBaseModel} from '@/lib/models/base';


export class WhisperLarge extends AutomaticSpeechRecognitionBaseModel {
  public static readonly endpoint = 'https://api.deepinfra.com/v1/inference/openai/whisper-large';

  constructor(authToken: string) {
    super(WhisperLarge.endpoint, authToken);
  }
}
