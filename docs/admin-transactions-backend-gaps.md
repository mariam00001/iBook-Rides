# Admin Transactions — Backend Missing Gaps

**UI:** `src/admin/components/AdminTransactions/AdminTransactions.jsx`  
**API base:** `https://srv1962742.hstgr.cloud/api/v1`

This note explains what the Admin Transactions page needs from the backend that is missing or incomplete today. The UI design stays as-is. These are API/product gaps — not “a frontend variable was forgotten.”

---

## 1. Download Report has nowhere to go

The toolbar has a **Download Report** button so staff can export transactions (CSV, PDF, or similar).

There is no transactions export endpoint in Postman. Paths that were tried for exports (for example `/admin/export`, `/admin/reports/export`) returned **404**. The button can only show that the backend is missing.

**Status:** MISSING  
**Severity:** HIGH

---

## 2. Send Recipet cannot run

On the **Today** tab, each row shows a **Send Recipet** action (send a receipt for that transaction).

There is no receipt endpoint in Postman. A live check of something like `POST /admin/transactions/:id/receipt` returned **404**. Staff can click the button; the receipt is never sent through the API.

**Status:** MISSING  
**Severity:** HIGH

---

## 3. Process Payment cannot run

On the **Past** and **Paid** tabs, the same column is **Process Payment** — complete or update payment for that row.

Postman only documents reading transactions (list and detail). Live create/update/delete attempts returned **500** instead of a clean “not supported” response. There is no safe, documented way to process a payment or change `payment_status` from this Admin page.

**Status:** MISSING / BROKEN  
**Severity:** CRITICAL

---

## 4. Today / Past / Paid tabs are built only on the frontend

The page has three tabs: **Today**, **Past**, and **Paid**. The API does not return a tab field and does not offer a tab filter.

The frontend guesses the tab from payment status and due date. That can work for the current design, but it is not a real backend contract. Edge cases depend entirely on how dates and statuses are stored.

**Status:** PARTIALLY AVAILABLE  
**Severity:** MEDIUM

---

## 5. Account Status filter only works on loaded rows

The Status control (All / Active / Inactive) filters by the nested user’s status **after** the list is fetched. There is no verified account-status query on `GET /admin/transactions`.

Date filters go to the API; this status filter does not. With a limited fetch, staff only filter what is already on the page.

**Status:** PARTIALLY AVAILABLE  
**Severity:** MEDIUM

---

## 6. Site URL and Address are often blank

The table expects **SITE URL** and **ADDRESS**.

Site URL maps to `user.site_url` when the user is included — the field exists but is often empty. Address is pieced together from city, state, country, and zip; there is no single address field, and those parts are often empty too. The columns stay on the UI; the data is frequently not there.

**Status:** PARTIALLY AVAILABLE  
**Severity:** MEDIUM

---

## 7. Email History is often empty

On Past/Paid, the table shows **EMAIL HISTORY**. When the API returns `email_history`, it can display. When it does not, the cell can only show a backend-missing state. That is a data gap, not a separate action API.

**Status:** PARTIALLY AVAILABLE  
**Severity:** MEDIUM

---

## 8. Pagination is only partly connected to the API

The backend can return pagination `meta`. The Transactions UI loads a limited slice and pages those rows locally. Staff cannot reliably walk the full transaction list with the on-screen pagination until the UI sends page/limit to the server (or the API returns everything — which it does not at scale).

**Status:** PARTIALLY AVAILABLE  
**Severity:** MEDIUM

---

## 9. List and date filters already work (clarification)

Listing transactions, filtering by from/to dates, and showing company, email, package, price, due date, and account status (when user/package are included) **do work**. The gap is not “there is no transactions API.” The gap is the **actions and exports** the UI shows, plus incomplete address/site/history data and client-only tabs/filters.

**Status:** List / date filters AVAILABLE · Actions incomplete

---

## What backend should add (short list)

1. An export endpoint for **Download Report**, or a clear statement that export is unsupported while the button stays in the UI.  
2. A **Send receipt** action that exists and succeeds (for example a receipt route on the transaction).  
3. A **Process payment** / update payment-status API that does not return **500**.  
4. Return proper **404/405** for unsupported transaction methods instead of **500**.  
5. Populate site URL and address (or one address field) so those columns can show real data.  
6. Optionally support tab and account-status filters on the list API, and keep `meta` so server pagination can drive the table end-to-end.
