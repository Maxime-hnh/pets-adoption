"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenuItem,
  SidebarMenu,
  SidebarMenuButton,
  SidebarFooter,
} from "@/_components/ui/sidebar"
import { LayoutDashboard, Calendar, User, Settings, PawPrint } from "lucide-react"
import Image from "next/image"
import { Button } from "./button"
import { usePathname } from 'next/navigation'
import Link from "next/link"

export function AppSidebar() {

  const pathname = usePathname()

  const items = [
    {
      title: "Dashboard",
      url: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Animaux",
      url: "/admin/animals",
      icon: PawPrint,
    },
    {
      title: "Événements",
      url: "/admin/events",
      icon: Calendar,
    },
    {
      title: "Utilisateurs",
      url: "/admin/users",
      icon: User,
    },
    {
      title: "Paramètres",
      url: "/admin/settings",
      icon: Settings,
    },
  ]
  return (
    <Sidebar>
      <SidebarHeader className="flex items-center my-4">
        <Image src="/favicon.ico" width={50} height={50} alt="logo" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="mb-4">Espace Admin</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-4">
              {items.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild isActive={`/fr${pathname}` === item.url}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button variant="ghost">Déconnexion</Button>
      </SidebarFooter>
    </Sidebar>
  )
}
