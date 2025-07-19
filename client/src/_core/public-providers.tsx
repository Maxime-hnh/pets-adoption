"use client"
import { PropsWithChildren } from "react";
import Header from "@/_components/layout/header";
import Footer from "@/_components/layout/footer";
import { Toaster } from "@/_components/ui/sonner";
import IsMobileObserver from "@/_core/is-mobile-observer";
import { AuthProvider } from "@/_core/auth-provider";
import NavBarMobile from "@/_components/NavBarMobile";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./query-client";
import { AuthStoreHydrator } from "./auth-store-hydrator";
import { AuthenticatedUser } from "@/_types/authenticated-user.interface.ts";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
/**
 * A top-level component that wraps the entire app and provides
 * a number of global services and layouts.
 *
 * This component is used in `pages/_app.tsx`.
 *
 * @param props The props to pass to the component.
 * @returns The rendered component. 
 */
export function PublicProviders(props: PropsWithChildren<{ user: AuthenticatedUser | null }>) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />

      <AuthStoreHydrator user={props.user} />
      {/* <AuthProvider> */}
        <IsMobileObserver />
        <Toaster richColors />
        <Header />
        <main className="flex-1 sm:px-1 md:px-0 overflow-hidden bg-custom-dots">
          {props.children}
        </main>
        <NavBarMobile />
        <Footer />
      {/* </AuthProvider> */}
    </QueryClientProvider>
  );
}
//overflow-x-hidden
