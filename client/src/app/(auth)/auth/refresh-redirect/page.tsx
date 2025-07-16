"use client";

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authService } from '@/_services/auth.service';

export default function RefreshRedirectPage() {

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

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>
  );
}
