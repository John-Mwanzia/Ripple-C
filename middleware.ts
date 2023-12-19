import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token');

  if (!token) {
    return NextResponse.redirect('http://localhost:3000/sign-up');
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/home', '/account'], // Run on specific routes
};
