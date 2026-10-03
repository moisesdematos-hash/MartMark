# Deployment plan

## Intended platform architecture

The requested V1 target is GitHub Actions → Vercel previews/staging/production → isolated Supabase environments. The `martmark` Vercel project is connected to the `moisesdematos-hash/MartMark` GitHub repository. No Vercel deployment has been created yet; the Phase 0 gate is still open.

## Current preview

The Foundation interface is running as a local preview in Codex. Its source is registered to a private Sites workspace for packaging, but no version has been published. This preview does not establish the Vercel/Supabase deployment architecture for the commerce platform.

## Vercel preview setup

- Created the `martmark` Vercel project in the authenticated personal account and linked the local repository directory to it.
- The Vercel config selects the native Next.js framework and runs `npm run build:vercel` (`next build`); the Codex local preview continues to use Vinext and Cloudflare.
- Automatic Git deployments from `main` are disabled in `vercel.json` until the Phase 0 release gate is passed. The repository is connected, so other branches are eligible for previews.
- PR #12's Linux CI passed the native Next.js build and was merged at `1ecef20`. The Vercel project currently has no deployments. No manual deployment was started.

## Release policy

- Never test a live payment, refund or withdrawal in production.
- Require green CI, staging validation, backup/restore and reconciliation evidence before production.
- Keep development, staging and production credentials and databases isolated.
- Record rollback and recovery steps before enabling financial operations.

## Blocker

The local source packaging workflow was blocked when the environment rejected the required private repository credential handoff. Isolated Supabase staging, a Vercel preview/staging deployment, rollback validation and a deployment URL are still unavailable.
