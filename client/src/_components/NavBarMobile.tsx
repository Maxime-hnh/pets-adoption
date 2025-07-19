'use client';

import Link from "next/link";
import { cn } from "@/_lib/cn";
import { useAuthStore } from "@/_stores/auth.store";
import { usePathname } from 'next/navigation';
import { getMenuItems } from '@/_core/navigation';

export default function NavBarMobile() {
  const pathname = usePathname();
  const loggedUser = useAuthStore((state) => state.loggedUser);
  const menuItems = getMenuItems(loggedUser);

  return (
    <nav className="fixed w-full bottom-0 left-0 z-50 h-[60px] bg-indigo-500 sm:hidden">
      <div className="flex items-center justify-around h-full">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = pathname === item.href ||
            (item.href !== '/' && pathname?.startsWith(item.href));
          return (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200",
              )}
            >
              <Icon
                className={cn(
                  "w-7 h-7 text-white",
                  isActive && "text-orange-500"
                )}
                strokeWidth={isActive ? 2.5 : 1.5}
              />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}