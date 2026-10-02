# Deployment plan

## Intended platform architecture

The requested V1 target is GitHub Actions → Vercel previews/staging/production → isolated Supabase environments. This wiring is not active in this Foundation workspace.

## Current preview

The Foundation interface is running as a local preview in Codex. Its source is registered to a private Sites workspace for packaging, but no version has been published. This preview does not establish the Vercel/Supabase deployment architecture for the commerce platform.

## Release policy

- Never test a live payment, refund or withdrawal in production.
- Require green CI, staging validation, backup/restore and reconciliation evidence before production.
- Keep development, staging and production credentials and databases isolated.
- Record rollback and recovery steps before enabling financial operations.

## Blocker

The local source packaging workflow was blocked when the environment rejected the required private repository credential handoff. The source remains in the workspace and no deployment URL is available.
