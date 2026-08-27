/** Yield an endless exponential backoff schedule with +/- jitter, in seconds. */
export function* backoffDelays(
  initial = 0.5,
  maximum = 3,
  factor = 2,
  jitter = 0.2,
): Generator<number> {
  let delay = initial;
  for (;;) {
    yield delay * (1 - jitter + Math.random() * 2 * jitter);
    delay = Math.min(delay * factor, maximum);
  }
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
