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
import { usePathname, useRouter } from 'next/navigation'
import Link from "next/link"
import { useEffect, useState, useTransition } from "react"
import { cn } from "@/_helpers/cn"

export function AppSidebar() {

  const pathname = usePathname()
  const cleanedPathname = pathname.replace(/^\/(fr|en)/, '');
  const router = useRouter();
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleClick = (url: string) => {
    setActiveItem(url);
    startTransition(() => {
      router.push(url);
    });
  };

  useEffect(() => {
    setActiveItem(cleanedPathname);
  }, [cleanedPathname]);


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
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="mb-4">Espace Admin</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-4">
              {items.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton
                    className={cn("cursor-pointer", { "animate-pulse": isPending && activeItem === item.url })}
                    asChild
                    isActive={activeItem === item.url}
                    onClick={() => handleClick(item.url)}
                  >
                    <div className="flex items-center gap-2">
                      <item.icon />
                      <span>{item.title}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
      </SidebarFooter>
    </Sidebar>
  )
}
