import { Status } from "@/lib/types/common/status";

export interface QuestionAnsweringResponse {
  answer: string;
  score: number;
  start: number;
  end: number;
  request_id: string | null;
  inference_status: Status;
}
