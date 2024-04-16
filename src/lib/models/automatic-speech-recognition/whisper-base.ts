import { AutomaticSpeechRecognitionBaseModel } from "@/lib/models/base";

export class WhisperBase extends AutomaticSpeechRecognitionBaseModel {
  public static readonly endpoint =
    "https://api.deepinfra.com/v1/inference/openai/whisper-base";

  constructor(authToken: string) {
    super(WhisperBase.endpoint, authToken);
  }
}
