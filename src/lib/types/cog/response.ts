import {CogRequest} from './request';

export type CogStatus = 'succeeded' | 'failed';
export interface CogResponse<Req, Res> extends CogRequest<Req> {
  status: CogStatus;
  created_at: string | null;
  started_at: string;
  complated_at: string;
  output: Res;
  error: string | null;
  logs: string;
  inference_status: {
    status: CogStatus,
    runtime_ms: number,
    cost: number,
    tokens_generated: number | null,
    tokens_input: number | null,
  },
  metrics: {
    predict_time: number;
  };
}
