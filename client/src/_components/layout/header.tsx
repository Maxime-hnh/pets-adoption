'use client';

import { cn } from "@/_lib/cn"
import { MenuBar } from '../ui/glow-menu'
import { usePathname } from 'next/navigation';
import { useAuthStore } from "@/_stores/auth.store";
import { getMenuItems } from '@/_core/navigation';

export default function Header() {

  const pathname = usePathname();
  const loggedUser = useAuthStore((state) => state.loggedUser);
  const menuItems = getMenuItems(loggedUser);

  return (
    <header id="header" className={cn("hidden sm:flex fixed top-0 left-0 right-0 z-50 sm:h-[90px] items-center justify-center animate-fade-in-down")}>
      <MenuBar
        items={menuItems}
        activeItem={pathname}
      />
    </header>
  );
}
