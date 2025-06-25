"use client"

import { useAuth } from '@/_hooks/use-auth';
import { ReactNode } from 'react';

interface AuthProviderProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function AuthProvider({
  children,
  fallback
}: AuthProviderProps) {
  const { isLoading } = useAuth()

  if (isLoading) {
    return fallback || (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return <>{children}</>;
}