# Deployment plan

## Intended platform architecture

The V1 target is GitHub Actions → Vercel previews/staging/production → isolated Supabase environments. Vercel Git integration remains disconnected because branch-based automatic deployments previously produced deployments marked Production. Automatic Git deployments are disabled in `vercel.json` until the Phase 0 gate passes.

## Current preview

The MartMark Foundation workspace is available as a protected Vercel Preview:
[https://martmark-nq040q893-moisesdematos-hashs-projects.vercel.app](https://martmark-nq040q893-moisesdematos-hashs-projects.vercel.app)

On 2026-10-04, the deployment reached Ready with `target: preview`; `vercel inspect` confirmed that target, and `vercel curl /` returned the application HTML successfully. Vercel Deployment Protection is enabled, so opening the URL may require an authorized account. The preview displays the Phase 0 foundation workspace; it does not implement Supabase authentication, database access or commerce operations.

## Vercel preview setup

- The `martmark` project uses the native Next.js framework and `npm run build:vercel` (`next build`). The local Codex preview continues to use Vinext and Cloudflare.
- A separate Supabase staging project is configured with `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` in Vercel's Preview environment only. The Auth health endpoint returned HTTP 200. These public values do not activate a database integration; no service-role key is configured.
- Automatic Git deployments remain disabled and the Vercel project is disconnected from GitHub.
- The first successful deployment on an empty Vercel project was automatically assigned to Production and received the project alias. It was removed immediately after verification. A subsequent deployment was confirmed as Preview; no Production deployment currently exists.
- Future CLI deployments must omit `--prod`. Confirm every new deployment with `vercel inspect <deployment-url>` and require `target: preview` before sharing it.
- The Preview build completed successfully on Vercel and served the application page. Its immutable deployment URL is the current test target.

## Rollback and recovery

Preview rollback has a documented procedure but has not been exercised against a previous known-good Preview:

1. Keep the immutable URL of the last known-good Preview.
2. If a new Preview fails, inspect it and remove only that failed Preview with `vercel rm <deployment-url> --yes`.
3. Redeploy the last known-good source revision with `vercel deploy` (never `--prod`), then verify its build, HTTP response and `target: preview`.
4. Do not connect GitHub or promote a Preview to Production until the Phase 0 release gate and production safeguards are approved.

The accidental Production deployment was removed, and the deployments list confirmed that only the Ready Preview remained. This does not count as a tested restore from a prior known-good application version.

## Release policy

- Never test a live payment, refund or withdrawal in production.
- Require green CI, staging validation, backup/restore and reconciliation evidence before production.
- Keep development, staging and production credentials and databases isolated.
- Record rollback and recovery steps before enabling financial operations.

## Remaining blockers

The Vercel Preview is available, but the Phase 0 gate remains open. Owner-private Sites packaging/publication, a rollback exercise from a known-good version, and approval/recovery evidence are still outstanding. The Supabase staging project is separate and reachable, but the app has no active auth or database integration.
