import {ClientConfig} from "@/lib/types/common/client-config";

export const MAX_RETRIES = 5;
export const INITIAL_BACKOFF = 5000;
export const SUBSEQUENT_BACKOFF = 2000;
export const USER_AGENT = 'DeepInfraClient by ovuruska';


export const DEFAULT_CONFIG : ClientConfig = {
  maxRetries: MAX_RETRIES,
  initialBackoff: INITIAL_BACKOFF,
  subsequentBackoff: SUBSEQUENT_BACKOFF
};
