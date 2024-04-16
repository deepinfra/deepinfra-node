import { AutomaticSpeechRecognitionBaseModel } from "@/lib/models/base";

export class WhisperTiny extends AutomaticSpeechRecognitionBaseModel {
  public static readonly endpoint =
    "https://api.deepinfra.com/v1/inference/openai/whisper-tiny";

  constructor(authToken: string) {
    super(WhisperTiny.endpoint, authToken);
  }
}
