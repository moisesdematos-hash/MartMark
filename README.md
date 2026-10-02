# MartMark

MartMark is a staged digital commerce platform for creators, buyers, affiliates and partners. This first delivery is the Foundation workspace: it makes the Phase 0 architecture and gates visible. It does not accept orders, move money, approve identity checks or grant product access.

## Development

- Node.js 22.13 or newer
- `npm run dev` starts the local workspace
- `npm run lint` checks source formatting and common errors
- `npm run build` creates the Sites deployment artifact
- `npm test` checks the foundation readiness gates
- `npm run test:integration` verifies the built Worker entrypoint (run after build)

## Current phase

`PHASE_00_STATUS=IN_PROGRESS`

The initial architecture and environment inventory are documented in [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) and [docs/phases/PHASE_00.md](docs/phases/PHASE_00.md). Authentication, persistence, payment providers, and financial operations remain blocked until their phase gates are implemented and evidenced.

## Security boundary

Do not put secrets in browser variables or commit credentials. Configure server secrets through the hosting environment. PostgreSQL will be the financial system of record; browser state is never a wallet, payment confirmation, KYC decision, or authorization source.
