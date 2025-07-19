import { NextResponse, type NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { guestRegex, isDevelopmentEnvironment } from './lib/constants';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ✅ Bypass complet pour l'iframe Shopify
  if (pathname.startsWith('/moleo')) {
    return NextResponse.next();
  }

  // ✅ Bypass healthcheck (important)
  if (pathname.startsWith('/api/health')) {
    return NextResponse.next();
  }

  // ✅ Bypass moleo-chat POST API
if (pathname.startsWith('/api/moleo-chat')) {
  return NextResponse.next();
}
  
  // ✅ Bypass ping
  if (pathname.startsWith('/ping')) {
    return new Response('pong', { status: 200 });
  }

  // ✅ Bypass auth
  if (pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // 🔐 Auth classique
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    secureCookie: !isDevelopmentEnvironment,
  });

  if (!token) {
    const redirectUrl = encodeURIComponent(request.url);
    return NextResponse.redirect(
      new URL(`/api/auth/guest?redirectUrl=${redirectUrl}`, request.url),
    );
  }

  const isGuest = guestRegex.test(token?.email ?? '');
  if (token && !isGuest && ['/login', '/register'].includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/chat/:id',
    '/api/:path*',
    '/login',
    '/register',
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
