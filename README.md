# HarvestHub-Client

React + TypeScript + Tailwind v4 + RTK Query frontend for HarvestHub.
Scaffolded from the same framework/conventions as XaminityIQ-Client, adapted
to HarvestHub's own domain and roles.

## What's implemented

- **Auth flow** — login (phone or email), self-registration (Farmer/Buyer,
  with a role toggle), forgot/reset password, forced first-login password
  change, logout. All wired to the real HarvestHub-Server endpoints.
- **Route protection** — `withAuthGuard`/`withGuestGuard` HOCs (session state
  lives in `localStorage`, read synchronously by the guards) plus a
  `<RoleGuard>` component for per-route role gating.
- **4 role dashboards** — `admin`, `farmer`, `buyer`, `delivery-partner`, each
  with a `dashboard/` + `profile/` + `routes/<role>Routes.tsx` folder, matching
  the server's currently-built modules. `district-admin`/`inspector` aren't
  built yet (no backend module to call).
- **Design system** (`src/common/ui/`) — Button, Modal, Input, Select, Table,
  Chip, Accordion, DeleteConfirmModal, RowActions, CountdownTimer, Container,
  PageHeader — all consuming the Tailwind `@theme` tokens in `src/global.css`
  (HarvestHub's green brand palette, swap the values there for a different
  look).
- **State layer** — RTK Query over an axios base query with automatic
  access-token refresh (`src/state/services/`), following the
  `api/` (URL builders) → `state/services/endpoints/` (RTK Query hooks) →
  `types/` (request/response shapes) layering convention.

## What's intentionally NOT built yet

Everything past auth + a bare profile view — product listings, bidding,
orders, payments, inspections, notifications, etc. Build each as its own
`features/<role>/<feature>/` folder (pages/components/formik/routes as
needed), following the pattern already in `features/admin|farmer|buyer|
delivery-partner/`.

Not ported from XaminityIQ-Client: `AsyncSelect`/`Chart`/`Timeline` (tied to
extra dependencies or academic-domain specifics) and the `@/` path alias
(declared in `tsconfig.json` but unused — decide if you want it).

## Setup

```bash
npm install
cp .env.example .env   # set VITE_BACKEND_BASE_URL to your HarvestHub-Server URL
npm run dev
```
