export type WebhookEventType = "start" | "output" | "logs" | "completed";

export interface CogRequest<Req> {
  id?: string;
  version?: string | null;
  input: Req;
  webhook?: string | null;
  webhook_events_filter?: WebhookEventType[];
}
