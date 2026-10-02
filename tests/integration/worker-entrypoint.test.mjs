import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:net";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("../../", import.meta.url));
const wranglerCli = fileURLToPath(new URL("../../node_modules/wrangler/bin/wrangler.js", import.meta.url));

async function getFreePort() {
  const server = createServer();
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const { port } = server.address();
  await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  return port;
}

async function waitForSite(child, url, getOutput) {
  const deadline = Date.now() + 90_000;
  while (Date.now() < deadline) {
    if (child.exitCode !== null) throw new Error(`Wrangler exited before serving the site.\n${getOutput()}`);
    try {
      return await fetch(url);
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }
  throw new Error(`Wrangler did not serve the site within 90 seconds.\n${getOutput()}`);
}

test("built Site serves a page through the Cloudflare runtime", { timeout: 120_000 }, async () => {
  const port = await getFreePort();
  let output = "";
  const child = spawn(process.execPath, [
    wranglerCli,
    "dev",
    "--config", "dist/server/wrangler.json",
    "--local",
    "--persist-to", path.join(".wrangler", "ci-integration-state"),
    "--ip", "127.0.0.1",
    "--port", String(port),
    "--inspector-port", "0",
  ], {
    cwd: projectRoot,
    env: {
      ...process.env,
      CLOUDFLARE_CF_FETCH_ENABLED: "false",
      XDG_CONFIG_HOME: path.join(projectRoot, ".wrangler", "ci-xdg-config"),
      WRANGLER_SEND_METRICS: "false",
      WRANGLER_WRITE_LOGS: "false",
    },
    stdio: ["ignore", "pipe", "pipe"],
  });
  const capture = (chunk) => { output = `${output}${chunk}`.slice(-8_000); };
  child.stdout.on("data", capture);
  child.stderr.on("data", capture);

  try {
    const response = await waitForSite(child, `http://127.0.0.1:${port}/`, () => output);
    assert.equal(response.status, 200, output);
    assert.match(await response.text(), /MartMark/);
  } finally {
    if (child.exitCode === null) {
      child.kill("SIGTERM");
      await Promise.race([
        new Promise((resolve) => child.once("exit", resolve)),
        new Promise((resolve) => setTimeout(resolve, 5_000)),
      ]);
      if (child.exitCode === null) child.kill("SIGKILL");
    }
  }
});
