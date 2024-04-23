import { AutomaticSpeechRecognitionRequest } from "@/lib/types/automatic-speech-recognition/request";
import { BaseModel } from "@/lib/models/base/base-model";
import * as fs from "node:fs";
import { IClientConfig } from "@/lib/types/common/client-config";
import FormData from "form-data";
import {AutomaticSpeechRecognitionResponse} from "@/lib/types/automatic-speech-recognition/response";

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
    const base64Content = fs.readFileSync(audio).toString("base64");
    const response = await this.client.post<AutomaticSpeechRecognitionResponse>({
      ...body,
      audio: base64Content,
    });
    return response.data;
  }

  async generateWithFormData(
    body: AutomaticSpeechRecognitionRequest,
  ): Promise<AutomaticSpeechRecognitionResponse> {
    const {audio} = body;
    const formData = new FormData();
    formData.append("audio", fs.createReadStream(audio));
    const response = await this.client.post<AutomaticSpeechRecognitionResponse>(formData, {
      headers: {
        ...formData.getHeaders(),
      }
    });
    return response.data;
  }
}
