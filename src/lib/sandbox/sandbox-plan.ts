/** A plan offered by GET /v1/sandboxes/catalog. */
export interface SandboxPlan {
  id: string;
  vcpu: number;
  ram_gb: number;
  disk_gb: number;
  price_per_hour: number;
}

export function parseSandboxPlan(data: Record<string, unknown>): SandboxPlan {
  return {
    id: data.id as string,
    vcpu: data.vcpu as number,
    ram_gb: data.ram_gb as number,
    disk_gb: data.disk_gb as number,
    price_per_hour: data.price_per_hour as number,
  };
}
