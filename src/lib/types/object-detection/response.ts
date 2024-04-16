import { Status } from "@/lib/types/common/status";

export interface ObjectDetectionBox {
  xmin: number;
  ymin: number;
  xmax: number;
  ymax: number;
}

export interface ObjectDetectionItem {
  label: string;
  score: number;
  box: ObjectDetectionBox;
}

export interface ObjectDetectionResponse {
  results: ObjectDetectionItem[];
  request_id?: string;
  inference_status: Status;
}
