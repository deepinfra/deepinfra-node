import { AutomaticSpeechRecognitionRequest } from "@/lib/types/automatic-speech-recognition/request";
import { BaseModel } from "@/lib/models/base/base-model";
import * as fs from "node:fs";
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
    const { audio } = body;
    const formData = new FormData();
    const readStream = await ReadStreamUtils.getReadStream(audio);
    formData.append("audio", readStream);
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
