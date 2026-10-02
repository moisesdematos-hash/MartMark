# Environment variable plan

No credentials are configured in this checkout. Values must be isolated across development, staging and production. Store secrets in the hosting environment, not in source control or browser bundles.

## Public browser values

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Only use public Supabase values in browser code, and only after authentication/RLS is implemented.

## Server-only values

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `PROXYPAY_TOKEN`
- `PROXYPAY_ENTITY`
- `PROXYPAY_WEBHOOK_SECRET`
- `PROXYPAY_API_URL`
- `RESEND_API_KEY`
- `GROQ_API_KEY`
- `GROQ_MODEL`

Keep service-role, payment, email and AI credentials out of all `NEXT_PUBLIC_*` variables. The blank `.env.example` is a name reference only.

## Current status

No `.env.local`, preview secrets or production secrets exist in this initial foundation setup. Payment, email, database and AI integrations are not active.
