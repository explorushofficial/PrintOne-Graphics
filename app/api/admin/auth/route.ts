import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  COOKIE_NAME,
  getExpectedPassword,
  generateSessionToken,
  verifyAdminSession,
} from '@/lib/admin-auth';

export async function GET() {
  const authenticated = await verifyAdminSession();
  return NextResponse.json({ authenticated });
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

    cookieStore.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days session
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
