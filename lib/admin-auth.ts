import crypto from 'crypto';
import { cookies } from 'next/headers';

export const COOKIE_NAME = 'printone_admin_session';

export function getExpectedPassword(): string {
  return process.env.ADMIN_PASSWORD || 'printone@admin';
}

export function generateSessionToken(password: string): string {
  const salt = process.env.SESSION_SECRET || 'printone-graphics-admin-key-2025';
  return crypto.createHmac('sha256', salt).update(password).digest('hex');
}

export async function verifyAdminSession(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(COOKIE_NAME);
    if (!sessionCookie || !sessionCookie.value) return false;

    const expectedToken = generateSessionToken(getExpectedPassword());
    return sessionCookie.value === expectedToken;
  } catch {
    return false;
  }
}
