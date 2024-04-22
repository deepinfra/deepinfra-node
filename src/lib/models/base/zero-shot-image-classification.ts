import { ZeroShotImageClassificationRequest } from "@/lib/types/zero-shot-image-classification/request";
import { ZeroShotImageClassificationResponse } from "@/lib/types/zero-shot-image-classification/response";
import { ImageBaseModel } from "@/lib/models/base/image-base-model";

export class ZeroShotImageClassification extends ImageBaseModel<
  ZeroShotImageClassificationRequest,
  ZeroShotImageClassificationResponse
> {}
