import { ImageRequest } from "@/lib/types/common/image-request";

export interface ZeroShotImageClassificationRequest extends ImageRequest {
  candidate_labels: string[];
}
