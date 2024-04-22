import { ImageClassificationRequest } from "@/lib/types/image-classification/request";
import { ImageClassificationResponse } from "@/lib/types/image-classification/response";
import { ImageBaseModel } from "@/lib/models/base/image-base-model";

export class ImageClassification extends ImageBaseModel<
  ImageClassificationRequest,
  ImageClassificationResponse
> {}