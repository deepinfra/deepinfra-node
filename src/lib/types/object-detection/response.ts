import { Status } from "@/lib/types/common/status";
import { ImageItem } from "@/lib/types/common/image-item";

export interface ObjectDetectionBox {
  xmin: number;
  ymin: number;
  xmax: number;
  ymax: number;
}

export interface ObjectDetectionItem extends ImageItem {
  box: ObjectDetectionBox;
}

export interface ObjectDetectionResponse {
  results: ObjectDetectionItem[];
  request_id?: string;
  inference_status: Status;
}
