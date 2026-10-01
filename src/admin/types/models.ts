import type { BackendField } from './backend';

/** Auth login body from Postman Auth/Login */
export interface AdminLoginPayload {
  email: string;
  password: string;
}

/** POST /admin/users — Store User (Postman) */
export interface AdminUserStorePayload {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  role: string;
  plan_id: number;
}

/** PATCH /admin/users/:id — Update User (Postman) */
export interface AdminUserUpdatePayload {
  name: string;
  email: string;
  password?: string;
  password_confirmation?: string;
  role: string;
}

/** UI subscriber form (source of truth for Admin Users modal) */
export interface AdminSubscriberForm {
  companyName: string;
  siteUrl: string;
  city: string;
  state: string;
  phoneNumber: string;
  emailAddress: string;
  country: string;
  zipCode: string;
  contactPersonName: string;
  loginEmail: string;
  password: string;
  notes: string;
  uploadFileName: string | null;
}

/** Row model for Admin Users table (UI) */
export interface AdminUserTableRow {
  id: string;
  name: BackendField<string>;
  email: BackendField<string>;
  phone: BackendField<string>;
  plan: BackendField<string>;
  status: BackendField<string>;
  lastPayment: BackendField<string>;
}

export interface AdminUsersListQuery {
  page?: number;
  search?: string;
  role?: string;
  package?: string;
  limit?: number;
}

/** POST/PATCH /admin/packages (Postman) */
export interface AdminPackagePayload {
  name: string;
  description: string;
  price: number;
  duration_days: number;
}

/** UI plan card / table row */
export interface AdminPackageFeature {
  label: string;
  included: boolean;
}

export interface AdminPackageUi {
  id: string;
  period: 'Monthly' | 'Yearly';
  name: string;
  price: string;
  periodLabel: string;
  tablePrice: string;
  duration: string;
  users: BackendField<string>;
  popular: boolean;
  features: AdminPackageFeature[];
  description: BackendField<string>;
  durationDays: BackendField<number>;
  apiPrice: BackendField<number>;
}

export interface AdminPackagesListQuery {
  search?: string;
  limit?: string | number;
}

/** GET /admin/transactions query (Postman) */
export interface AdminTransactionsListQuery {
  limit?: number;
  payment_status?: string;
  from_date?: string;
  to_date?: string;
  with_user?: '0' | '1';
  with_package?: '0' | '1';
}

export type AdminTransactionTab = 'Today' | 'Past' | 'Paid';

export interface AdminTransactionRow {
  id: string | number;
  tab: AdminTransactionTab;
  company: BackendField<string>;
  email: BackendField<string>;
  siteUrl: BackendField<string>;
  address: BackendField<string>;
  package: BackendField<string>;
  price: BackendField<string>;
  dueDate: BackendField<string>;
  accountStatus: BackendField<string>;
  paymentStatusLabel: BackendField<string>;
  emailHistory: BackendField<string>;
}

/** Settings CRUD (Postman) — merchant value only */
export interface AdminSettingValue {
  payment_gate?: string;
  /** Live GET may return provider instead of payment_gate */
  provider?: string;
  mode?: string;
  currency_code?: string;
  key?: string;
  /** Live GET may return api_key instead of key */
  api_key?: string;
  [key: string]: unknown;
}

export interface AdminSettingPayload {
  label: string;
  group: string;
  key: string;
  value: AdminSettingValue | string;
}

export interface AdminSettingRow {
  id: string;
  label: BackendField<string>;
  group: BackendField<string>;
  key: BackendField<string>;
  value: BackendField<string>;
}

/**
 * Admin Settings page form (UI source of truth from design).
 * Email / secondKey / terms are UI-only until backend supports them.
 */
export interface AdminSettingsForm {
  emailId: string;
  password: string;
  paymentGateway: string;
  mode: string;
  currencyCode: string;
  enterKeys: string;
  /** BACKEND MISSING — not in merchant value schema */
  secondKey: string;
  /** BACKEND MISSING — no terms endpoint/key */
  terms: string;
}

/** Dashboard UI cards / charts */
export type AdminDashboardPeriod = '1M' | '3M' | '6M' | '12M';

export interface AdminDashboardStat {
  key: string;
  label: string;
  value: BackendField<string | number>;
}

export interface AdminDashboardChartPoint {
  label: string;
  value: BackendField<number>;
}

export interface AdminDashboardRevenueSlice extends AdminDashboardChartPoint {
  amountLabel?: string;
  pctLabel?: string;
}

export interface AdminDashboardData {
  stats: AdminDashboardStat[];
  subscriptionGrowth: AdminDashboardChartPoint[];
  revenueBreakdown: AdminDashboardRevenueSlice[];
  sectionNotes: BackendField<null>;
  backendPeriod?: string;
  requestedPeriod?: AdminDashboardPeriod;
}

export interface AdminApiListResult<T> {
  items: T[];
  total: number;
  /** True when the list endpoint could not be reached / returned an error */
  backendMissing: boolean;
  message: string;
  meta?: {
    currentPage?: number;
    perPage?: number;
    total?: number;
    totalPages?: number;
  };
}
