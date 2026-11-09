// Credenciales públicas de una demostración sin backend. No son un secreto.
export const DEMO_USERNAME = 'admin';
export const DEMO_PASSWORD = 'CaiDemo2026!';
export const DEMO_SESSION_KEY = 'cai-demo-session-v1';
export const DEMO_SESSION_DURATION = 8 * 60 * 60 * 1000;

export type DemoSession = {
  version: 1;
  username: 'admin';
  displayName: 'Administrador';
  role: 'admin';
  expiresAt: number;
};

export function authenticateDemo(username: string, password: string, now = Date.now()): DemoSession | null {
  if (username.trim().toLowerCase() !== DEMO_USERNAME || password !== DEMO_PASSWORD) return null;
  return { version: 1, username: DEMO_USERNAME, displayName: 'Administrador', role: 'admin', expiresAt: now + DEMO_SESSION_DURATION };
}

export function restoreDemoSession(value: string | null, now = Date.now()): DemoSession | null {
  if (!value) return null;
  try {
    const session = JSON.parse(value);
    if (session?.version !== 1 || session.username !== DEMO_USERNAME || session.role !== 'admin' || session.displayName !== 'Administrador' || typeof session.expiresAt !== 'number' || !Number.isFinite(session.expiresAt) || session.expiresAt <= now || session.expiresAt > now + DEMO_SESSION_DURATION) return null;
    return session as DemoSession;
  } catch { return null; }
}
