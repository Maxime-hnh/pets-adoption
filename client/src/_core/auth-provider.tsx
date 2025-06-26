"use client"

import { ReactNode } from 'react';
import { useAuthStore } from '@/_stores/auth.store';

interface AuthProviderProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function AuthProvider({ children, fallback }: AuthProviderProps) {

  const isHydrated = useAuthStore((state) => state.isHydrated);

  if (!isHydrated) {
    return fallback || (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return <>{children}</>;
}