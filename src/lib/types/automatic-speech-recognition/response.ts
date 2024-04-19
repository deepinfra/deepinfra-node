import { Status } from '@/lib/types/common/status';

interface AutomaticSpeechRecognitionWord {
  text: string;
  start: number;
  end: number;
  confidence: number;
}

interface AutomaticSpeechRecognitionSegment {
  id: number;
  seek: number;
  start: number;
  end: number;
  text: string;
  tokens: number[];
  temperature?: number;
  avg_logprob?: number;
  compression_ratio?: number;
  no_speech_prob?: number;
  confidence?: number;
  words?: AutomaticSpeechRecognitionWord[];
}

export interface AutomaticSpeechRecognitionResponse {
  text: string;
  segments: AutomaticSpeechRecognitionSegment[];
  language: string;
  input_length_ms?: number;
  request_id?: string;
  inference_status: Status;
}
