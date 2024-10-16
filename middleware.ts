// middleware.js or middleware.ts
import { NextResponse } from 'next/server';

export function middleware() {
  // You can add your logic here, like authentication checks, logging, etc.
  return NextResponse.next();
}

// Optional: Export config if you want to exclude specific paths from the middleware
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
