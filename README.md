# Admin Backend Integration Audit

## 1. Overview

This document compares the **existing React Admin UI** requirements with the live backend API.

**Backend base URL:** `https://srv1962742.hstgr.cloud/api/v1`

**Source of truth:** The existing Admin UI under `src/admin/` (pages, tables, forms, actions, charts). The UI must not be redesigned or simplified to hide backend gaps.

**Audit method:**

- Inspected Admin UI components and implied CRUD / search / filter / pagination contracts.
- Cross-checked against `iBook Rides.postman_collection.json` (Admin + Auth folders).
- Verified live responses against `https://srv1962742.hstgr.cloud/api/v1` using authenticated Bearer tokens from `POST /auth/login`.

**Legend (statuses used in this report):**

| Status | Meaning |
| --- | --- |
| AVAILABLE | Endpoint/capability exists and was verified live |
| PARTIALLY AVAILABLE | Endpoint exists but does not fully satisfy the UI requirement |
| MISSING | No verified endpoint / field / capability for the UI need |
| BROKEN | Endpoint exists or is attempted but returns incorrect/error behavior |
| INCONSISTENT | Works in some form but naming/shape differs from UI or sibling endpoints |
| UNKNOWN | Could not be verified without unsafe mutation or incomplete docs |

---

## 2. Audit Scope

### Admin pages / components inspected

| Area | UI location |
| --- | --- |
| Shell / routing | `src/admin/components/AdminDashboard/AdminDashboard.jsx` |
| Sidebar + logout | `src/admin/components/AdminDashboard/AdminSidebar.jsx` |
| Overview (stats, charts, quick actions) | `AdminDashboard.jsx` → `AdminOverviewPage` |
| Users | `src/admin/components/AdminUsers/AdminUsers.jsx` |
| Packages | `src/admin/components/AdminPackages/AdminPackages.jsx` |
| Transactions | `src/admin/components/AdminTransactions/AdminTransactions.jsx` |
| Settings | `src/admin/components/AdminSettings/AdminSettings.jsx` |
| API layer (reference only) | `src/admin/api/*`, `src/admin/types/*` |
| Auth storage / login | `src/auth/authStorage.js`, `src/company/components/Login/Login.jsx` |

### Backend endpoints inspected (Postman + live)

**Auth**

- `POST /auth/login`
- `POST /auth/register`
- `DELETE /auth/logout`
- `DELETE /auth/logout-others`
- `GET /auth/user`

**Admin**

- `GET /admin/dashboard`
- `GET|POST /admin/users`, `GET|PATCH|DELETE /admin/users/:id`
- `GET|POST /admin/packages`, `GET|PATCH|DELETE /admin/packages/:id`
- `GET /admin/transactions`, `GET /admin/transactions/:id`
- `GET|POST /admin/settings`, `GET|PATCH|DELETE /admin/settings/:key`

**Negative probes (expected missing)**

- `GET /admin/export` → 404
- `POST /admin/reports/export` → 404
- `POST /admin/transactions/:id/receipt` → 404

### Checked

- CRUD completeness per Admin entity
- Search / filter / pagination
- Response envelopes (`status`, `message`, `data`, `meta`)
- Data contracts vs UI fields
- Auth (401 without token)
- Verified error codes (401, 404, 422, 500)

---

## 3. API Coverage Matrix

| Admin Feature | UI Location | Backend Endpoint | Method | Status |
| --- | --- | --- | --- | --- |
| Overview stats (users / revenue / subscriptions) | `AdminDashboard.jsx` Overview | `/admin/dashboard` | GET | AVAILABLE |
| Subscription Growth chart points | Overview chart | `/admin/dashboard` | GET | AVAILABLE |
| Revenue Breakdown by package | Overview pie | `/admin/dashboard` | GET | AVAILABLE |
| Growth period tabs `1M` / `3M` / `6M` / `12M` | Overview period buttons | `/admin/dashboard?range=` / `?period=` | GET | PARTIALLY AVAILABLE (ignored; always `range=1M`) |
| Quick Action: Add New Plan | Overview | navigation only | — | AVAILABLE (UI navigation; create form still incomplete on Packages) |
| Quick Action: View Transactions | Overview | navigation only | — | AVAILABLE |
| Quick Action: Export Report | Overview | none verified | — | MISSING |
| Users list | `AdminUsers.jsx` | `/admin/users` | GET | AVAILABLE |
| Users search | Users search input | `/admin/users?search=` | GET | AVAILABLE |
| Users filter by plan | Users “Filter by” | `/admin/users?package=` | GET | PARTIALLY AVAILABLE (see Trail/Plus mismatch) |
| Users pagination metadata | Users table pagination UI | `/admin/users` → `meta` | GET | AVAILABLE (frontend currently paginates a fetched page locally) |
| Add Subscriber | Users modal | `/admin/users` | POST | PARTIALLY AVAILABLE (narrow payload vs rich UI form) |
| Edit user | Users edit button | `/admin/users/:id` | PATCH | AVAILABLE (endpoint exists; **UI has no edit form**) |
| Delete user | Users delete button | `/admin/users/:id` | DELETE | AVAILABLE |
| Users column `last payment` | Users table | — | — | MISSING |
| Packages list + search | `AdminPackages.jsx` | `/admin/packages?search=&limit=` | GET | AVAILABLE |
| Packages filter by plan name | Packages filter select | client-side on list | — | AVAILABLE (frontend-side) |
| Packages pagination | Packages pagination UI | `/admin/packages` `meta` + frontend slice | GET | AVAILABLE |
| Add New Plan | Packages toolbar button | `/admin/packages` | POST | AVAILABLE (endpoint exists; **UI has no create form**) |
| Edit package | Packages edit button | `/admin/packages/:id` | PATCH | AVAILABLE (endpoint exists; **UI has no edit form**) |
| Delete package | Packages delete button | `/admin/packages/:id` | DELETE | AVAILABLE |
| Transactions list | `AdminTransactions.jsx` | `/admin/transactions` | GET | AVAILABLE |
| Transactions date filters | From/To date inputs | `from_date`, `to_date` | GET | AVAILABLE |
| Transactions `payment_status` filter | (not direct UI control; tabs derived) | `payment_status` | GET | AVAILABLE |
| Transactions with user/package | table columns | `with_user`, `with_package` | GET | AVAILABLE |
| Today / Past / Paid tabs | Transactions tabs | derived client-side | — | PARTIALLY AVAILABLE (no dedicated tab endpoint) |
| Account status filter (Active/Inactive) | Transactions status select | client-side on nested `user.status` | — | AVAILABLE (frontend-side) |
| Transactions pagination | Transactions pagination UI | `meta` + frontend slice | GET | AVAILABLE |
| Download Report | Transactions download button | none verified | — | MISSING |
| Send Recipet | Transactions row action | none verified | — | MISSING |
| Process Payment | Transactions row action | none verified | — | MISSING |
| Transaction details | (no dedicated Admin detail page) | `/admin/transactions/:id` | GET | AVAILABLE (endpoint exists; unused by UI) |
| Settings list + search | `AdminSettings.jsx` | `/admin/settings?search=` | GET | AVAILABLE |
| Create setting | Settings modal | `/admin/settings` | POST | AVAILABLE |
| Update setting | Settings edit modal | `/admin/settings/:key` | PATCH | AVAILABLE |
| Delete setting | Settings delete button | `/admin/settings/:key` | DELETE | AVAILABLE |
| Logout | Admin sidebar | `/auth/logout` | DELETE | AVAILABLE |
| Login (email + password) | Login page | `/auth/login` | POST | AVAILABLE |

---

## 4. CRUD Coverage

Verified against Postman + live API (not against presence of UI forms).

| Entity | List | Details | Create | Update | Delete |
| --- | --- | --- | --- | --- | --- |
| Users | AVAILABLE `GET /admin/users` | AVAILABLE `GET /admin/users/:id` | AVAILABLE `POST /admin/users` | AVAILABLE `PATCH /admin/users/:id` (also accepts `PUT` live) | AVAILABLE `DELETE /admin/users/:id` |
| Packages | AVAILABLE `GET /admin/packages` | AVAILABLE `GET /admin/packages/:id` | AVAILABLE `POST /admin/packages` | AVAILABLE `PATCH /admin/packages/:id` | AVAILABLE `DELETE /admin/packages/:id` |
| Transactions | AVAILABLE `GET /admin/transactions` | AVAILABLE `GET /admin/transactions/:id` | MISSING (Postman has no create; live `POST` returned **500**) | MISSING (Postman has no update; live `PATCH` returned **500**) | MISSING (Postman has no delete; live `DELETE` returned **500**) |
| Settings | AVAILABLE `GET /admin/settings` | AVAILABLE `GET /admin/settings/:key` | AVAILABLE `POST /admin/settings` | AVAILABLE `PATCH /admin/settings/:key` | AVAILABLE `DELETE /admin/settings/:key` |
| Dashboard | AVAILABLE `GET /admin/dashboard` | N/A | N/A | N/A | N/A |
| Reports / Export | MISSING | MISSING | MISSING | MISSING | MISSING |

**Note:** For Users/Packages update & create, backend methods exist, but Admin UI currently lacks edit/create forms for Packages and lacks an edit form for Users. That is a **UI form gap**, not a missing backend method — still called out because the Admin UX implies those actions.

---

## 5. Missing Backend Features

### Missing Backend Feature

**Admin Feature:** Export Report (Overview quick action)

**UI Location:** `src/admin/components/AdminDashboard/AdminDashboard.jsx` (`data-testid="quick-export"`)

**What the UI requires:** Download / export analytics report.

**Expected backend capability:** Authenticated export endpoint (e.g. report download URL or file stream).

**Current backend status:** MISSING  
Verified: `GET /admin/export` → 404, `POST /admin/reports/export` → 404. Not present in Postman Admin folder.

**Impact:** Export quick action cannot complete.

**Severity:** HIGH

---

### Missing Backend Feature

**Admin Feature:** Dashboard growth period filter (`1M` / `3M` / `6M` / `12M`)

**UI Location:** `AdminDashboard.jsx` period tabs (`data-testid="period-1M"` … `period-12M`)

**What the UI requires:** Chart series for the selected growth window.

**Expected backend capability:** Query parameter honored by `GET /admin/dashboard` (e.g. `range` or `period`) returning matching `subscriptionGrowth.points` and `subscriptionGrowth.range`.

**Current backend status:** PARTIALLY AVAILABLE / effectively MISSING for non-`1M`  
Verified live: `?range=3M`, `?range=12M`, `?period=12M` still return `"subscriptionGrowth":{"range":"1M",...}`.

**Impact:** Period tabs do not change chart data.

**Severity:** HIGH

---

### Missing Backend Feature

**Admin Feature:** Users table column **last payment**

**UI Location:** `AdminUsers.jsx` column `last payment`

**What the UI requires:** Last payment date/amount (or equivalent) per user row.

**Expected backend capability:** Field on `GET /admin/users` (and/or user detail), e.g. `last_payment` / `last_payment_at`.

**Current backend status:** MISSING  
Verified user payload fields include `id`, `name`, `email`, `status`, `role`, contact/address fields, `package_name`, `package`, `created_at` — **no last payment field**.

**Impact:** Column cannot show real payment history; UI must show backend-missing state.

**Severity:** HIGH

**Plain-language write-up:** see `docs/admin-users-backend-gaps.md`

---

### Missing Backend Feature

**Admin Feature:** Add Subscriber rich company profile fields

**UI Location:** `AdminUsers.jsx` Add Subscriber modal fields: Company Name, Site Url, City, State, Phone Number, Email Address, Country, Zip Code, Contact Person Name, Login Email, Password, Notes, file upload

**What the UI requires:** Persist all modal fields when creating a subscriber.

**Expected backend capability:** `POST /admin/users` (or dedicated company endpoint) accepting those fields (and optional upload).

**Current backend status:** PARTIALLY AVAILABLE  
Postman/live create contract accepts only:

```json
{
  "name": "...",
  "email": "...",
  "password": "...",
  "password_confirmation": "...",
  "role": "company",
  "plan_id": 4
}
```

User resource **does** store `site_url`, `city`, `state`, `country`, `zip_code`, `contact_phone`, `notes` on GET, but create body from Postman does not document mapping from the Admin modal field names, and posting UI-shaped payloads (`companyName`, `siteUrl`, …) returned **422**.

**Impact:** Most Add Subscriber form fields cannot be persisted as drawn in the UI.

**Severity:** CRITICAL

**Plain-language write-up:** see `docs/admin-users-backend-gaps.md`

---

### Missing Backend Feature

**Admin Feature:** Transactions Download Report

**UI Location:** `AdminTransactions.jsx` (`data-testid="transactions-download-btn"`)

**What the UI requires:** Download transactions report (CSV/PDF/etc.).

**Expected backend capability:** Export endpoint for transactions.

**Current backend status:** MISSING (not in Postman; no verified path).

**Impact:** Download Report button cannot work.

**Severity:** HIGH

---

### Missing Backend Feature

**Admin Feature:** Send Recipet

**UI Location:** `AdminTransactions.jsx` row action for Today tab (`Send Recipet`)

**What the UI requires:** Trigger receipt email/action for a transaction.

**Expected backend capability:** Mutation endpoint (e.g. send receipt for `transaction_id`).

**Current backend status:** MISSING  
Verified: `POST /admin/transactions/4/receipt` → 404. Not in Postman.

**Impact:** Receipt action cannot execute.

**Severity:** HIGH

---

### Missing Backend Feature

**Admin Feature:** Process Payment

**UI Location:** `AdminTransactions.jsx` row action for Past/Paid tabs

**What the UI requires:** Process / complete payment for a transaction.

**Expected backend capability:** Mutation endpoint updating payment status / charging.

**Current backend status:** MISSING (no Postman mutation; live POST/PATCH/DELETE on `/admin/transactions` returned **500**).

**Impact:** Process Payment cannot execute.

**Severity:** CRITICAL

---

### Missing Backend Feature

**Admin Feature:** Transactions CRUD beyond read

**UI Location:** implied by payment/receipt actions and operational Admin workflows

**What the UI requires:** At minimum payment-status mutations; ideally documented update endpoints.

**Expected backend capability:** Documented non-500 create/update/delete or dedicated action routes.

**Current backend status:** MISSING / BROKEN for mutations  
List/detail AVAILABLE; mutations not documented and return 500 when attempted.

**Impact:** Transaction operational actions cannot be integrated safely.

**Severity:** CRITICAL

---

### Missing Backend Feature

**Admin Feature:** Plan named **Plus** in Users/Packages filters

**UI Location:** Users filter option `Plus`; Packages filter option `Plus`

**What the UI requires:** Filter results for a Plus plan.

**Expected backend capability:** Package entity named `plus` (or documented alias) and filter support.

**Current backend status:** MISSING  
Live packages are only: `trial`, `basic`, `premium`, `enterprise`.  
`GET /admin/users?package=plus` → empty (`total: 0`).

**Impact:** Plus filter never returns data.

**Severity:** MEDIUM

---

## 6. Backend Errors

| Endpoint | Method | Error/status | Actual behavior | Expected behavior | Affected UI feature | Severity |
| --- | --- | --- | --- | --- | --- | --- |
| `/admin/users` (no token) | GET | **401** | Unauthorized | Require Bearer auth | All Admin data fetches | LOW (expected) |
| `/auth/login` invalid body | POST | **422** | Validation failure | Reject invalid credentials/payload | Login | LOW (expected) |
| `/admin/users` invalid/incomplete create body | POST | **422** | Validation failure | Reject bad payload | Add Subscriber | MEDIUM (expected validation; blocks UI-shaped body) |
| `/admin/export` | GET | **404** | Resource not found | Export endpoint if UI feature is required | Overview Export Report | HIGH |
| `/admin/reports/export` | POST | **404** | Resource not found | Export endpoint | Overview Export Report | HIGH |
| `/admin/transactions/:id/receipt` | POST | **404** | Resource not found | Receipt action endpoint | Send Recipet | HIGH |
| `/admin/transactions` | POST | **500** | Server error | 404/405 if unsupported, or success if supported | Process Payment / create | CRITICAL |
| `/admin/transactions/:id` | PATCH | **500** | Server error | 404/405 if unsupported, or success if supported | Process Payment / update | CRITICAL |
| `/admin/transactions/:id` | DELETE | **500** | Server error | 404/405 if unsupported | Transaction delete | HIGH |
| `/admin/dashboard?range=3M` / `?period=12M` | GET | **200 but wrong semantics** | Always `subscriptionGrowth.range = "1M"` | Respect requested range | Period tabs | HIGH |

No CORS failure was observed during live probing from this environment (Admin endpoints responded when called with proper headers). Mark broader CORS as **UNKNOWN / NEEDS VERIFICATION** from browser origin if issues appear in production hosting.

---

## 7. Data Contract Mismatches

### 7.1 Users

| UI expected | Backend actual | Type / notes | Affected component | Severity |
| --- | --- | --- | --- | --- |
| User Information name | `name` | string — OK | `AdminUsers.jsx` | — |
| Contact email | `email` (also nullable `contact_email`) | string — OK | `AdminUsers.jsx` | LOW |
| Contact phone | `contact_phone` (often `null`) | string\|null | `AdminUsers.jsx` | MEDIUM (field exists but frequently empty) |
| Plan Name | `package_name` / nested `package.name` | string\|null | `AdminUsers.jsx` | LOW (mappable) |
| Status | `status` (`active`, …) | lowercase string; UI displays capitalized | `AdminUsers.jsx` | LOW |
| last payment | *(none)* | — | `AdminUsers.jsx` | HIGH |
| Create: companyName, siteUrl, city, state, phoneNumber, country, zipCode, notes, upload | Create body: `name`, `email`, `password`, `password_confirmation`, `role`, `plan_id` | request payload mismatch | Add Subscriber modal | CRITICAL |
| Filter label `Trail` | package name `trial` | enum/alias mismatch (`package=trail` → empty; `package=trial` works) | Users filter | HIGH |
| Filter option `Plus` | no `plus` package | missing enum value | Users filter | MEDIUM |

Plain-language Users gaps: `docs/admin-users-backend-gaps.md`


### 7.2 Packages

| UI expected | Backend actual | Notes | Severity |
| --- | --- | --- | --- |
| Plan Name display “Trail” | `name: "trial"` | UI renames for display; filter must use `trial` | MEDIUM |
| Price | `price` as string `"9.99"` | numeric string | LOW |
| Duration | `duration_days` | number | LOW |
| Users count | `users_count` | number — OK | — |
| Feature checklist labels | boolean feature flags under `features` | keys snake_case | LOW (mappable) |
| Create/Update form fields in UI | Postman: `name`, `description`, `price`, `duration_days` | UI has no modal yet; contract exists | MEDIUM (UI incomplete) |

### 7.3 Transactions

| UI expected | Backend actual | Notes | Severity |
| --- | --- | --- | --- |
| COMPANY INFO | nested `user.name` / `user.email` (needs `with_user=1`) | OK when include flag used | — |
| SITE URL | `user.site_url` (often null) | field exists, usually empty | MEDIUM |
| ADDRESS | composed from `user.city/state/country/zip_code` (often null) | no single `address` field | MEDIUM |
| PACKAGE | nested `package.name` (needs `with_package=1`) | OK | — |
| PRICE | `amount` string | OK | — |
| DUE DATE | `due_date` | OK | — |
| PAYMENT STATUS column (button actions) | `payment_status` (`pending`/`completed`) exists as data, but **no action endpoints** | data vs action gap | CRITICAL |
| ACCOUNT STATUS | `user.status` | OK when user included | — |
| EMAIL HISTORY | `email_history` string | OK | — |
| Tabs Today/Past/Paid | not returned as tab field | must derive from `due_date` + `payment_status` | MEDIUM |

### 7.4 Settings

| UI expected | Backend actual | Notes | Severity |
| --- | --- | --- | --- |
| LABEL / GROUP / KEY / VALUE | `label`, `group`, `key`, `value` | OK | — |
| Modal fields `payment_gate`, `mode`, `currency_code`, `key` (API key) | Live merchant value uses `provider`, `mode`, `api_key`, `currency_code` | **INCONSISTENT** with Postman sample (`payment_gate`, `key`) | HIGH |
| Setting identity for update/delete | path uses `key` (string), list also has numeric `id` | UI uses `key` as id — matches Postman | LOW |

### 7.5 Dashboard

| UI expected | Backend actual | Notes | Severity |
| --- | --- | --- | --- |
| Total Users / Active / Inactive / Trial | `total_users`, `active_users`, `inactive_users`, `trial_users` | OK | — |
| Total Revenue / This Month / Last Month / Growth | `total_revenue`, `this_month_revenue`, `last_month_revenue`, `revenueGrowthPercent` | OK | — |
| Subscriptions by Plan counts | `subscriptionsByPlan.basicPlanCount` etc. | OK; no Trial count in that object | LOW |
| Chart series | `subscriptionGrowth.points[{label,value}]` | OK for default range | — |
| Period selection | `subscriptionGrowth.range` always `"1M"` | mismatch with UI tabs | HIGH |
| Revenue breakdown | `revenue_by_package[{package_name, revenue}]` | snake_case list — mappable | LOW |

### 7.6 Envelope consistency

Most Admin list endpoints return:

```json
{ "status": "success", "message": "...", "data": [ ... ], "meta": { "currentPage", "perPage", "total", "totalPages" } }
```

Detail endpoints return `data` as object.  
Timestamps mix formats (`"2026-09-13 05:58:12"` vs ISO `"2026-09-13T05:58:12.000000Z"` on nested package). **INCONSISTENT** (LOW–MEDIUM).

---

## 8. Search & Filtering

| Admin page | UI control | Backend support | Classification |
| --- | --- | --- | --- |
| Users | Search input | `GET /admin/users?search=` verified | Backend supported |
| Users | Filter by Plan | `GET /admin/users?package=` verified | Backend supported, but **Trail/Plus values inconsistent/missing** |
| Users | role filter | Postman documents `role`; UI does not expose role filter | Available unused |
| Packages | Search | `GET /admin/packages?search=` verified | Backend supported |
| Packages | Filter by plan name | No dedicated filter param beyond search; frontend filters list | Frontend-side filtering can be used |
| Transactions | From/To date | `from_date`, `to_date` verified | Backend supported |
| Transactions | Status Active/Inactive | No account-status query param verified; uses nested user status | Frontend-side filtering can be used |
| Transactions | Today/Past/Paid tabs | No tab query; derive client-side | Frontend-side filtering can be used |
| Transactions | payment_status | Query exists (`pending` verified) but UI uses tabs instead of direct control | Backend supported (unused directly) |
| Settings | Search | `GET /admin/settings?search=` verified | Backend supported |
| Overview | Period tabs | Query ignored | Broken / Missing effective support |

---

## 9. Pagination

| Admin page | UI pagination | Backend metadata | Notes |
| --- | --- | --- | --- |
| Users | Previous / page numbers / Next (5 per page in UI) | `meta.currentPage`, `perPage`, `total`, `totalPages` on `GET /admin/users` | Backend pagination AVAILABLE; UI currently slices a fetched subset locally (limit/page not fully wired to UI controls) |
| Packages | Previous / pages / Next | `meta` AVAILABLE (`page`+`limit` verified) | UI also does client-side page slice |
| Transactions | Previous / pages / Next | `meta` AVAILABLE | UI client-side page slice of returned set |
| Settings | No pagination UI | `meta` returned | Backend has meta; UI shows full filtered list |
| Dashboard | N/A | N/A | — |

**Missing pagination metadata:** none for core list endpoints (Users/Packages/Transactions/Settings all return `meta` when verified).

**Gap:** Users Admin UI paginates 5 rows locally while backend can page large totals (`total` ~1000+). Without sending `page` from the UI, users beyond the fetched `limit` are not reachable via UI pagination alone → **PARTIALLY AVAILABLE** end-to-end.

---

## 10. Authentication & Authorization

| Check | Result | Severity |
| --- | --- | --- |
| Admin routes require Bearer token | Verified: `GET /admin/users` without token → **401** | — (correct) |
| Login issues token | Verified: `POST /auth/login` with `email`+`password` returns `data.token` | — |
| Logout invalidates/clears session server-side | Postman: `DELETE /auth/logout` with Bearer; used by Admin sidebar | AVAILABLE |
| Role enforcement (admin-only) | Admin endpoints succeed with admin token; non-admin access matrix | UNKNOWN / NEEDS VERIFICATION |
| Token expiry / refresh | Not documented in Postman Admin/Auth samples tested | UNKNOWN / NEEDS VERIFICATION |

No Admin UI auth redesign was performed as part of this audit.

---

## 11. Backend Inconsistencies

1. **Dashboard period parameters ignored** while still returning HTTP 200 (silent no-op).
2. **Package naming:** backend `trial` vs UI label/filter `Trail`; UI `Plus` has no backend package.
3. **Settings merchant value shape:** live GET uses `provider` + `api_key`; Postman store/update sample uses `payment_gate` + `key`.
4. **Timestamp formats** differ between top-level and nested relation objects.
5. **Transactions mutations:** Postman documents read-only list/detail, but live POST/PATCH/DELETE return **500** instead of a clean 404/405.
6. **Update method naming:** Users update documented as `PATCH` in Postman; live `PUT /admin/users/1` also returned 200 (dual method support — document clearly).
7. **Pricing types:** package/transaction money fields often returned as **strings** (`"9.99"`), while dashboard revenue fields are **numbers** (`59.98`).
8. **Filter query key `package`** vs response field `package_name` / nested `package` — workable but inconsistent vocabulary.

---

## 12. Backend Gaps Summary

| Issue | Affected Feature | Severity | Status |
| --- | --- | --- | --- |
| No export/report endpoints | Overview Export Report; Transactions Download Report | HIGH | MISSING |
| Dashboard period query ignored | Overview growth period tabs | HIGH | BROKEN / PARTIALLY AVAILABLE |
| No `last_payment` on users | Users table last payment column | HIGH | MISSING |
| Create user payload too narrow vs Add Subscriber form | Users Add Subscriber modal | CRITICAL | PARTIALLY AVAILABLE |
| `Trail` filter sends non-matching package slug | Users plan filter | HIGH | INCONSISTENT |
| No `plus` package | Users/Packages Plus filter | MEDIUM | MISSING |
| No send-receipt endpoint | Transactions Send Recipet | HIGH | MISSING |
| No process-payment / transaction mutation API | Transactions Process Payment | CRITICAL | MISSING / BROKEN (500) |
| Transaction POST/PATCH/DELETE return 500 | Transactions mutations | CRITICAL | BROKEN |
| Merchant setting value key names differ Postman vs live | Settings merchant form | HIGH | INCONSISTENT |
| Users UI local pagination vs large backend total | Users pagination completeness | MEDIUM | PARTIALLY AVAILABLE |
| Contact/address/site fields usually null | Transactions address/site; Users phone | MEDIUM | PARTIALLY AVAILABLE |
| Packages/Users edit & Packages create endpoints exist but Admin UI forms missing | Edit/Add Plan / Edit User buttons | MEDIUM | AVAILABLE backend / incomplete UI forms |
| Non-admin authorization matrix | All Admin routes | — | UNKNOWN / NEEDS VERIFICATION |

---

## 13. Recommended Backend Work

### Required

1. **Honor dashboard growth range** on `GET /admin/dashboard` (`range` or `period` = `1M|3M|6M|12M`) and return matching `subscriptionGrowth.points` + `range`.
2. **Add `last_payment` (or equivalent)** to `GET /admin/users` / user detail responses.
3. **Extend `POST /admin/users` (and ideally `PATCH`)** to accept the Admin subscriber fields already present on the user model (`site_url`, `city`, `state`, `country`, `zip_code`, `contact_phone`, `contact_email`, `notes`, optional image upload) **or** document a dedicated company-subscriber create contract matching the UI form.
4. **Document and implement transaction action endpoints** required by the UI:
   - Send receipt
   - Process payment / update `payment_status`
   - Return proper 404/405 (not 500) for unsupported methods.
5. **Add export endpoints** for Overview analytics report and Transactions download, or officially mark those UI actions unsupported (UI must remain; backend still missing).
6. **Align package filter vocabulary** with UI:
   - Support `trial` (and optionally alias `trail` → `trial`)
   - Either add `plus` package or remove ambiguity by documenting supported package enum for filters.
7. **Unify Settings merchant `value` schema** between GET responses and POST/PATCH docs (`provider`/`api_key` vs `payment_gate`/`key`).

### Optional / Improvement

1. Normalize money types (always number or always decimal string) across dashboard vs packages/transactions.
2. Normalize datetime formats (always ISO-8601).
3. Add explicit `address` field or documented composition rules for transaction address display.
4. Add `page` query examples consistently in Postman for all Admin lists.
5. Return clear JSON validation error bodies for 422 create/update failures (ensure clients can surface field errors).
6. Document whether `PUT` is officially supported alongside `PATCH` for users/packages/settings.
7. Publish Admin authorization rules (which roles may access `/admin/*`).

---

## Verification notes

- Live probes performed against `https://srv1962742.hstgr.cloud/api/v1` with admin credentials from Postman (`admin@app.dev`).
- Destructive create/update/delete of production-like records were limited; mutation **availability** for users/packages/settings is confirmed via Postman contracts + selected safe probes; transaction mutations were probed and returned **500**.
- This audit does **not** modify Admin UI code.
- Where UI forms are missing but backend endpoints exist, status is recorded as backend AVAILABLE with an explicit UI-form incompleteness note — not invented endpoints.

---

*Generated as the deliverable for the Admin Backend Integration Audit. Update this file when backend contracts change.*
