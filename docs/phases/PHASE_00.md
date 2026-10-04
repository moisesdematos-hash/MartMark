# PHASE 00 — Foundation

## Status

`IN_PROGRESS`

Phase 0 is not PASSED. CI is green on `main`, an active ruleset protects `main` with pull-request and CI requirements, and Gitleaks scans pull requests and `main`. PR #12 added the native Next.js Vercel build to CI; it passed on Linux and was merged at `1ecef20`. The `martmark` Vercel project was briefly connected to GitHub, but the connection was removed after GitHub Dependabot branches unexpectedly produced deployments marked as Production. All six deployments created during that connection were deleted; no deployments or active Vercel URLs remain. Automatic Git deployments are disabled in `vercel.json` until the Phase 0 gate passes. GitHub's native secret scanning runs automatically because the repository is public; user-level push protection is on by default for public repositories. The repository settings page confirms Secret Protection and push protection are enabled; the secret-scanning page reports zero open alerts (verified 2026-10-03). A separate Supabase staging project is configured in Vercel's Preview environment with public values only; its Auth health endpoint responded successfully. A protected Vercel Preview is Ready at `https://martmark-nq040q893-moisesdematos-hashs-projects.vercel.app`; `vercel inspect` confirmed `target: preview` and `vercel curl /` returned the application HTML (verified 2026-10-04). The first successful deployment on the empty Vercel project was automatically assigned to Production; it was removed after a Preview became Ready. No Production deployment currently exists. Rollback exercise, private Sites publication, and approval/recovery evidence remain open.

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
- GitHub Actions runs 10 and 11 passed on PR #6. PR #6 was merged into `main` at commit `b11aa88` on 2026-10-03. The first post-merge run (run 12) passed install, lint, typecheck and unit tests, then failed at the full dependency audit; build and integration steps were skipped because of the high `braces` advisory noted above. The production-only audit returned zero vulnerabilities.
- PR #7 merged the audit policy into `main` at commit `74dec89` on 2026-10-03. Main CI run 17 (`37140887773`) passed clean install, lint, typecheck, unit tests, production audit, advisory full audit, build and integration checks.
- PR #9 added a commit-pinned Gitleaks secret scan to the required `Validate application` workflow, with read-only pull request token permissions and comments/artifact uploads disabled. The PR scan passed; after merge at `355b02c`, main CI run `37147962904` also passed.
- Negative authorization, persistence and concurrency suites are not applicable until their later phases implement those capabilities.
- No financial or identity assertions are claimed.

## Security review

- No provider credentials or personal data are present in the application.
- Financial and KYC actions remain unavailable.
- The RLS document is a draft planning matrix, not deployed policy.
- An active GitHub ruleset protects `main`: pull requests and `Validate application` are required, deletion and non-fast-forward updates are blocked, and no bypass actors are configured. It does not require an approval review.
- The Gitleaks scan runs in the CI workflow. The repository settings show Secret Protection and push protection enabled, and the secret-scanning page reports zero open alerts (verified 2026-10-03). Rate limits, threat model, webhook verification and audit persistence also remain open.

## Acceptance criteria

- [x] Repository inventory performed for the new workspace.
- [x] Intended architecture and environment boundaries documented.
- [x] Initial RLS matrix and secret naming plan documented.
- [x] Active GitHub ruleset on `main` requires a pull request and the `Validate application` check, and blocks deletion and non-fast-forward updates.
- [x] Confirm the native GitHub secret scanning alert state and push protection setting in the repository UI. Secret Protection and push protection are enabled; there are zero open secret-scanning alerts (verified 2026-10-03).
- [x] CI, Gitleaks scanning and dependency audits configured; post-merge main run `37147962904` passes.
- [x] Application lint, typecheck and production build pass.
- [x] Supabase development and staging projects are separate. The staging URL and publishable key are configured only in Vercel Preview; the endpoint returned HTTP 200. No service-role key was supplied or configured.
- [x] Vercel Preview configuration and rollback procedure documented in `docs/DEPLOYMENT.md`; a Ready Preview was validated on 2026-10-04. Automatic Git deployments remain disabled and the project is disconnected. A rollback exercise from a known-good version remains open.
- [ ] Required test harnesses, evidence and recovery expectations agreed and recorded.

## Blockers

1. Gitleaks scans pull requests and `main` in CI; GitHub Secret Protection and push protection are enabled, with zero open secret-scanning alerts (verified 2026-10-03).
2. Supabase development and staging are separate and the staging public values are configured in Vercel Preview. The Ready Preview is validated and documented, and Vercel Git remains disconnected. A rollback exercise from a known-good version is still required.
3. The private Sites version has not been packaged or published; the sandbox blocked passing its temporary source credential to the workflow over stdin.
4. Required approval, backup/restore and recovery evidence is not recorded.

## Remaining debt

Complete a rollback exercise from a known-good Preview, owner-private Sites packaging/publication, and approval/recovery evidence before marking this phase PASSED. Do not start Phase 1 until every acceptance criterion is satisfied. The Vercel Preview is online for testing; Supabase Auth/database integration remains unimplemented.
