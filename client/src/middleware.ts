import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Role } from './_types/role.interface';
import { authServerService } from './_services/auth-server.service';
import { authService } from './_services/auth.service';


const authCache = new Map<string, {
  expires: number,
  role: Role
}>();

export async function middleware(request: NextRequest) {

  const { meServer } = authServerService;
  const { hasRole } = authService;

  // middleware for admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    try {

      //1️⃣ Vérifier la présence du refreshToken
      const refreshToken = request.cookies.get('refreshToken')?.value;
      if (!refreshToken) {
        //❌ Token invalide
        return NextResponse.redirect(new URL('/auth/login', request.url))
      }

      //2️⃣ Vérifier le cache
      const keyCache = refreshToken.slice(-10);
      const cached = authCache.get(keyCache);
      if (cached && cached.expires > Date.now()) {
        if (!hasRole(cached.role)) {
          //❌ Cache valide mais rôle non autorisé
          return NextResponse.redirect(new URL('/', request.url));
        }
        //✅ Cache valide et rôle autorisé
        return NextResponse.next();
      }

      //3️⃣ Vérifier le token et récupérer le user
      const currentUser = await meServer();
      if (!currentUser) {
        //❌ Token invalide ou expiré
        //➡️ Rediriger vers la page de refresh
        const refreshUrl = new URL('/auth/refresh-redirect', request.url);
        refreshUrl.searchParams.set('returnTo', request.nextUrl.pathname);
        refreshUrl.searchParams.set('requireAdmin', 'true');
        return NextResponse.redirect(refreshUrl);
      }

      //✅ Token valide et rôle autorisé, mettre à jour le cache
      authCache.set(keyCache, {
        expires: Date.now() + 10 * 60 * 1000,
        role: currentUser.role
      })
      //4️⃣ Autoriser à continuer
      return NextResponse.next();

    } catch (error) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  };

  // if (request.nextUrl.pathname.startsWith('/auth')) {
  //   try {
  //     const currentUser = await authServerService.meServer();
  //     if (!currentUser) return NextResponse.next();
  //     if (!authServerService.hasRole(currentUser.role, [Role.ADMIN, Role.SUPERADMIN])) {
  //       return NextResponse.redirect(new URL('/profile', request.url))
  //     }
  //     return NextResponse.redirect(new URL('/admin', request.url))
  //   } catch (error) {
  //     return NextResponse.redirect(new URL('/', request.url));
  //   }

  // }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/auth/:path*'],
};