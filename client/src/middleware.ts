import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Role } from './_types/role.interface';
import { authServerService } from './_services/auth-server.service';

export async function middleware(request: NextRequest) {

  // middleware for admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    try {
      const currentUser = await authServerService.meServer();
      if (!currentUser) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
      }
      if (!authServerService.hasRole(currentUser, [Role.ADMIN, Role.SUPERADMIN])) {
        return NextResponse.redirect(new URL('/', request.url));
      }
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  };

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
