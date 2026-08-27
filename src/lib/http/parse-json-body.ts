/** Parse a raw response body (Buffer/ArrayBuffer/string) as JSON, falling back to text. */
export function parseJsonBody(data: unknown): unknown {
  if (data === undefined || data === null) {
    return undefined;
  }
  let text: string;
  if (Buffer.isBuffer(data)) {
    text = data.toString("utf8");
  } else if (data instanceof ArrayBuffer) {
    text = Buffer.from(data).toString("utf8");
  } else if (typeof data === "string") {
    text = data;
  } else {
    text = String(data);
  }
  if (!text) {
    return undefined;
  }
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}
