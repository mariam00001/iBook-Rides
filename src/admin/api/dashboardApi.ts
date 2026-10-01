import { adminRequest, toQueryString } from './client';
import { ADMIN_API } from './endpoints';
import { unwrapData } from './response';
import { missingField, okField } from '../types/backend';
import type { AdminDashboardData, AdminDashboardPeriod } from '../types/models';

function formatMoney(value: number): string {
  const num = Number(value);
  const formatted = num.toLocaleString(undefined, {
    minimumFractionDigits: Number.isInteger(num) ? 0 : 2,
    maximumFractionDigits: 2,
  });
  return `$${formatted}`;
}

function formatCount(value: number): string {
  return Number(value).toLocaleString();
}

export async function fetchAdminDashboard(
  period: AdminDashboardPeriod = '1M'
): Promise<AdminDashboardData> {
  // Postman documents GET /admin/dashboard with no period query.
  // Period tabs remain in the UI; backend currently ignores range/period.
  const qs = toQueryString({ range: period, period });
  const json = await adminRequest<unknown>(`${ADMIN_API.dashboard.get}${qs}`);
  const data = unwrapData<Record<string, unknown>>(json);

  const growth = data.subscriptionGrowth as
    | { points?: { label: string; value: number }[]; range?: string }
    | undefined;
  const revenueByPackage =
    (data.revenue_by_package as { package_name: string; revenue: number }[] | undefined) ||
    [];
  const byPlan = (data.subscriptionsByPlan as
    | {
        total?: number;
        growthPercent?: number;
        basicPlanCount?: number;
        premiumPlanCount?: number;
        enterprisePlanCount?: number;
      }
    | undefined) || {};

  const totalRevenue =
    data.total_revenue != null ? Number(data.total_revenue) : null;
  const revenueSum = revenueByPackage.reduce((sum, row) => sum + Number(row.revenue || 0), 0);

  return {
    stats: [
      {
        key: 'users',
        label: 'Total Users',
        value:
          data.total_users != null
            ? okField(formatCount(Number(data.total_users)))
            : missingField('Backend value unavailable'),
      },
      {
        key: 'user_growth',
        label: 'User Growth',
        value:
          data.userGrowthPercent != null
            ? okField(`${data.userGrowthPercent}%`)
            : missingField('Backend value unavailable'),
      },
      {
        key: 'active_users',
        label: 'Active Users',
        value:
          data.active_users != null
            ? okField(formatCount(Number(data.active_users)))
            : missingField('Backend value unavailable'),
      },
      {
        key: 'inactive_users',
        label: 'Inactive Users',
        value:
          data.inactive_users != null
            ? okField(formatCount(Number(data.inactive_users)))
            : missingField('Backend value unavailable'),
      },
      {
        key: 'trial_users',
        label: 'Trial Users',
        value:
          data.trial_users != null
            ? okField(formatCount(Number(data.trial_users)))
            : missingField('Backend value unavailable'),
      },
      {
        key: 'revenue',
        label: 'Total Revenue',
        value:
          totalRevenue != null
            ? okField(formatMoney(totalRevenue))
            : missingField('Backend value unavailable'),
      },
      {
        key: 'revenue_growth',
        label: 'Revenue Growth',
        value:
          data.revenueGrowthPercent != null
            ? okField(`${data.revenueGrowthPercent}%`)
            : missingField('Backend value unavailable'),
      },
      {
        key: 'this_month_revenue',
        label: 'This Month',
        value:
          data.this_month_revenue != null
            ? okField(formatMoney(Number(data.this_month_revenue)))
            : missingField('Backend value unavailable'),
      },
      {
        key: 'last_month_revenue',
        label: 'Last Month',
        value:
          data.last_month_revenue != null
            ? okField(formatMoney(Number(data.last_month_revenue)))
            : missingField('Backend value unavailable'),
      },
      {
        key: 'growth_pct',
        label: 'Growth',
        value:
          data.revenueGrowthPercent != null
            ? okField(`${data.revenueGrowthPercent}%`)
            : missingField('Backend value unavailable'),
      },
      {
        key: 'subscriptions',
        label: 'Subscriptions by Plan',
        value:
          byPlan.total != null
            ? okField(formatCount(Number(byPlan.total)))
            : missingField('Backend value unavailable'),
      },
      {
        key: 'subscriptions_growth',
        label: 'Subscriptions Growth',
        value:
          byPlan.growthPercent != null
            ? okField(`${byPlan.growthPercent}%`)
            : missingField('Backend value unavailable'),
      },
      {
        key: 'basic_plan',
        label: 'Basic Plan',
        value:
          byPlan.basicPlanCount != null
            ? okField(formatCount(Number(byPlan.basicPlanCount)))
            : missingField('Backend value unavailable'),
      },
      {
        key: 'premium_plan',
        label: 'Premium Plan',
        value:
          byPlan.premiumPlanCount != null
            ? okField(formatCount(Number(byPlan.premiumPlanCount)))
            : missingField('Backend value unavailable'),
      },
      {
        key: 'enterprise_plan',
        label: 'Enterprise Plan',
        value:
          byPlan.enterprisePlanCount != null
            ? okField(formatCount(Number(byPlan.enterprisePlanCount)))
            : missingField('Backend value unavailable'),
      },
    ],
    subscriptionGrowth: (growth?.points || []).map((point) => ({
      label: point.label,
      value: okField(Number(point.value)),
    })),
    revenueBreakdown: revenueByPackage.map((row) => {
      const revenue = Number(row.revenue || 0);
      const pct =
        revenueSum > 0 ? `${Math.round((revenue / revenueSum) * 100)}%` : '0%';
      return {
        label: capitalizePlan(row.package_name),
        value: okField(revenue),
        amountLabel: formatMoney(revenue),
        pctLabel: pct,
      };
    }),
    sectionNotes: okField(null),
    backendPeriod: growth?.range || '1M',
    requestedPeriod: period,
  };
}

function capitalizePlan(name: string): string {
  if (!name) return name;
  const lower = name.toLowerCase();
  if (lower === 'trial') return 'Trail';
  return `${name.charAt(0).toUpperCase()}${name.slice(1)} Plan`;
}
