import {BaseModel} from '@/lib/models/base/base-model';
import * as fs from 'node:fs';
import {ObjectDetectionRequest} from '@/lib/types/object-detection/request';
import {ObjectDetectionResponse} from '@/lib/types/object-detection/response';
import {ClientConfig} from "@/lib/types/common/client-config";

export abstract class ObjectDetectionBaseModel extends BaseModel{

  protected constructor(endpoint: string, authToken: string, config?: ClientConfig) {
    super(endpoint, authToken, config);
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
