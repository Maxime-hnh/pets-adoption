'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import { useAuthStore } from "@/_stores/auth.store"
import { Role } from "@/_types/role.interface";
import { useUIStore } from "@/_stores/ui.store"

interface AdminProtectionProps {
  children: React.ReactNode;
}

export default function AdminProtection({ children }: AdminProtectionProps) {

  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const loggedUser = useAuthStore((state) => state.loggedUser);
  const setShowHeader = useUIStore((state) => state.setShowHeader);


  useEffect(() => {
    if (loggedUser === null) {
      const timer = setTimeout(() => {
        if (!loggedUser) {
          router.push('/signin');
        }
      }, 500);
      return () => clearTimeout(timer);
    } else {
      try {
        const token = loggedUser.accessToken;

        if (!token) {
          router.push('/signin');
          return;
        }

        const decoded: any = jwtDecode(token);
        if (decoded.role === Role.USER) {
          router.push('/');
          return;
        }

        setIsAuthorized(true);
        setShowHeader(false);
      } catch (error) {
        router.push('/signin');
      }
    }
  }, [router, loggedUser]);

  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
