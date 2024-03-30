import {AutomaticSpeechRecognitionRequest} from '@/lib/types/automatic-speech-recognition/request';
import {BaseModel} from '@/lib/models/base/base-model';
import * as fs from 'node:fs';

export abstract class AutomaticSpeechRecognitionBaseModel extends BaseModel{

  protected constructor(endpoint: string, authToken: string) {
    super(endpoint, authToken);
  }


  async generate(body: AutomaticSpeechRecognitionRequest): Promise<AutomaticSpeechRecognitionRequest> {
    const {audio} = body;
    const base64Audio = fs.readFileSync(audio).toString('base64');
    const response =  await this.client.post<AutomaticSpeechRecognitionRequest>({
      ...body,
      audio: base64Audio
    });
    return response.data;
  }
}
