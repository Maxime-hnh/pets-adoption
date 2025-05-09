"use client"

import * as React from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu"
import Link from "next/link"
import { Button } from "./button"
import { GlobeIcon } from "lucide-react"
import { useLocale } from "next-intl";

export function IntlToggle() {

  const locale = useLocale()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-center uppercase">
          {locale}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-[50px] min-w-[50px] max-w-[50px]">
        <DropdownMenuItem className="justify-center">
          <Link href="/fr" locale="fr" className="text-center w-full">FR</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="justify-center">
          <Link href="/en" locale="en" className="text-center w-full">EN</Link>
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  )
}
