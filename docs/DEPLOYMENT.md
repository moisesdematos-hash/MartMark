# Deployment plan

## Intended platform architecture

The requested V1 target is GitHub Actions → Vercel previews/staging/production → isolated Supabase environments. The `martmark` Vercel project was briefly connected to the `moisesdematos-hash/MartMark` GitHub repository. GitHub Dependabot branches unexpectedly produced deployments marked as Production, so the Git connection was removed and all six deployments created during the connection were deleted. No deployment is currently available; the Phase 0 gate is still open.

## Current preview

The Foundation interface is running as a local preview in Codex. Its source is registered to a private Sites workspace for packaging, but no version has been published. This preview does not establish the Vercel/Supabase deployment architecture for the commerce platform.

## Vercel preview setup

- Created the `martmark` Vercel project in the authenticated personal account and linked the local repository directory to it.
- The Vercel config selects the native Next.js framework and runs `npm run build:vercel` (`next build`); the Codex local preview continues to use Vinext and Cloudflare.
- A separate Supabase staging project is configured with `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` in Vercel's Preview environment only. Its Auth health endpoint returned HTTP 200. Production has no Supabase values.
- Automatic Git deployments are disabled in `vercel.json` until the Phase 0 release gate is passed. The Vercel project is currently disconnected from GitHub.
- PR #12's Linux CI passed the native Next.js build and was merged at `1ecef20`. The six deployments created during the Git connection attempt were removed, including deployments marked as Production. No manual deployment was started.

## Release policy

- Never test a live payment, refund or withdrawal in production.
- Require green CI, staging validation, backup/restore and reconciliation evidence before production.
- Keep development, staging and production credentials and databases isolated.
- Record rollback and recovery steps before enabling financial operations.

## Blocker

The local source packaging workflow was blocked when the environment rejected the required private repository credential handoff. The Supabase staging endpoint is reachable and separate from development. A Vercel preview/staging deployment, rollback validation and a deployment URL are still unavailable. Reconnect Git only after preview and production branch behavior is verified.
