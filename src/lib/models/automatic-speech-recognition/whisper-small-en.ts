import { AutomaticSpeechRecognitionBaseModel } from "@/lib/models/base";

export class WhisperSmallEn extends AutomaticSpeechRecognitionBaseModel {
  public static readonly endpoint =
    "https://api.deepinfra.com/v1/inference/openai/whisper-small.en";

  constructor(authToken: string) {
    super(WhisperSmallEn.endpoint, authToken);
  }
}
