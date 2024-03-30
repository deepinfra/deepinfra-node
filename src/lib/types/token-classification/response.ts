import {Status} from '@/lib/types/common/status';

export interface TokenClassificationItem {
  entity_group: string;
  score: number;
  word: string;
  start: number;
  end: number;
}


export interface TokenClassificationResponse {
  results: TokenClassificationItem[];
  request_id?: string;
  inference_status: Status;
}
