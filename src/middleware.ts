import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Public paths that don't require authentication
  const publicPaths = [
    '/',
    '/auth/guest/signin',
    '/auth/guest/signup',
    '/auth/ngo/signin',
    '/auth/ngo/signup',
    '/auth/restaurant/signin',
    '/auth/restaurant/signup',
    '/volunteers',
    '/donate',
    '/find-ngo',
    '/contact',
    '/dashboard/restaurant',
    '/dashboard/restaurant/profile',
    '/dashboard/restaurant/donate',
    '/dashboard/restaurant/history'
  ]

  // Allow all routes to pass through
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 