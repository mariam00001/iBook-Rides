# Admin Users — Backend Missing Gaps

**UI:** `src/admin/components/AdminUsers/AdminUsers.jsx`  
**API base:** `https://srv1962742.hstgr.cloud/api/v1`

This note explains what the Admin Users page needs from the backend that is missing or incomplete today. The UI design stays as-is. These are API/product gaps — not “a frontend variable was forgotten.”

---

## 1. Last payment column is empty for every user

The users table has a **last payment** column so staff can see when (or how much) each subscriber last paid.

When we list users (`GET /admin/users`), the API returns identity, contact, plan, and status — but **nothing about payment history**. There is no last-payment date, amount, or payment summary on the list (or on a documented user-detail field we can map).

Until the backend includes that on the users API, the column can only show a backend-missing state. The UI must stay; the data is not there yet.

**Status:** MISSING  
**Severity:** HIGH

---

## 2. Add Subscriber cannot save most of what the admin fills in

The **Add Subscriber** modal asks for a full company profile: company name, site URL, city, state, phone, email, country, zip, contact person, login email, password, notes, and an optional file upload.

Creating a user today only accepts a narrow account payload: name, email, password, password confirmation, role, and plan id. If the frontend sends the richer company fields as drawn in the UI, the API rejects them (**422**).

Some of those company details already exist when you *read* a user (`site_url`, city, state, country, zip, phone, notes) — so the model knows about them — but **create (and a clear update path for the same form) does not accept them** in a documented way that matches the Admin modal.

Result: admins can fill the form, but most of that information never gets stored through this create flow.

**Status:** PARTIALLY AVAILABLE  
**Severity:** CRITICAL

---

## 3. Plan filter labels do not match what the backend understands

The Users page filter offers plans such as **Trail** and **Plus**.

- Filtering with `package=trail` returns nobody, because the real package name is **`trial`**. The label and the API slug disagree.
- Filtering with **Plus** returns nobody, because there is **no Plus package** in the live catalog (only trial, basic, premium, enterprise).

So the filter UI looks complete, but two options either never match or never exist on the server.

**Status:** INCONSISTENT (Trail) / MISSING (Plus)  
**Severity:** HIGH (Trail) · MEDIUM (Plus)

---

## 4. Phone and other contact details are often blank

The Contact Details column expects a phone number. The API has a place for it (`contact_phone`), but many users come back empty. The same pattern shows up for related address/site fields used elsewhere. The UI is ready; the data is often not populated.

**Status:** PARTIALLY AVAILABLE  
**Severity:** MEDIUM

---

## 5. Pagination on the page is only partly connected to the API

The backend can page large user totals (`meta` with page, per-page, total). The Admin Users UI currently loads a limited slice and pages **those rows locally** (5 per page). Staff cannot reliably step through the full user list using only the on-screen controls until the UI sends page/limit to the API (or the backend returns the full set — which it does not at scale).

**Status:** PARTIALLY AVAILABLE  
**Severity:** MEDIUM

---

## 6. Edit user (clarification — not a missing update API)

The pencil/edit control exists on each row. **`PATCH /admin/users/:id` already exists on the backend**, but this Admin page does not yet open an edit form. That is mainly a UI incompleteness for edit, not a missing update endpoint — listed so it is not confused with the real gaps above (last payment, create payload, filters).

**Status:** Backend update AVAILABLE · Edit form on this page incomplete

---

## What backend should add (short list)

1. Return last-payment info on each user in the list (and/or user detail).
2. Accept the full Add Subscriber company profile on create (and ideally update), including optional upload — or document a dedicated company-subscriber create contract that matches the modal.
3. Align plan filter slugs with UI labels (`trial` / optional `trail` alias) and either add a Plus package or document that Plus is not a real filter value.
4. Populate contact phone (and related company fields) when they exist in the product data.
5. Keep supporting server pagination so the Users table can page the full dataset end-to-end.
