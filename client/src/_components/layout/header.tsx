'use client';

import Image from 'next/image';
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/_components/ui/sheet';
import { CalendarDays, Home, Mail, Menu, PawPrint, User } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { cn } from "@/_helpers/cn"
import { MenuBar } from '../ui/glow-menu'


const menuItems = [
  {
    icon: Home,
    label: "Home",
    href: "/",
    gradient:
      "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)",
    iconColor: "text-blue-500",
  },
  {
    icon: PawPrint,
    label: "Animaux",
    href: "#",
    gradient:
      "radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(234,88,12,0.06) 50%, rgba(194,65,12,0) 100%)",
    iconColor: "text-orange-500",
  },
  {
    icon: CalendarDays,
    label: "Evènements",
    href: "/events",
    gradient:
      "radial-gradient(circle, rgba(34,197,94,0.15) 0%, rgba(22,163,74,0.06) 50%, rgba(21,128,61,0) 100%)",
    iconColor: "text-green-500",
  },
  {
    icon: Mail,
    label: "Contact",
    href: "/contact",
    gradient:
      "radial-gradient(circle, rgba(239,68,68,0.15) 0%, rgba(220,38,38,0.06) 50%, rgba(185,28,28,0) 100%)",
    iconColor: "text-red-500",
  },
  {
    icon: User,
    label: "Profil",
    href: "/signin",
    gradient:
      "radial-gradient(circle, rgba(239,68,68,0.15) 0%, rgba(220,38,38,0.06) 50%, rgba(185,28,28,0) 100%)",
    iconColor: "text-red-500",
  },
]


export default function Header() {

  const [opened, setOpened] = useState(false);
  const toggle = () => setOpened((o) => !o);
  const [activeItem, setActiveItem] = useState<string>("Home")


  return (
    <header className={cn("flex fixed top-0 left-0 right-0 z-50 h-[120px] items-center justify-center animate-fade-in-down")}>
      {/* Desktop */}
      <Image src="/favicon.ico" width={75} height={75} alt="logo" className="rounded-full absolute left-8 top-1/2 -translate-y-1/2" />

      <MenuBar
        items={menuItems}
        activeItem={activeItem}
        onItemClick={setActiveItem}
      />

      {/* Mobile */}
      <div className="sm:hidden flex items-center justify-between w-full">
        <Image src="/favicon.ico" width={50} height={50} alt="logo" className="rounded-full" />
        <Sheet open={opened} onOpenChange={toggle}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetTitle />
            <SheetDescription />
            <nav className="flex flex-col gap-4 mt-4">
              <Link href="/template-page">link 1</Link>
              <Link href="/">link 2</Link>
              <Link href="/">link 3</Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
