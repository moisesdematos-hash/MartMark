# MartMark architecture

## Status

Foundation only. This describes the intended V1 boundary; it is not evidence that external services or financial operations are configured.

## Deployment shape

```text
GitHub (source, reviews, CI)
        ↓
Vercel (web app and server routes)
        ↓
Supabase (Auth, PostgreSQL, RLS, Storage, Functions)
        ↙                         ↘
ProxyPay (Angola payments)        Resend (transactional email)
```

PostgreSQL is the single source of truth. The browser may request an operation but may not authoritatively price an order, confirm a payment, approve KYC, assign privileged roles, or set a balance.

## Financial boundaries

- Persist an order before creating a payment attempt.
- Validate provider signatures, order, amount, currency and event status on the server.
- Process provider events idempotently and record them before applying their effects.
- Use an immutable double-entry ledger; every transaction must balance.
- Create entitlements only after verified payment; revoke them on a completed refund.
- Reserve withdrawal funds atomically and never display a payout as paid before provider or operator confirmation.
- Keep audit and outbox records with sensitive operations.

## Environments

Development, staging and production require separate credentials and data stores. Automated tests must never use the production database or live financial credentials. Provider sandbox verification is a prerequisite for the corresponding gate.

## Current limitations

Phase 0 inventory and implementation are still in progress. No database schema, RLS policies, auth flow, payment adapter, webhook endpoint, ledger, or payout flow is active. See [Phase 0 report](phases/PHASE_00.md).
