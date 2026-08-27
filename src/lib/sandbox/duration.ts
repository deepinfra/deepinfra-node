export type Duration = number | string;

const DURATION_RE = /(\d+)([hms])/g;
const FACTORS: Record<string, number> = { h: 3600, m: 60, s: 1 };

/**
 * Parse a duration into whole seconds.
 *
 * Accepts plain numbers (seconds) or strings like "90", "90s", "10m", "2h",
 * and compounds like "1h30m". Throws on anything else. Fractional seconds
 * are rounded up (0 means "use the server default", so 0.5 must not
 * silently become 0).
 */
export function parseDuration(value: Duration): number {
  if (typeof value === "number") {
    if (value < 0) {
      throw new Error(`Duration must be non-negative, got ${value}`);
    }
    return Math.ceil(value);
  }
  const text = value.trim().toLowerCase();
  if (!text) {
    throw new Error("Duration string is empty");
  }
  if (/^\d+$/.test(text)) {
    return Number.parseInt(text, 10);
  }
  const matches = [...text.matchAll(DURATION_RE)];
  if (matches.length === 0 || matches.map((m) => m[0]).join("") !== text) {
    throw new Error(
      `Invalid duration ${JSON.stringify(value)}; use seconds or e.g. "90s", "10m", "1h30m"`,
    );
  }
  return matches.reduce(
    (total, m) => total + Number.parseInt(m[1], 10) * FACTORS[m[2]],
    0,
  );
}
