# Environment variable plan

Values must be isolated across development, staging and production. Store secrets in the hosting environment, not in source control or browser bundles.

## Public browser values

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

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

The development Supabase URL and publishable key remain in the ignored `.env.local` file. A separate staging project's URL and publishable key are configured only in the Vercel Preview environment. The staging endpoint responds successfully, but the application does not consume these values yet; no database schema, Auth/RLS, or server-side credentials are configured. Payment, email, database and AI integrations remain inactive until their implementation and phase gates are complete.
