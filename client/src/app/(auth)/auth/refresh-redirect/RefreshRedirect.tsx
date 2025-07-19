"use client";

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authService } from '@/_services/auth.service';

export default function RefreshRedirect() {

  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo') || '/';
  const requireAdmin = searchParams.get('requireAdmin') === 'true';
  const { refreshToken, hasRole } = authService;

  useEffect(() => {
    const handleRefresh = async () => {
      try {
        const user = await refreshToken();
        if (!user) return router.replace('/auth/login');

        if (requireAdmin && !hasRole(user.role)) {
          return router.replace('/');
        }
        return router.replace(returnTo!);
      } catch (error) {
        return router.replace('/auth/login');
      }
    };

    handleRefresh();
  }, [returnTo, requireAdmin, router]);

  return null;
}
