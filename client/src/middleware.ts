import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Role } from './_types/role.interface';

export async function middleware(request: NextRequest) {

  // middleware for admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    try {
      const baseUrl = request.nextUrl.origin;
      const apiUrl = `${baseUrl}/api/auth/me`;

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          Cookie: request.headers.get('cookie')!,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
      }

      const currentUser = await response.json();

      if (![Role.ADMIN, Role.SUPERADMIN].includes(currentUser.role)) {
        return NextResponse.redirect(new URL('/', request.url));
      }
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

//Ajouter un middleware qui verifie s'il y a un utilisateur de connecté et que la route est
//login ou register, alros on renvoie sur son profil 

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
