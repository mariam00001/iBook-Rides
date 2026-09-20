import { AdminApiError, adminRequest, toQueryString } from './client';
import { ADMIN_API } from './endpoints';
import { unwrapData, unwrapList } from './response';
import { missingField, okField } from '../types/backend';
import type {
  AdminApiListResult,
  AdminTransactionRow,
  AdminTransactionTab,
  AdminTransactionsListQuery,
} from '../types/models';

function formatAddress(user: Record<string, unknown> | undefined): string | null {
  if (!user) return null;
  const parts = [user.city, user.state, user.country, user.zip_code]
    .filter((part) => typeof part === 'string' && part.trim())
    .map(String);
  return parts.length ? parts.join(', ') : null;
}

function resolveTab(
  paymentStatus: string | undefined,
  dueDate: string | undefined
): AdminTransactionTab {
  if (paymentStatus === 'completed' || paymentStatus === 'paid') return 'Paid';
  if (dueDate) {
    const due = new Date(dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);
    if (due.getTime() === today.getTime()) return 'Today';
    if (due.getTime() < today.getTime()) return 'Past';
  }
  if (paymentStatus === 'pending') return 'Today';
  return 'Past';
}

function mapTransaction(raw: Record<string, unknown>): AdminTransactionRow {
  const user = (raw.user as Record<string, unknown> | undefined) || undefined;
  const pkg = (raw.package as Record<string, unknown> | undefined) || undefined;
  const paymentStatus =
    typeof raw.payment_status === 'string' ? raw.payment_status : undefined;
  const dueDate = typeof raw.due_date === 'string' ? raw.due_date : undefined;
  const address = formatAddress(user);
  const siteUrl =
    (typeof user?.site_url === 'string' && user.site_url) ||
    (typeof raw.site_url === 'string' && raw.site_url) ||
    null;

  const accountRaw =
    typeof user?.status === 'string' ? String(user.status) : null;
  const accountStatus = accountRaw
    ? accountRaw.charAt(0).toUpperCase() + accountRaw.slice(1)
    : null;

  return {
    id: (raw.id as string | number) ?? '',
    tab: resolveTab(paymentStatus, dueDate),
    company:
      typeof user?.name === 'string'
        ? okField(user.name)
        : missingField('Not returned from backend'),
    email:
      typeof user?.email === 'string'
        ? okField(user.email)
        : missingField('Not returned from backend'),
    siteUrl: siteUrl ? okField(siteUrl) : missingField('Not returned from backend'),
    address: address ? okField(address) : missingField('Not returned from backend'),
    package:
      typeof pkg?.name === 'string'
        ? okField(String(pkg.name).charAt(0).toUpperCase() + String(pkg.name).slice(1))
        : missingField('Not returned from backend'),
    price:
      raw.amount != null
        ? okField(`${raw.amount}$`)
        : missingField('Not returned from backend'),
    dueDate: dueDate ? okField(dueDate) : missingField('Not returned from backend'),
    accountStatus: accountStatus
      ? okField(accountStatus)
      : missingField('Not returned from backend'),
    paymentStatusLabel: paymentStatus
      ? okField(paymentStatus)
      : missingField('Not returned from backend'),
    emailHistory:
      typeof raw.email_history === 'string'
        ? okField(raw.email_history)
        : missingField('Not returned from backend'),
  };
}

export async function fetchAdminTransactions(
  query: AdminTransactionsListQuery = {}
): Promise<AdminApiListResult<AdminTransactionRow>> {
  try {
    const qs = toQueryString({
      limit: query.limit ?? 50,
      payment_status: query.payment_status,
      from_date: query.from_date,
      to_date: query.to_date,
      with_user: query.with_user ?? '1',
      with_package: query.with_package ?? '1',
    });
    const json = await adminRequest<unknown>(`${ADMIN_API.transactions.list}${qs}`);
    const { items, meta } = unwrapList<Record<string, unknown>>(json);

    return {
      items: items.map(mapTransaction),
      total: meta.total ?? items.length,
      backendMissing: false,
      message: '',
      meta,
    };
  } catch (error) {
    const message =
      error instanceof AdminApiError
        ? error.message
        : 'BACKEND ENDPOINT MISSING / NOT AVAILABLE';
    return {
      items: [],
      total: 0,
      backendMissing: true,
      message,
    };
  }
}

export async function fetchAdminTransaction(
  id: string | number
): Promise<AdminTransactionRow | null> {
  try {
    const json = await adminRequest<unknown>(ADMIN_API.transactions.detail(id));
    const data = unwrapData<Record<string, unknown>>(json);
    if (data && !Array.isArray(data)) return mapTransaction(data);
    const { items } = unwrapList<Record<string, unknown>>(json);
    if (items[0]) return mapTransaction(items[0]);
    return null;
  } catch {
    return null;
  }
}
