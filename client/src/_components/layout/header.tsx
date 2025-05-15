'use client';

import Image from 'next/image';
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/_components/ui/sheet';
import { Menu } from 'lucide-react';
import { ModeToggle } from '../ui/theme-toggle';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { useUIStore } from "@/_stores/ui.store"
import { cn } from "@/_helpers/cn"


export default function Header() {

  const [opened, setOpened] = useState(false);
  const toggle = () => setOpened((o) => !o);
  const showHeader = useUIStore((state) => state.showHeader);


  return (
    <header className={cn("fixed top-0 left-0 right-0 z-50 border-b flex items-center justify-between h-[60px] py-0 sm:py-1 px-0 sm:px-4 md:px-24 lg:px-40", showHeader ? "" : "hidden")}>
      {/* Desktop */}
      <div className="hidden sm:flex items-center gap-8 w-full justify-between">
        <div className='flex items-center gap-4'>
          <Image src="/favicon.ico" width={40} height={40} alt="logo" className="rounded-full" />
          <span className="font-bold text-xl">AppName.</span>
        </div>
        <nav className="flex items-center gap-12 w-full justify-between">
          <div className="flex gap-12">
            <Link href="/template-page">Comment adopter ?</Link>
            <Link href="/">Évènements</Link>
            <Link href="/">Animaux</Link>
            <Link href="/">A propos</Link>
            <Link href="/">Contact</Link>
          </div>
          {/* <IntlToggle /> */}
          <ModeToggle />
          <div>
            <Link href={"/signin"}>
            <Button>Connexion</Button>
            </Link>
          </div>
        </nav>
        <div></div>
      </div>

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
