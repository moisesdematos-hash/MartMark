import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const statusUrl = new URL("../../lib/foundation-status.json", import.meta.url);
const foundation = JSON.parse(await readFile(statusUrl, "utf8"));

test("Phase 0 cannot announce production readiness", () => {
  assert.equal(foundation.currentPhase, 0);
  assert.equal(foundation.phaseStatus, "IN_PROGRESS");
  assert.equal(foundation.readyForProduction, false);
});

test("financial operations stay disabled until their gates pass", () => {
  assert.equal(foundation.financialOperationsEnabled, false);
});

test("the roadmap includes the 31 phases in the specification", () => {
  assert.equal(foundation.plannedPhaseCount, 31);
});
