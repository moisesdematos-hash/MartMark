# Testing strategy

## Foundation commands

1. `npm ci` installs the exact lockfile.
2. `npm run lint` checks the application source.
3. `npm run typecheck` runs TypeScript strict checking.
4. `npm test` verifies that Phase 0 does not announce production readiness and keeps financial operations disabled.
5. `npm audit --audit-level=high` checks dependency advisories in CI.
6. `npm run build` creates the Worker output.
7. `npm run test:integration` imports the built Worker and confirms it exports a callable `fetch` handler.

## Current evidence

The lint, typecheck, unit tests, build and built-entrypoint integration check passed locally for this source state. GitHub CI has not run because the repository connection is not active.

## Later phase coverage

Add negative authorization and persistence tests with Auth/Products. Add idempotency, webhook replay, ledger balancing, concurrency, refund reversal, payout reservation, recovery and E2E scenarios only when their corresponding server-side flows exist. No test in this Foundation baseline claims those flows are safe.
