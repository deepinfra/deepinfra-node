import { ObjectDetectionRequest } from "@/lib/types/object-detection/request";
import { ObjectDetectionResponse } from "@/lib/types/object-detection/response";
import { ImageBaseModel } from "@/lib/models/base/image-base-model";

export class ObjectDetection extends ImageBaseModel<
  ObjectDetectionRequest,
  ObjectDetectionResponse
> {}