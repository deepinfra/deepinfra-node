import {BaseModel} from '@/lib/models/base/base-model';
import * as fs from 'node:fs';
import {ObjectDetectionRequest} from '@/lib/types/object-detection/request';
import {ObjectDetectionResponse} from '@/lib/types/object-detection/response';

export abstract class ObjectDetectionBaseModel extends BaseModel{

  protected constructor(endpoint: string, authToken: string) {
    super(endpoint, authToken);
  }


  async generate(body: ObjectDetectionRequest): Promise<ObjectDetectionResponse> {
    const {image} = body;
    const base64Audio = fs.readFileSync(image).toString('base64');
    const response =  await this.client.post<ObjectDetectionResponse>({
      ...body,
      image: base64Audio
    });
    return response.data;
  }
}
