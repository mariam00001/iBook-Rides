import { AdminApiError, adminRequest, toQueryString } from './client';
import { ADMIN_API } from './endpoints';
import { unwrapList } from './response';
import { missingField, okField } from '../types/backend';
import type {
  AdminApiListResult,
  AdminSettingPayload,
  AdminSettingRow,
} from '../types/models';

function mapSetting(raw: Record<string, unknown>): AdminSettingRow {
  let valueText: string | null = null;
  if (typeof raw.value === 'string') valueText = raw.value;
  else if (raw.value != null) valueText = JSON.stringify(raw.value);

  return {
    id: String(raw.key ?? raw.id ?? ''),
    label: typeof raw.label === 'string' ? okField(raw.label) : missingField(),
    group: typeof raw.group === 'string' ? okField(raw.group) : missingField(),
    key: typeof raw.key === 'string' ? okField(raw.key) : missingField(),
    value: valueText ? okField(valueText) : missingField('Not returned from backend'),
  };
}

export async function fetchAdminSettings(
  search?: string
): Promise<AdminApiListResult<AdminSettingRow>> {
  try {
    const qs = toQueryString({ search });
    const json = await adminRequest<unknown>(`${ADMIN_API.settings.list}${qs}`);
    const { items, meta } = unwrapList<Record<string, unknown>>(json);

    return {
      items: items.map(mapSetting),
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

export async function storeAdminSetting(payload: AdminSettingPayload): Promise<void> {
  await adminRequest(ADMIN_API.settings.store, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function updateAdminSetting(
  key: string,
  payload: AdminSettingPayload
): Promise<void> {
  await adminRequest(ADMIN_API.settings.update(key), {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export async function deleteAdminSetting(key: string): Promise<void> {
  await adminRequest(ADMIN_API.settings.remove(key), { method: 'DELETE' });
}
