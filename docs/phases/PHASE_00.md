# PHASE 00 — Foundation

## Status

`IN_PROGRESS`

Phase 0 is not PASSED. External accounts, staging resources, CI and the security/test gates have not been established.

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
- Installed the locked dependencies; `npm run lint`, `npm run typecheck` and `npm run build` pass for the current source.
- Added a least-privilege GitHub Actions workflow, Dependabot update configuration, three unit tests for readiness gates, and a built Worker entrypoint integration check.

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

An empty `.env.example` lists planned public Supabase values and server-only secrets. No real credentials are configured. Runtime secrets must be added through the hosting environment after their phase is ready.

## Migrations

None. No database schema or provider integration is implemented in Phase 0.

## Tests and checks

- Unit, integration, negative, authorization, persistence and concurrency test plans remain to be implemented with their applicable phases.
- `npm run lint` passes for the application source.
- `npm run typecheck` passes.
- `npm run build` passes and produces the deployable artifact.
- `npm test` passes (3 foundation gate tests).
- `npm run test:integration` passes (built Worker exposes a callable `fetch`).
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

1. GitHub, Vercel and Supabase environments are not connected/configured in this workspace.
2. The local test harness and CI workflow exist, but remote CI, secret scanning and review policy have not been enabled or observed.
3. The website source is ready locally, but publishing was blocked because the environment rejected the required private repository credential handoff to the packaging workflow.

## Remaining debt

Connect the GitHub account so the workflow can run on the repository, enable repository security controls, connect and isolate the development/staging services, and record evidence before marking this phase PASSED. Do not start Phase 1 until every acceptance criterion is satisfied. The MartMark workspace in this delivery remains a local preview until its source can be packaged and published.
