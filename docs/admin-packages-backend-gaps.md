# Admin Packages — Backend Missing Gaps

**UI:** `src/admin/components/AdminPackages/AdminPackages.jsx`  
**Cards flow:** **+ Add New Plan** → **Package Settings** popup  
**API base:** `https://srv1962742.hstgr.cloud/api/v1`

This note explains what the Admin Packages page (Package Settings form) needs from the backend that is missing or incomplete today. The UI design stays as-is. These are API/product gaps — not “a frontend variable was forgotten.”

---

## 1. Number Of User Access cannot be saved

Package Settings asks for **Number Of User Access** so an admin can set how many users that plan may use.

Listing packages returns `users_count`, but that means “how many people already subscribed to this plan,” not a limit the admin sets when creating the plan. There is no documented create/update field for “Number Of User Access.”

Until the backend accepts that limit on `POST /admin/packages` (and return it on list/detail), the field can only sit in the UI and cannot be persisted.

**Status:** MISSING  
**Severity:** HIGH

---

## 2. Monthly and yearly prices cannot both be saved

The form has two price fields: **Package Monthly Price($)** and **Package Yearly Price($)**.

The create API only accepts **one** `price` plus one `duration_days`. There is no way to store both a monthly and a yearly price for the same package as the design shows.

Today the frontend can only send one of them (monthly with 30 days if filled, otherwise yearly with 365 days). The other price is lost.

**Status:** PARTIALLY AVAILABLE  
**Severity:** CRITICAL

---

## 3. Custmize toggles are not accepted on create

The **Custmize** section has switches for:

- Peak Hours Facility  
- visible in frontend  
- Google Calender  
- Promo Code Applicable  
- Track Flight Status  
- Special Package  

Some related flags exist when you *read* a package (for example peak hours, promo code, flight status, Google calendar). But **creating or updating a package does not document accepting those feature flags**. Two of the UI switches have no known backend key at all: **visible in frontend** and **Special Package**.

Admins can flip the toggles in the popup; those choices are not saved through the current create contract.

**Status:** MISSING on create · PARTIAL on read  
**Severity:** HIGH

---

## 4. Additional Features checkboxes are not accepted on create

The **Additional Features** section has checkboxes for unlimited bookings, online booking, local & global affiliate, merchant account, driver scheduling, invoicing, revenue report, and instant price quoting.

Several of those names match feature keys that appear on a **GET** package response. The **POST/PATCH** create body in Postman only allows name, description, price, and duration days — no features object.

So the checklist on Package Settings cannot be stored when adding a new plan.

**Status:** MISSING on create · PARTIAL on read  
**Severity:** HIGH

---

## 5. Create requires a description the design does not show

`POST /admin/packages` requires a `description` field. Package Settings has no description input — only name, user access, prices, and feature controls.

The frontend invents a short description from the package name so create can succeed. That is a workaround. The backend should either stop requiring description for this flow, or accept the full Package Settings payload without forcing a field that is not on the UI.

**Status:** INCONSISTENT  
**Severity:** MEDIUM

---

## 6. What create actually supports today (clarification)

The Packages create endpoint **does exist** and works for a narrow payload: package name, one price, duration days, and a description. List/search/delete also work.

The gap is not “there is no Add Plan API.” The gap is that **Package Settings draws a richer form than the API can save.**

**Status:** Backend create AVAILABLE · Package Settings payload incomplete

---

## What backend should add (short list)

1. Accept a user-access limit when creating/updating a package, and return it on list/detail (separate from subscriber `users_count` if needed).  
2. Support separate monthly and yearly prices (or a documented billing model that matches both UI fields).  
3. Accept the Custmize and Additional Features flags on create/update (same keys used on GET), including **visible in frontend** and **Special Package** if those stay on the design.  
4. Drop the forced description requirement for this UI, or document how description maps when the form does not show it.  
5. Keep `POST /admin/packages` working for the basic fields so the popup can keep saving what is already supported.
