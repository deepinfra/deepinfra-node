import { Status } from "@/lib/types/common/status";

export interface FillMaskItem {
  sequence: string;
  score: number;
  token: number;
  token_str: string;
}

export interface FillMaskResponse {
  results: FillMaskItem[];
  request_id?: string;
  inference_status: Status;
}
