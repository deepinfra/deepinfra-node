import {Status} from '@/lib/types/common/status';

export interface TextToImageResponse {
  images: string[];
  nsfw_content_detected: boolean[];
  seed: number;

  request_id: string;
  inference_status: Status;
}
