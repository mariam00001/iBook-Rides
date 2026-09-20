/**
 * Centralized Admin HTTP client.
 * Base URL from VITE_API_BASE_URL or VITE_API_URL (same host as Postman {{url}}).
 * Bearer token resolved from existing auth storage (ibook_auth.token).
 */

const DEFAULT_API_BASE = 'https://srv1962742.hstgr.cloud/api/v1';

export function getAdminApiBaseUrl(): string {
  const fromEnv =
    (import.meta.env.VITE_API_BASE_URL as string | undefined) ||
    (import.meta.env.VITE_API_URL as string | undefined);
  return (fromEnv || DEFAULT_API_BASE).replace(/\/$/, '');
}

export function getAdminAuthToken(): string {
  try {
    const raw = localStorage.getItem('ibook_auth');
    if (raw) {
      const session = JSON.parse(raw) as { token?: string };
      if (session?.token) return session.token;
    }
  } catch {
    // ignore malformed session
  }

  return (
    localStorage.getItem('token') ||
    sessionStorage.getItem('token') ||
    (import.meta.env.VITE_ADMIN_TOKEN as string | undefined) ||
    ''
  );
}

export class AdminApiError extends Error {
  status: number;
  body: unknown;

  constructor(message: string, status: number, body: unknown = null) {
    super(message);
    this.name = 'AdminApiError';
    this.status = status;
    this.body = body;
  }
}

async function parseErrorMessage(response: Response): Promise<string> {
  try {
    const json = (await response.json()) as {
      message?: string;
      error?: string;
      errors?: Record<string, string[]>;
    };
    if (json.message) return json.message;
    if (json.error) return json.error;
    if (json.errors) {
      const first = Object.values(json.errors)[0];
      if (Array.isArray(first) && first[0]) return first[0];
    }
  } catch {
    // non-JSON error body
  }
  return `Admin API request failed (${response.status})`;
}

export async function adminRequest<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const base = getAdminApiBaseUrl();
  const headers = new Headers(options.headers || {});
  headers.set('Accept', 'application/json');
  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  const token = getAdminAuthToken();
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  let response: Response;
  try {
    response = await fetch(`${base}${path}`, {
      ...options,
      headers,
    });
  } catch {
    throw new AdminApiError('Network error contacting Admin API', 0);
  }

  if (!response.ok) {
    const message = await parseErrorMessage(response);
    throw new AdminApiError(message, response.status);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const text = await response.text();
  if (!text) return undefined as T;
  return JSON.parse(text) as T;
}

export function toQueryString(
  params: Record<string, string | number | undefined | null>
): string {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      search.set(key, String(value));
    }
  });
  const qs = search.toString();
  return qs ? `?${qs}` : '';
}
