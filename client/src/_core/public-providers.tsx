import { PropsWithChildren } from "react";
import Header from "@/_components/layout/header";
import Footer from "@/_components/layout/footer";
import { Toaster } from "@/_components/ui/sonner";
import IsMobileObserver from "@/_core/is-mobile-observer";

/**
 * A top-level component that wraps the entire app and provides
 * a number of global services and layouts.
 *
 * This component is used in `pages/_app.tsx`.
 *
 * @param props The props to pass to the component.
 * @returns The rendered component. 
 */
export function PublicProviders(props: PropsWithChildren) {
  return (
    <>
      <IsMobileObserver />
      <Toaster richColors />
      <Header />
      <main className="flex-1 h-dvh pt-[120px] px-1 lg:px-4 overflow-y-auto">
        {props.children}
      </main>
      <Footer />
    </>
  );
}
