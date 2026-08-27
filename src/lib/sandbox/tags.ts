/** True when every key/value in subset is present in tags. */
export function tagsMatch(
  subset: Record<string, string>,
  tags: Record<string, string>,
): boolean {
  return Object.entries(subset).every(([k, v]) => tags[k] === v);
}
