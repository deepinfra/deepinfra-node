import { Status } from "@/lib/types/common/status";

export interface ImageClassificationItem {
  label: string;
  score: number;
}

export interface ImageClassificationResponse {
  results: ImageClassificationItem[];
  request_id?: string;
  inference_status: Status;
}
