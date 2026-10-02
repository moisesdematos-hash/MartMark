# Initial RLS planning matrix

This is an inventory aid, not an applied policy set. Deny-by-default remains the target until each table and access path is implemented and tested. No database tables exist in this Phase 0 delivery.

| Data area | Anonymous | Buyer | Creator | Support | Compliance | Finance | Admin |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Public published products | Read published fields | Read | Read | Read | Read | Read | Read |
| Own profile | None | Read/update own safe fields | Read/update own safe fields | Read where assigned | Read where assigned | Read where needed | Read with audit |
| Draft products | None | None | Own rows only | Read for assigned support | Read for review | None | Read with audit |
| Orders and entitlements | None | Own rows only | Own product summaries only | Read assigned cases | Read where needed | Read for reconciliation | Read with audit |
| Payment attempts and provider events | None | Own order status only | No provider payload | Read redacted assigned case | Read for review | Read and reconcile | Read with audit |
| Ledger and withdrawals | None | No access | Own summarized balances; server-mediated request only | None | Read risk context | Read and execute approved actions | Read with audit |
| KYC cases | None | Submit own case; no approval rights | Same as buyer | No document access by default | Assigned cases only | Status needed for payout | Read with explicit audit |
| Audit logs and settings | None | None | None | Scoped audit read | Scoped audit read | Scoped audit read | Privileged, audited access |

Before Phase 1+: define table-by-table `SELECT`, `INSERT`, `UPDATE`, and `DELETE` policies for each role, verify service-role isolation, and include negative authorization tests. This draft does not authorize any access.
