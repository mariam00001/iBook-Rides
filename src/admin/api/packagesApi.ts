import { AdminApiError, adminRequest, toQueryString } from './client';
import { ADMIN_API } from './endpoints';
import { unwrapList } from './response';
import { missingField, okField } from '../types/backend';
import type {
  AdminApiListResult,
  AdminPackageFeature,
  AdminPackagePayload,
  AdminPackageUi,
  AdminPackagesListQuery,
} from '../types/models';

const FEATURE_LABELS: Record<string, string> = {
  unlimited_booking: 'Unlimited Booking',
  online_booking_form_accessible: 'Online Booking Form Accessible',
  instant_price_quoting_facility: 'Instant Price Quoting Facility',
  revenue_report_visibility: 'Revenue Report visibility',
  merchant_account_accessible: 'Merchant Account Accessible',
  invoicing: 'Invoicing',
  driver_scheduling: 'Driver Scheduling',
  local_and_global_affiliates: 'Local And Global Affiliates',
  peak_hour_facility: 'Peak Hour Facility',
  track_flight_status: 'Track Flight Status',
  avail_promo_code: 'Avail Promo Code',
  google_calendar_synchronization: 'Google Calendar Synchronization',
};

function mapFeatures(features: Record<string, unknown> | null | undefined): AdminPackageFeature[] {
  if (!features || typeof features !== 'object') {
    return Object.values(FEATURE_LABELS).map((label) => ({ label, included: false }));
  }
  return Object.entries(FEATURE_LABELS).map(([key, label]) => ({
    label,
    included: Boolean(features[key]),
  }));
}

function capitalizeName(name: string): string {
  if (!name) return name;
  if (name.toLowerCase() === 'trial') return 'Trail';
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function mapPackage(raw: Record<string, unknown>): AdminPackageUi {
  const nameRaw = typeof raw.name === 'string' ? raw.name : 'Package';
  const name = capitalizeName(nameRaw);
  const priceNum = raw.price != null ? Number(raw.price) : null;
  const days = typeof raw.duration_days === 'number' ? raw.duration_days : Number(raw.duration_days);
  const usersCount =
    typeof raw.users_count === 'number' ? raw.users_count : Number(raw.users_count);
  const period: 'Monthly' | 'Yearly' = days >= 360 ? 'Yearly' : 'Monthly';

  return {
    id: String(raw.id ?? nameRaw),
    period,
    name,
    price:
      priceNum === 0
        ? 'Free'
        : priceNum === null || Number.isNaN(priceNum)
          ? 'Not returned from backend'
          : `$${priceNum}`,
    periodLabel: period === 'Yearly' ? '/year' : priceNum === 0 ? '' : '/month',
    tablePrice:
      priceNum === null || Number.isNaN(priceNum)
        ? 'Not returned from backend'
        : `${priceNum} $`,
    duration: Number.isFinite(days) ? `${days} days` : 'Not returned from backend',
    users: Number.isFinite(usersCount)
      ? okField(`${usersCount} User`)
      : missingField('Not returned from backend'),
    popular: nameRaw.toLowerCase() === 'premium',
    features: mapFeatures(raw.features as Record<string, unknown>),
    description:
      typeof raw.description === 'string'
        ? okField(raw.description)
        : missingField('Not returned from backend'),
    durationDays: Number.isFinite(days) ? okField(days) : missingField(),
    apiPrice: priceNum === null || Number.isNaN(priceNum) ? missingField() : okField(priceNum),
  };
}

export async function fetchAdminPackages(
  query: AdminPackagesListQuery = {}
): Promise<AdminApiListResult<AdminPackageUi>> {
  try {
    const qs = toQueryString({ search: query.search, limit: query.limit ?? 50 });
    const json = await adminRequest<unknown>(`${ADMIN_API.packages.list}${qs}`);
    const { items, meta } = unwrapList<Record<string, unknown>>(json);

    return {
      items: items.map(mapPackage),
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

export async function storeAdminPackage(payload: AdminPackagePayload): Promise<void> {
  await adminRequest(ADMIN_API.packages.store, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function updateAdminPackage(
  id: string | number,
  payload: AdminPackagePayload
): Promise<void> {
  await adminRequest(ADMIN_API.packages.update(id), {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export async function deleteAdminPackage(id: string | number): Promise<void> {
  await adminRequest(ADMIN_API.packages.remove(id), { method: 'DELETE' });
}
