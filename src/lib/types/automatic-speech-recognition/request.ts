export interface AutomaticSpeechRecognitionRequest {
  audio: string;
  task?: 'transcribe' | 'translate';
  language?: string;
  temperature?: number;
  patience?: number;
  suppress_tokens?: string;
  initial_prompt?: string;
  condition_on_previous_text?: boolean;
  temperature_increment_on_fallback?: number;
  compression_ratio_threshold?: number;
  logprob_threshold?: number;
  no_speech_threshold?: number;
  webhook?: string;
}
