import {TextToImageRequest} from '@/lib/types/text-to-image/request';

export interface TextToImageResponse {
  request_id: string;
  inference_status: {
    status: 'unknown' | 'queued' | 'running' | 'succeeded' | 'failed';
    runtime_ms: number;
    cost: number;
    tokens_generated: number | null;
    tokens_input: number | null;
  };
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
