export interface LeadContact {
  email: string;
  phone: string;
}

const KEY_PREFIX = "lead-track:contact:";
const TTL_MS = 30 * 60 * 1000;

function getStorage(): Storage | null {
  try {
    return typeof window === "undefined" ? null : window.localStorage;
  } catch {
    return null;
  }
}

function isValidEntry(value: unknown): value is LeadContact & { expiresAt: number } {
  if (!value || typeof value !== "object") return false;
  const entry = value as Record<string, unknown>;
  return typeof entry.email === "string" && entry.email.length > 0 &&
    typeof entry.phone === "string" && entry.phone.length > 0 &&
    typeof entry.expiresAt === "number" && entry.expiresAt > Date.now();
}

function clearExpiredContacts(storage: Storage) {
  for (let index = storage.length - 1; index >= 0; index--) {
    const key = storage.key(index);
    if (!key?.startsWith(KEY_PREFIX)) continue;
    let entry: unknown;
    try {
      entry = JSON.parse(storage.getItem(key) || "null");
    } catch {
      entry = null;
    }
    if (!isValidEntry(entry)) storage.removeItem(key);
  }
}

/** Save before redirecting. False means storage is unavailable; do not redirect. */
export function saveLeadContact(requestId: string, contact: LeadContact): boolean {
  const storage = getStorage();
  if (!storage || !requestId.trim()) return false;
  try {
    clearExpiredContacts(storage);
    const entry = { email: contact.email, phone: contact.phone, expiresAt: Date.now() + TTL_MS };
    if (!isValidEntry(entry)) return false;
    storage.setItem(KEY_PREFIX + requestId, JSON.stringify(entry));
    return true;
  } catch {
    return false;
  }
}

/** Reading keeps the contact available for reloads and retries after API failures. */
export function readLeadContact(requestId: string): LeadContact | null {
  const storage = getStorage();
  if (!storage || !requestId.trim()) return null;
  try {
    clearExpiredContacts(storage);
    const entry: unknown = JSON.parse(storage.getItem(KEY_PREFIX + requestId) || "null");
    return isValidEntry(entry) ? { email: entry.email, phone: entry.phone } : null;
  } catch {
    return null;
  }
}

/** Call only after a successful submission; other leads are not affected. */
export function removeLeadContact(requestId: string): boolean {
  const storage = getStorage();
  if (!storage || !requestId.trim()) return false;
  try {
    storage.removeItem(KEY_PREFIX + requestId);
    return true;
  } catch {
    return false;
  }
}
