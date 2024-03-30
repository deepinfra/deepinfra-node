import {TextToImageRequest} from '@/lib/types/text-to-image/request';
import {Status} from '@/lib/types/common/status';

export interface TextToImageResponse {
  request_id: string;
  inference_status: Status;
  input: TextToImageRequest;
  output: string[];
  id: string;
  version: string | null;
  created_at: string | null;
  started_at: string;
  completed_at: string;
  logs: string;
  error: string | null;
  status: 'succeeded';
  metrics: {
    predict_time: number;
  };
  webhook: string | null;
  webhook_events_filter: string[];
  output_file_prefix: string;
}
