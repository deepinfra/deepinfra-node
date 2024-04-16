import { AutomaticSpeechRecognitionBaseModel } from "@/lib/models/base";
import { IClientConfig } from "@/lib/types/common/client-config";

export class WhisperSmall extends AutomaticSpeechRecognitionBaseModel {
  public static readonly endpoint =
    "https://api.deepinfra.com/v1/inference/openai/whisper-small";

  constructor(authToken: string, config?: Partial<IClientConfig>) {
    super(WhisperSmall.endpoint, authToken, config);
  }
}
