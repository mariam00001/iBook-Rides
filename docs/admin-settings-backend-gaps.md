# Admin Settings — Backend Missing Gaps

**UI:** `src/admin/components/AdminSettings/AdminSettings.jsx`  
**API base:** `https://srv1962742.hstgr.cloud/api/v1`

This note explains what the Admin Settings page needs from the backend that is missing or incomplete today. The UI design stays as-is. These are API/product gaps — not “a frontend variable was forgotten.”

---

## 1. Email section cannot be saved or loaded

The page has an **Email** block with **Email ID** and **Password**.

There is no admin email settings key, no email fields on the merchant value object, and no Postman sample for saving those credentials. Opening Settings never fills Email from the API. **Save Changes** never writes Email either.

Until the backend provides an email settings contract (or a dedicated setting key), that whole section is UI-only.

**Status:** MISSING  
**Severity:** CRITICAL

---

## 2. Enter second Key has nowhere to go

**Merchant Account** shows two key fields: **Enter keys** and **Enter second Key**.

The documented merchant value only supports **one** secret — Postman uses `key`; live responses may use `api_key`. There is no second key, secret, or publishable-key field. Whatever the admin types in **Enter second Key** cannot be stored.

**Status:** MISSING  
**Severity:** HIGH

---

## 3. Terms and conditions cannot be persisted

The page has a rich-text **Terms and conditions** editor.

There is no terms setting key and no terms endpoint in Postman. Content stays in the browser only. Save will not persist Terms; the UI must report that the backend is missing.

**Status:** MISSING  
**Severity:** CRITICAL

---

## 4. Merchant field names do not agree with each other

For the merchant gateway and API key, docs and live data disagree:

- Postman create/update sample uses `payment_gate` and `key`.  
- Live GET has been seen with `provider` and `api_key`.  

The Settings page tries to read both shapes, but it saves using the Postman names. That mismatch can leave gateway or key blank after a round-trip if the server stores the other names.

**Status:** INCONSISTENT  
**Severity:** HIGH

---

## 5. Gateway and mode options are not a clear backend contract

The UI offers payment gateway choices (for example Stripe, PayPal) and modes (test, live). Postman only shows example values like `stripe` and `test`. There is no documented list of allowed gateways or modes.

So the dropdowns look complete, but it is unclear whether PayPal (or other values) are actually valid on the server.

**Status:** UNDOCUMENTED / PARTIALLY AVAILABLE  
**Severity:** MEDIUM

---

## 6. Save Changes only covers Merchant Account

One **Save Changes** button covers Email, Merchant Account, and Terms.

What the API can do today: create or update the `merchant-account` setting with gateway, mode, currency code, and **one** key.

What it cannot do: save Email, the second key, or Terms. Staff can think the whole page saved when only merchant fields did.

**Status:** PARTIALLY AVAILABLE (merchant only)  
**Severity:** CRITICAL for full-page save · merchant path itself AVAILABLE

---

## 7. Settings CRUD already exists (clarification)

`GET` / `POST` / `PATCH` / `DELETE` on `/admin/settings` work for generic settings, and merchant account can be stored under key `merchant-account`. The gap is not “there is no settings API.” The gap is that the **Settings page design is wider than the documented merchant payload**.

**Status:** Settings CRUD AVAILABLE · Email / second key / Terms incomplete

---

## What backend should add (short list)

1. An email settings key or dedicated endpoint matching **Email ID** and **Password** (and any SMTP fields if product needs them later).  
2. A second merchant key field — or document that only one key is supported so product can drop the second field later.  
3. A Terms and conditions setting (HTML or text) that can be loaded and saved with this page.  
4. One merchant value schema everywhere (`payment_gate`/`key` **or** `provider`/`api_key`, not both).  
5. Document allowed gateway, mode, and currency values.  
6. Prefer one clear save for all three sections (or separate APIs per section) so **Save Changes** matches the full UI.
