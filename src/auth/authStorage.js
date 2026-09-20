const AUTH_KEY = 'ibook_auth';

export const DEMO_ACCOUNTS = {
  user: {
    email: 'user@ibook.com',
    password: 'user123',
    role: 'user',
  },
  admin: {
    email: 'admin@app.dev',
    password: 'password',
    role: 'admin',
  },
};

const API_URL =
  (typeof import.meta !== 'undefined' &&
    (import.meta.env?.VITE_API_BASE_URL || import.meta.env?.VITE_API_URL)) ||
  'https://srv1962742.hstgr.cloud/api/v1';

export function getAuth() {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setAuth(session) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(session));
}

export function clearAuth() {
  localStorage.removeItem(AUTH_KEY);
}

/**
 * Real API logout — DELETE /auth/logout (Bearer token).
 * Always clears local session so the UI can return to /login.
 */
export async function logoutWithApi() {
  const session = getAuth();
  const token = session?.token;
  const base = API_URL.replace(/\/$/, '');

  try {
    if (token) {
      await fetch(`${base}/auth/logout`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
    }
  } catch {
    // Network failure should not block local logout.
  } finally {
    clearAuth();
  }
}

export function loginWithCredentials(email, password) {
  const normalizedEmail = email.trim().toLowerCase();
  const account = Object.values(DEMO_ACCOUNTS).find(
    (a) => a.email === normalizedEmail && a.password === password
  );
  if (!account) return null;
  const session = {
    email: account.email,
    role: account.role,
    name: account.role === 'admin' ? 'Admin' : 'User',
  };
  setAuth(session);
  return session;
}

/**
 * Real API login — POST /auth/login with { email, password }.
 * Falls back to demo accounts if the API rejects credentials or is unreachable.
 */
export async function loginWithApi(email, password) {
  const payload = {
    email: String(email || '').trim(),
    password: String(password || ''),
  };

  if (!payload.email || !payload.password) {
    return null;
  }

  try {
    const response = await fetch(`${API_URL.replace(/\/$/, '')}/auth/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const json = await response.json();
      const data = json.data || json;
      if (data?.token) {
        const session = {
          id: data.id,
          email: data.email || payload.email,
          name: data.name || 'Admin',
          role: data.role || 'admin',
          token: data.token,
        };
        setAuth(session);
        return session;
      }
    }
  } catch {
    // Network / CORS — fall through to demo
  }

  return loginWithCredentials(payload.email, payload.password);
}
