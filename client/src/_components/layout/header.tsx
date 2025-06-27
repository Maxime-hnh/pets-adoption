'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { cn } from "@/_lib/cn"
import { MenuBar } from '../ui/glow-menu'
import { usePathname } from 'next/navigation';
import { useAuthStore } from "@/_stores/auth.store";
import { useUIStore } from "@/_stores/ui.store";
import { getMenuItems } from '@/_core/navigation';

export default function Header() {

  const pathname = usePathname();
  const activeNavItem = useUIStore((state) => state.activeNavItem);
  const setActiveNavItem = useUIStore((state) => state.setActiveNavItem);
  const loggedUser = useAuthStore((state) => state.loggedUser);

  // Synchroniser l'état actif avec la route actuelle
  useEffect(() => {
    setActiveNavItem(pathname);
  }, [pathname, setActiveNavItem]);

  const menuItems = getMenuItems(loggedUser);

  return (
    <>
      <header className={cn("hidden sm:flex fixed top-0 left-0 right-0 z-50 sm:h-[120px] items-center justify-center animate-fade-in-down")}>
        {/* Desktop */}
        <Image src="/favicon.ico" width={75} height={75} alt="logo" className="hidden sm:block rounded-full absolute left-8 top-1/2 -translate-y-1/2" />

        <MenuBar
          items={menuItems}
          activeItem={activeNavItem}
          onItemClick={setActiveNavItem}
        />
      </header>

      {/* Mobile */}
      <div className="fixed w-full top-0 left-0 z-50 h-[60px] bg-indigo-500 sm:hidden">
        <Image
          src="/favicon.ico"
          width={50}
          height={50}
          alt="logo"
          className="m-auto"
        />
      </div>
    </>
  );
}
