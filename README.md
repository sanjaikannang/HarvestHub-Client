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
- **5 role dashboards** — `admin`, `farmer`, `buyer`, `delivery-partner`,
  `inspector`, each with a `dashboard/` + `profile/` + `routes/<role>Routes.tsx`
  folder. `district-admin` is still the one role with no client area at all —
  the server supports it, but there's no layout/dashboard/routes to host it
  yet (a bigger, District-Management-scale piece of work, not specific to any
  one feature module).
- **Catalog Management (03)** — Super Admin category CRUD
  (`features/admin/catalog/categories/`, with a dynamic-subcategory-rows form
  modal); Farmer product submission/edit (`features/farmer/products/`, full
  form with cascading category→subcategory selects, date/time pickers, and a
  URL-paste stand-in for image upload since no signed-upload endpoint is
  wired yet); Super Admin product review queue
  (`features/admin/catalog/products/`, start-review/request-changes/reject +
  a read-only detail modal).
- **Inspection Management (04)** — "Schedule Inspection" action on the product
  review queue (inspector picker scoped to the product's district); Inspector
  portal (`features/inspector/`) with an assigned-visits list and a
  findings-recording modal (verified quantity/grade/notes/photos +
  recommendation); Super Admin inspections queue
  (`features/admin/inspections/`) with a decide modal (approve — picks a
  receiving Collection Center — reject, or request changes).
- **Design system** (`src/common/ui/`) — Button, Modal, Input (incl. `date`/
  `time` types), Select, Table, Chip, Accordion, DeleteConfirmModal,
  RowActions, CountdownTimer, Container, PageHeader, ImageUrlListField — all
  consuming the Tailwind `@theme` tokens in `src/global.css` (HarvestHub's
  green brand palette, swap the values there for a different look).
- **State layer** — RTK Query over an axios base query with automatic
  access-token refresh (`src/state/services/`), following the
  `api/` (URL builders) → `state/services/endpoints/` (RTK Query hooks) →
  `types/` (request/response shapes) layering convention.

## What's intentionally NOT built yet

A District Admin portal (layout/dashboard/routes) — everything District Admin
can do server-side (district/collection-center CRUD, product review,
scheduling/deciding inspections) currently has to go through the Super Admin
UI instead. Beyond that: bidding, orders, payments, notifications, disputes,
admin reporting, localization. Build each as its own
`features/<role>/<feature>/` folder (pages/components/formik/routes as
needed), following the pattern already established.

Not ported from XaminityIQ-Client: `AsyncSelect`/`Chart`/`Timeline` (tied to
extra dependencies or academic-domain specifics) and the `@/` path alias
(declared in `tsconfig.json` but unused — decide if you want it).

## Setup

```bash
npm install
cp .env.example .env   # set VITE_BACKEND_BASE_URL to your HarvestHub-Server URL
npm run dev
```
