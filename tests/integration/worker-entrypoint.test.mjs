import assert from "node:assert/strict";
import test from "node:test";

test("built Site exposes a Cloudflare-compatible fetch handler", async () => {
  const workerUrl = new URL("../../dist/server/index.js", import.meta.url);
  const worker = await import(workerUrl.href);
  assert.equal(typeof worker.default?.fetch, "function");
});
