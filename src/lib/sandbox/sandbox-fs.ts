import { RequestSpec } from "@/lib/http";
import { Sandbox } from "@/lib/sandbox/sandbox";
import { idPath } from "@/lib/sandbox/paths";

/** File transfer to/from a sandbox (absolute paths inside the guest). */
export class SandboxFS {
  private declare readonly sandbox: Sandbox;

  constructor(sandbox: Sandbox) {
    // Non-enumerable: sandbox.fs.sandbox === sandbox would otherwise be a
    // circular reference (and drag the sandbox's client along with it) that
    // breaks JSON.stringify(sandbox) and bloats console.log(sandbox) output.
    Object.defineProperty(this, "sandbox", {
      value: sandbox,
      enumerable: false,
    });
  }

  async write(path: string, data: Buffer | string): Promise<void> {
    await this.sandbox._client.request(this.writeSpec(path, data));
  }

  async read(path: string): Promise<Buffer> {
    const response = await this.sandbox._client.request(this.readSpec(path));
    return Buffer.isBuffer(response.data)
      ? response.data
      : Buffer.from(response.data);
  }

  private writeSpec(path: string, data: Buffer | string): RequestSpec {
    const content = typeof data === "string" ? Buffer.from(data, "utf8") : data;
    return {
      method: "PUT",
      path: this.contentPath(),
      params: { path },
      content,
      headers: { "Content-Type": "application/octet-stream" },
    };
  }

  private readSpec(path: string): RequestSpec {
    return { method: "GET", path: this.contentPath(), params: { path } };
  }

  private contentPath(): string {
    return idPath(this.sandbox.id, "fs", "content");
  }
}
