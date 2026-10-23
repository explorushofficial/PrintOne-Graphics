import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  COOKIE_NAME,
  getExpectedPassword,
  generateSessionToken,
} from '@/lib/admin-auth';

/**
 * Always returns authenticated: false so whenever anyone navigates or refreshes /admin,
 * they are compulsorily prompted to enter the administrative passcode every single time.
 */
export async function GET() {
  return NextResponse.json({ authenticated: false });
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { password } = body;
    const expected = getExpectedPassword();

    if (!password || String(password).trim() !== expected.trim()) {
      return NextResponse.json(
        { error: 'Incorrect passcode. Please check your password and try again.' },
        { status: 401 }
      );
    }

    const cookieStore = await cookies();
    const token = generateSessionToken(expected.trim());

    // Ephemeral session cookie (no long maxAge) so it does not persist across sessions
    cookieStore.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    return NextResponse.json({
      success: true,
      message: 'Access granted. Welcome to PrintOne Admin.',
    });
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json({ error: 'Server authentication failed' }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME);
    return NextResponse.json({ success: true, message: 'Logged out successfully' });
  } catch (err) {
    console.error('Logout error:', err);
    return NextResponse.json({ error: 'Logout failed' }, { status: 500 });
  }
}
