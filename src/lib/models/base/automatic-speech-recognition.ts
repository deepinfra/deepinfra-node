import { AutomaticSpeechRecognitionRequest } from "@/lib/types/automatic-speech-recognition/request";
import { BaseModel } from "@/lib/models/base/base-model";
import { IClientConfig } from "@/lib/types/common/client-config";
import FormData from "form-data";
import { AutomaticSpeechRecognitionResponse } from "@/lib/types/automatic-speech-recognition/response";
import {ReadStreamUtils} from "@/lib/utils/read-stream";
import {FormDataUtil} from "@/lib/utils/form-data";

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
    const formData = await FormDataUtil.prepareFormData<AutomaticSpeechRecognitionRequest>(body, ["audio"]);
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
