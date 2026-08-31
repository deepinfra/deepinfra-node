export const SANDBOXES = "/v1/sandboxes";

/**
 * Build a /v1/sandboxes/{id}[/...] path with the id URL-encoded.
 *
 * Encoding keeps ids like "../models" from escaping the path, so a bad id
 * always surfaces as a clean 404 instead of hitting an unrelated endpoint.
 */
export function idPath(sandboxId: string, ...suffix: string[]): string {
  if (!sandboxId) {
    throw new Error("sandboxId must not be empty");
  }
  return [SANDBOXES, encodeURIComponent(sandboxId), ...suffix].join("/");
}
