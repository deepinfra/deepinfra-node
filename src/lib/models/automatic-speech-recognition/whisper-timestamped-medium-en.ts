import { AutomaticSpeechRecognitionBaseModel } from "@/lib/models/base";

export class WhisperTimestampedMediumEn extends AutomaticSpeechRecognitionBaseModel {
  public static readonly endpoint =
    "https://api.deepinfra.com/v1/inference/openai/whisper-timestamped-medium.en";

  constructor(authToken: string) {
    super(WhisperTimestampedMediumEn.endpoint, authToken);
  }
}
