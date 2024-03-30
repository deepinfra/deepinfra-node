import {Status} from '@/lib/types/common/status';

export interface TextClassificationResponse {
  results: TextClassificationItem[];
  request_id: string | null;
  inference_status: Status;
}

export interface TextClassificationItem {
  label: string;
  score: number;
}
