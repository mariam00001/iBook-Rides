/**
 * Shared helpers to unwrap Laravel-style Admin API envelopes:
 * { status, message, data, meta }
 */

export interface AdminMeta {
  currentPage?: number;
  perPage?: number;
  total?: number;
  totalPages?: number;
}

export function unwrapList<T = Record<string, unknown>>(json: unknown): {
  items: T[];
  meta: AdminMeta;
} {
  if (Array.isArray(json)) {
    return { items: json as T[], meta: { total: json.length } };
  }
  const root = json as { data?: unknown; meta?: AdminMeta };
  if (Array.isArray(root.data)) {
    return { items: root.data as T[], meta: root.meta || { total: root.data.length } };
  }
  if (root.data && typeof root.data === 'object') {
    const nested = root.data as { data?: unknown };
    if (Array.isArray(nested.data)) {
      return {
        items: nested.data as T[],
        meta: root.meta || { total: nested.data.length },
      };
    }
  }
  return { items: [], meta: { total: 0 } };
}

export function unwrapData<T = Record<string, unknown>>(json: unknown): T {
  if (json && typeof json === 'object' && 'data' in (json as object)) {
    return (json as { data: T }).data;
  }
  return json as T;
}
