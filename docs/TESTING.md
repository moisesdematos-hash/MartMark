# Testing strategy

## Foundation commands

1. `npm ci` installs the exact lockfile.
2. `npm run lint` checks the application source.
3. `npm run typecheck` runs TypeScript strict checking.
4. `npm test` verifies that Phase 0 does not announce production readiness and keeps financial operations disabled.
5. `npm audit --audit-level=high` checks dependency advisories in CI.
6. `npm run build` creates the Worker output.
7. `npm run test:integration` starts Wrangler's local Cloudflare runtime and confirms the built Worker serves the MartMark page.

## Current evidence

On 2026-10-03, a clean temporary install passed lint, typecheck, all unit tests, the high-severity dependency audit, build and the Worker runtime integration check. The GitHub workflow still needs to run against this updated source revision.

## Later phase coverage

Add negative authorization and persistence tests with Auth/Products. Add idempotency, webhook replay, ledger balancing, concurrency, refund reversal, payout reservation, recovery and E2E scenarios only when their corresponding server-side flows exist. No test in this Foundation baseline claims those flows are safe.
