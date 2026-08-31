/**
 * A sandbox's lifecycle state. The known values are listed for autocomplete
 * and typo-catching, but `string & {}` keeps the type open so an unrecognized
 * value from the server still widens instead of erroring.
 */
export type SandboxState =
  | "running"
  | "stopped"
  | "failed"
  | "deleted"
  | (string & {});

/** Server-side view of a sandbox (GET /v1/sandboxes/{id}). */
export interface SandboxInfo {
  sandbox_id: string;
  plan: string;
  image: string;
  state: SandboxState;
  tags: Record<string, string>;
  created_at: number;
  provider: string;
}

export function parseSandboxInfo(data: Record<string, unknown>): SandboxInfo {
  return {
    sandbox_id: (data.sandbox_id as string) ?? "",
    plan: (data.plan as string) ?? "",
    image: (data.image as string) ?? "",
    state: (data.state as SandboxState) ?? "",
    tags: (data.tags as Record<string, string>) ?? {},
    created_at: (data.created_at as number) ?? 0,
    provider: (data.provider as string) ?? "",
  };
}
