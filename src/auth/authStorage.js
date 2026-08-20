const AUTH_KEY = 'ibook_auth';

export const DEMO_ACCOUNTS = {
  user: {
    email: 'user@ibook.com',
    password: 'user123',
    role: 'user',
  },
  admin: {
    email: 'admin@ibook.com',
    password: 'admin123',
    role: 'admin',
  },
};

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
