import { AutomaticSpeechRecognitionBaseModel } from "@/lib/models/base";
import { IClientConfig } from "@/lib/types/common/client-config";

export class WhisperTinyEn extends AutomaticSpeechRecognitionBaseModel {
  public static readonly endpoint =
    "https://api.deepinfra.com/v1/inference/openai/whisper-tiny.en";

  constructor(authToken: string, config?: Partial<IClientConfig>) {
    super(WhisperTinyEn.endpoint, authToken, config);
  }
}
