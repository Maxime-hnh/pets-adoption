'use client';

import Link from "next/link";
import { cn } from "@/_lib/cn";
import { useUIStore } from "@/_stores/ui.store";
import { useAuthStore } from "@/_stores/auth.store";
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { getMenuItems } from '@/_core/navigation';

export default function NavBarMobile() {
  const pathname = usePathname();
  const activeNavItem = useUIStore((state) => state.activeNavItem);
  const setActiveNavItem = useUIStore((state) => state.setActiveNavItem);
  const loggedUser = useAuthStore((state) => state.loggedUser);

  useEffect(() => {
    setActiveNavItem(pathname);
  }, [pathname, setActiveNavItem]);

  const menuItems = getMenuItems(loggedUser);

  return (
    <nav className="fixed w-full bottom-0 left-0 z-50 h-[60px] bg-indigo-500 sm:hidden">
      <div className="flex items-center justify-around h-full">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeNavItem === item.href;

          return (
            <Link
              key={index}
              href={item.href}
              onClick={() => setActiveNavItem(item.href)}
              className={cn(
                "flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200",

              )}
            >
              <Icon
                className={cn(
                  "w-7 h-7 text-amber-500",
                )}
              />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}