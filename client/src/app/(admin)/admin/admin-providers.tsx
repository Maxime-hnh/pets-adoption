"use client"

import { PropsWithChildren } from "react";
import { Toaster } from "@/_components/ui/sonner";
import IsMobileObserver from "@/_core/is-mobile-observer";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from "@/_stores/auth.store"
import { Role } from "@/_types/role.interface";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export function AdminProviders(props: PropsWithChildren) {

  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const setLoggedUser = useAuthStore((state) => state.setLoggedUser)


  useEffect(() => {
    const storedUser = localStorage.getItem("loggedUser");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setLoggedUser(user);
        if (!user.accessToken) {
          router.push('/signin');
          return;
        }
        if (user.role === Role.USER) {
          router.push('/');
          return;
        }
        setIsAuthorized(true);
      } catch (error) {
        router.push('/signin');
      }
    }
  }, [router, setLoggedUser]);

  if (isAuthorized === null) {
    return null;
  }
  return (
    <>
      <IsMobileObserver />
      <Toaster richColors />
      {props.children}
      <ReactQueryDevtools />
    </>
  );
}