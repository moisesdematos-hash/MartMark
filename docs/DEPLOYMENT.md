# Deployment plan

## Intended platform architecture

The requested V1 target is GitHub Actions → Vercel previews/staging/production → isolated Supabase environments. The Vercel project now exists, but its Git provider is not connected and no Vercel deployment has been created.

## Current preview

The Foundation interface is running as a local preview in Codex. Its source is registered to a private Sites workspace for packaging, but no version has been published. This preview does not establish the Vercel/Supabase deployment architecture for the commerce platform.

## Vercel preview setup

- Created the `martmark` Vercel project in the authenticated personal account and linked the local repository directory to it.
- The Vercel config selects the native Next.js framework and runs `npm run build:vercel` (`next build`); the Codex local preview continues to use Vinext and Cloudflare.
- Automatic Git deployments from `main` are disabled in `vercel.json` until the Phase 0 release gate is passed. Other branches remain eligible for previews after the Git provider is connected.
- The GitHub repository is not connected to the Vercel project yet. Connect it only after this configuration is merged so the current `main` branch cannot trigger a production deployment.

## Release policy

- Never test a live payment, refund or withdrawal in production.
- Require green CI, staging validation, backup/restore and reconciliation evidence before production.
- Keep development, staging and production credentials and databases isolated.
- Record rollback and recovery steps before enabling financial operations.

## Blocker

The local source packaging workflow was blocked when the environment rejected the required private repository credential handoff. The Vercel project also needs its GitHub connection, a passing Vercel build, and isolated Supabase staging before preview validation. No deployment URL is available.
