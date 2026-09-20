import { adminRequest, toQueryString, AdminApiError } from './client';
import { ADMIN_API } from './endpoints';
import { unwrapList } from './response';
import { missingField, okField } from '../types/backend';
import type {
  AdminApiListResult,
  AdminUserStorePayload,
  AdminUserTableRow,
  AdminUserUpdatePayload,
  AdminUsersListQuery,
} from '../types/models';

function mapUser(raw: Record<string, unknown>): AdminUserTableRow {
  const pkg = raw.package as { name?: string } | null | undefined;
  const planName =
    (typeof raw.package_name === 'string' && raw.package_name) ||
    (typeof pkg?.name === 'string' && pkg.name) ||
    null;

  const phone =
    (typeof raw.contact_phone === 'string' && raw.contact_phone) ||
    (typeof raw.phone === 'string' && raw.phone) ||
    null;

  const status =
    typeof raw.status === 'string'
      ? raw.status.charAt(0).toUpperCase() + raw.status.slice(1)
      : null;

  // last_payment is not present on GET /admin/users responses (verified live).
  return {
    id: String(raw.id ?? ''),
    name: typeof raw.name === 'string' ? okField(raw.name) : missingField(),
    email: typeof raw.email === 'string' ? okField(raw.email) : missingField(),
    phone: phone ? okField(phone) : missingField('Not returned from backend'),
    plan: planName
      ? okField(planName.charAt(0).toUpperCase() + planName.slice(1))
      : missingField('Not returned from backend'),
    status: status ? okField(status) : missingField('Not returned from backend'),
    lastPayment: missingField('Not returned from backend'),
  };
}

function listErrorResult(error: unknown): AdminApiListResult<AdminUserTableRow> {
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

export async function fetchAdminUsers(
  query: AdminUsersListQuery = {}
): Promise<AdminApiListResult<AdminUserTableRow>> {
  try {
    const qs = toQueryString({
      page: query.page,
      search: query.search,
      role: query.role,
      package: query.package,
      limit: query.limit ?? 50,
    });
    const json = await adminRequest<unknown>(`${ADMIN_API.users.list}${qs}`);
    const { items, meta } = unwrapList<Record<string, unknown>>(json);

    return {
      items: items.map(mapUser),
      total: meta.total ?? items.length,
      backendMissing: false,
      message: '',
      meta,
    };
  } catch (error) {
    return listErrorResult(error);
  }
}

export async function storeAdminUser(payload: AdminUserStorePayload): Promise<void> {
  await adminRequest(ADMIN_API.users.store, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function updateAdminUser(
  id: string | number,
  payload: AdminUserUpdatePayload
): Promise<void> {
  await adminRequest(ADMIN_API.users.update(id), {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export async function deleteAdminUser(id: string | number): Promise<void> {
  await adminRequest(ADMIN_API.users.remove(id), { method: 'DELETE' });
}
