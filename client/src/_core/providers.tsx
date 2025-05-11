"use client";

import { PropsWithChildren } from "react";
import Header from "@/_components/layout/header";
import Footer from "@/_components/layout/footer";
import { Toaster } from "@/_components/ui/sonner";
import { ThemeProvider } from "@/_core/theme-provider";
import IsMobileObserver from "@/_core/is-mobile-observer";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/_core/query-client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useAuthHydration } from "@/_hooks/use-auth-hydration";
import { cn } from "@/_helpers/cn";
import { useUIStore } from "@/_stores/ui.store";

export function Providers(props: PropsWithChildren) {
  useAuthHydration();

  const showHeader = useUIStore((state) => state.showHeader);
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
        disableTransitionOnChange
        storageKey="theme"
      >
        <IsMobileObserver />
        <Toaster richColors />
        <div className="flex min-h-screen flex-col" id="rootLayout">
          <Header />

          <main className={cn(showHeader ? "flex-1 mt-4 pt-[60px] px-1 lg:px-4" : "pt-4")}>{props.children}</main>

          <Footer />
        </div>
        <ReactQueryDevtools />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
