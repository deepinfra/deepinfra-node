import { AutomaticSpeechRecognitionBaseModel } from "@/lib/models/base";

export class WhisperMediumEn extends AutomaticSpeechRecognitionBaseModel {
  public static readonly endpoint =
    "https://api.deepinfra.com/v1/inference/openai/whisper-medium.en";

  constructor(authToken: string) {
    super(WhisperMediumEn.endpoint, authToken);
  }
}
