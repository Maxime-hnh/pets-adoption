"use client"

import { PropsWithChildren } from "react";
import Footer from "@/_components/layout/footer";
import { Toaster } from "@/_components/ui/sonner";
import IsMobileObserver from "@/_core/is-mobile-observer";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from "@/_stores/auth.store"
import { Role } from "@/_types/role.interface";
import { useUIStore } from "@/_stores/ui.store"
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/_core/query-client';
import { useQueryClient } from '@tanstack/react-query';
import { prefetchAnimalsQuery } from '@/_queries/animals/prefertchAnimalsQuery';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export function AdminProviders(props: PropsWithChildren) {

  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const setLoggedUser = useAuthStore((state) => state.setLoggedUser)
  const setShowHeader = useUIStore((state) => state.setShowHeader);
  const qc = useQueryClient(queryClient);


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
        prefetchAnimalsQuery(qc)
        setShowHeader(false);
      } catch (error) {
        router.push('/signin');
      }
    }
  }, [router, setLoggedUser]);

  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <IsMobileObserver />
        <Toaster richColors />
        {props.children}
        <Footer />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}