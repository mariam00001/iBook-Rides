/**
 * Admin API paths from `iBook Rides.postman_collection.json` (Admin folder).
 * Source of truth for endpoint contracts available in Postman.
 */
export const ADMIN_API = {
  users: {
    list: '/admin/users',
    detail: (id: string | number) => `/admin/users/${id}`,
    store: '/admin/users',
    update: (id: string | number) => `/admin/users/${id}`,
    remove: (id: string | number) => `/admin/users/${id}`,
  },
  dashboard: {
    get: '/admin/dashboard',
  },
  packages: {
    list: '/admin/packages',
    detail: (id: string | number) => `/admin/packages/${id}`,
    store: '/admin/packages',
    update: (id: string | number) => `/admin/packages/${id}`,
    remove: (id: string | number) => `/admin/packages/${id}`,
  },
  transactions: {
    list: '/admin/transactions',
    detail: (id: string | number) => `/admin/transactions/${id}`,
  },
  settings: {
    list: '/admin/settings',
    detail: (key: string) => `/admin/settings/${key}`,
    store: '/admin/settings',
    update: (key: string) => `/admin/settings/${key}`,
    remove: (key: string) => `/admin/settings/${key}`,
  },
} as const;
