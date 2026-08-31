/**
 * Sandbox quickstart: create, exec, file round-trip, terminate.
 *
 * Needs DEEPINFRA_API_KEY in the environment. Run with:
 *   npx ts-node -r tsconfig-paths/register examples/sandbox-quickstart.ts
 */
import { Sandbox } from "../src";

async function main(): Promise<void> {
  const sb = await Sandbox.create({
    plan: "small",
    timeout: "10m",
    tags: { demo: "quickstart" },
  });
  try {
    console.log("sandbox:", sb.id, sb.state);

    const uname = await sb.exec("uname", "-a");
    console.log("kernel:", uname.check().stdout.trim());

    const sum = await sb.runPython("print(sum(range(101)))");
    console.log("sum 0..100 =", sum.check().stdout.trim());

    await sb.fs.write("/workspace/hello.txt", "hello from the host\n");
    const readBack = await sb.fs.read("/workspace/hello.txt");
    console.log("read back:", readBack.toString("utf8").trim());
  } finally {
    await sb.terminate();
  }
}

main();
