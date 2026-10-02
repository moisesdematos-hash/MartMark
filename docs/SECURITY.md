# Security baseline

## Current status

This is a Foundation-stage workspace. It has no user accounts, payment processing, KYC uploads, wallet or product entitlements. Its status values deliberately keep production readiness and financial operations disabled.

## Initial threat boundaries

- Treat every browser value as untrusted; financial decisions belong on the server.
- Keep provider and Supabase service-role secrets server-only.
- Apply deny-by-default RLS, least-privilege roles and per-action server authorization.
- Verify provider signatures and enforce idempotency before applying webhook side effects.
- Record sensitive changes in an append-only audit trail.
- Never mix development, staging and production databases or provider credentials.

## Current controls

- `.env.example` contains names only, with blank values.
- `.gitignore` excludes `.env*`, dependency trees, build output and local runtime state.
- GitHub Actions requests `contents: read` only and contains no deployment credentials.
- Dependency audit and Dependabot are configured as source files; neither has run on GitHub yet.
- A unit test guards the production-readiness and finance-disabled flags.

## Open controls

Configure GitHub secret scanning and push protection where available; protect the default branch; require CI before merge; review dependency audit findings; and create the security tests relevant to each later phase. No compliance certification or production security review is claimed.
