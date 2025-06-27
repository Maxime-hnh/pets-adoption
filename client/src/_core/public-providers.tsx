import { PropsWithChildren } from "react";
import Header from "@/_components/layout/header";
import Footer from "@/_components/layout/footer";
import { Toaster } from "@/_components/ui/sonner";
import IsMobileObserver from "@/_core/is-mobile-observer";
import { AuthProvider } from "@/_core/auth-provider";
import NavBarMobile from "@/_components/NavBarMobile";
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
    <AuthProvider>
      <IsMobileObserver />
      <Toaster richColors />
      <Header />
      <main className="flex-1 pt-[60px] sm:pt-[120px] sm:px-1 lg:px-4 overflow-x-hidden bg-custom-dots">
        {props.children}
      </main>
      <NavBarMobile />
      <Footer />
    </AuthProvider>
  );
}
