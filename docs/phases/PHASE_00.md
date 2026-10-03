# PHASE 00 — Foundation

## Status

`IN_PROGRESS`

Phase 0 is not PASSED. Baseline CI is configured, but the post-merge main run exposed an unresolved development-tool advisory. Repository security controls, isolated staging resources, deployment previews and approval/recovery evidence remain open.

## Objective

Establish the project inventory, canonical system boundaries, environment plan, security constraints and CI acceptance criteria before implementing authentication or financial features.

## Implementation in this delivery

- Created the MartMark foundation workspace with overview, architecture, integration and phase views.
- Added initial architecture, RLS planning and environment variable documentation.
- Kept payments, balances, KYC and entitlements inactive; no simulated success paths are present.
- Added project metadata and a custom MartMark favicon.

## Initial inventory

- The workspace was empty apart from output and scratch folders.
- A fresh Vinext starter was initialized with a portable execution profile.
- The starter includes React, TypeScript, Tailwind, accessible sidebar primitives, and a Cloudflare-compatible deployment path.
- There was no existing application, schema, migration, CI pipeline, provider configuration, test suite or environment file to preserve.
- Updated vulnerable framework and runtime dependencies, aligned the Cloudflare plugin and Workers types, and refreshed the lockfile.
- Added a least-privilege GitHub Actions workflow, Dependabot update configuration, three unit tests for readiness gates, and a built Worker runtime integration check.

## KEEP / REFACTOR / REPLACE / REMOVE

- **KEEP:** Vinext starter build and Sites packaging path, Tailwind setup, accessible sidebar primitives, strict TypeScript base.
- **REPLACE:** starter page, starter metadata, starter favicon, starter README.
- **REFACTOR:** package identity and scripts after the first dependency install/build review.
- **REMOVE:** no project-specific legacy code identified; avoid removing starter infrastructure before deployment works.

## Architecture decisions

- PostgreSQL/Supabase is the intended single source of truth.
- V1 target: GitHub → Vercel → Supabase, with ProxyPay and Resend as server-only integrations.
- Financial rules, authorization, webhook processing, ledger updates and final prices must live on the server.
- Development, staging and production must use separate data and credentials.

## Environment variables

The blank `.env.example` lists planned public Supabase values and server-only secrets. Local public Supabase configuration is kept in ignored `.env.local`; no server credentials or hosted secrets are configured. Runtime secrets must be added through the hosting environment after their phase is ready.

## Migrations

None. No database schema or provider integration is implemented in Phase 0.

## Tests and checks

- Unit, integration, negative, authorization, persistence and concurrency test plans remain to be implemented with their applicable phases.
- `npm run lint` passes for the application source.
- `npm run typecheck` passes.
- `npm run build` passes and produces the deployable artifact.
- `npm test` passes (3 foundation gate tests).
- `npm run test:integration` starts Wrangler's local Cloudflare runtime and confirms that the built Worker serves the MartMark page.
- A clean temporary install passes lint, typecheck, all 3 unit tests, `npm audit --audit-level=high`, build and the Worker runtime integration test on 2026-10-03.
- The full dependency audit reports moderate `fflate` findings in `vinext`'s `@vercel/og` chain and a high `braces` advisory (GHSA-vfj7-8cjw-p6xm) in development/build tooling. GitHub's advisory lists no patched version as of 2026-10-03. The production-only audit passes with zero vulnerabilities. The full audit stays visible as an advisory while the production audit remains blocking. The CI threshold is high.
- GitHub Actions runs 10 and 11 passed on PR #6. PR #6 was merged into `main` at commit `b11aa88` on 2026-10-03. The first post-merge run (run 12) passed install, lint, typecheck and unit tests, then failed at the full dependency audit; build and integration steps were skipped. The failure was the high `braces` advisory noted above. The production-only audit returned zero vulnerabilities.
- Negative authorization, persistence and concurrency suites are not applicable until their later phases implement those capabilities.
- No financial or identity assertions are claimed.

## Security review

- No provider credentials or personal data are present in the application.
- Financial and KYC actions remain unavailable.
- The RLS document is a draft planning matrix, not deployed policy.
- Secret scanning, CI, rate limits, threat model, webhook verification and audit persistence remain open.

## Acceptance criteria

- [x] Repository inventory performed for the new workspace.
- [x] Intended architecture and environment boundaries documented.
- [x] Initial RLS matrix and secret naming plan documented.
- [ ] GitHub repository and review policy configured.
- [ ] CI and dependency/secret scanning are configured and pass remotely.
- [x] Application lint, typecheck and production build pass.
- [ ] Supabase development and staging environments created and isolated.
- [ ] Vercel preview/staging configuration and rollback documented.
- [ ] Required test harnesses, evidence and recovery expectations agreed and recorded.

## Blockers

1. The public GitHub repository has no verified branch protection/review policy, secret scanning or push protection.
2. The post-merge `main` CI run failed at the full dependency audit because of an unpatched high advisory in development/build tooling; a production-only audit passed with zero vulnerabilities.
3. Supabase development/staging and Vercel preview/staging environments are not connected or isolated.
4. Publishing through the Sites packaging workflow remains blocked because the environment rejected the required repository credential handoff.

## Remaining debt

Verify the updated CI audit policy, configure repository security controls, connect and isolate the development/staging services, resolve the Sites publishing credential handoff, and record evidence before marking this phase PASSED. Do not start Phase 1 until every acceptance criterion is satisfied. The MartMark workspace remains a local preview until its source can be packaged and published.
