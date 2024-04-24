import { AutomaticSpeechRecognitionRequest } from "@/lib/types/automatic-speech-recognition/request";
import { BaseModel } from "@/lib/models/base/base-model";
import { IClientConfig } from "@/lib/types/common/client-config";
import FormData from "form-data";
import { AutomaticSpeechRecognitionResponse } from "@/lib/types/automatic-speech-recognition/response";
import {ReadStreamUtils} from "@/lib/utils/read-stream";

export class AutomaticSpeechRecognition extends BaseModel {
  constructor(
    modelName: string,
    authToken?: string,
    config?: Partial<IClientConfig>,
  ) {
    super(modelName, authToken, config);
  }

  async generate(
    body: AutomaticSpeechRecognitionRequest,
  ): Promise<AutomaticSpeechRecognitionResponse> {
    const { audio, ...rest } = body;
    const formData = new FormData();
    const readStream = await ReadStreamUtils.getReadStream(audio);
    formData.append("audio", readStream);
    Object.entries(rest).forEach(([key, value]) => {
      formData.append(key, JSON.stringify(value));
    });
    const response = await this.client.post<AutomaticSpeechRecognitionResponse>(
      formData,
      {
        headers: {
          ...formData.getHeaders(),
        },
      },
    );
    return response.data;
  }
}
