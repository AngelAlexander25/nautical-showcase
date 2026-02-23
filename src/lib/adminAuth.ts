const ADMIN_SESSION_KEY = "adminSession";
const DEFAULT_SESSION_DURATION_HOURS = 12;

type AdminSession = {
  token: string;
  expiresAt: number;
};

const getConfiguredAdminPassword = () => import.meta.env.VITE_ADMIN_PASSWORD?.trim();

const getSessionDurationMs = () => {
  const rawHours = Number(import.meta.env.VITE_ADMIN_SESSION_HOURS);
  const hours = Number.isFinite(rawHours) && rawHours > 0
    ? rawHours
    : DEFAULT_SESSION_DURATION_HOURS;

  return hours * 60 * 60 * 1000;
};

const generateSessionToken = () => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `admin-${Date.now()}`;
};

const parseSession = (): AdminSession | null => {
  const raw = localStorage.getItem(ADMIN_SESSION_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as AdminSession;
    if (!parsed?.token || !parsed?.expiresAt) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
};

export const isAdminConfigured = () => Boolean(getConfiguredAdminPassword());

export const loginAdmin = (password: string): boolean => {
  const configuredPassword = getConfiguredAdminPassword();
  if (!configuredPassword || password !== configuredPassword) {
    return false;
  }

  const session: AdminSession = {
    token: generateSessionToken(),
    expiresAt: Date.now() + getSessionDurationMs(),
  };

  localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
  return true;
};

export const isAdminAuthenticated = (): boolean => {
  const session = parseSession();
  if (!session) return false;

  const isValid = session.expiresAt > Date.now();
  if (!isValid) {
    localStorage.removeItem(ADMIN_SESSION_KEY);
  }

  return isValid;
};

export const clearAdminSession = () => {
  localStorage.removeItem(ADMIN_SESSION_KEY);
};
