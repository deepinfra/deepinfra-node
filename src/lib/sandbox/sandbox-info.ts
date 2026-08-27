/** Server-side view of a sandbox (GET /v1/sandboxes/{id}). */
export interface SandboxInfo {
  sandbox_id: string;
  plan: string;
  image: string;
  state: string;
  tags: Record<string, string>;
  created_at: number;
  provider: string;
}

export function parseSandboxInfo(data: Record<string, unknown>): SandboxInfo {
  return {
    sandbox_id: (data.sandbox_id as string) ?? "",
    plan: (data.plan as string) ?? "",
    image: (data.image as string) ?? "",
    state: (data.state as string) ?? "",
    tags: (data.tags as Record<string, string>) ?? {},
    created_at: (data.created_at as number) ?? 0,
    provider: (data.provider as string) ?? "",
  };
}
