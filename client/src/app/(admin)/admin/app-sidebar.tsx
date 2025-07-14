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
import { LayoutDashboard, Calendar, Settings, PawPrint, Mail, Users } from "lucide-react"
import { usePathname, useRouter } from 'next/navigation'
import { useState, useTransition } from "react"
import { cn } from "@/_lib/cn"
import { useAllMessagesQuery } from "@/_hooks/messages/useMessagesQuery";
import { MessageStatus } from "@/_schemas/message.schema";
import { Badge } from "@/_components/ui/badge"

export function AppSidebar() {

  const pathname = usePathname()
  const router = useRouter();
  const [activeItem, setActiveItem] = useState<string>(pathname);
  const [isPending, startTransition] = useTransition();
  const { data: messages } = useAllMessagesQuery();
  const receivedCount = messages?.filter((m) => m.status === MessageStatus.RECEIVED).length ?? 0;

  const handleClick = (url: string) => {
    setActiveItem(url);
    startTransition(() => {
      router.push(url);
    });
  };


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
      title: "Messages",
      url: "/admin/messages",
      icon: Mail,
    },
    {
      title: "Utilisateurs",
      url: "/admin/users",
      icon: Users,
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
                    onMouseEnter={() => router.prefetch(item.url)}
                    onClick={() => handleClick(item.url)}
                  >
                    <div className="flex items-center gap-2">
                      <item.icon />
                      <span className="w-full flex items-center justify-between">
                        {item.title}
                        {item.url === "/admin/messages"
                          && receivedCount > 0
                          && <Badge className="h-5 w-5 rounded-full text-xs bg-red-500 text-white">{receivedCount}</Badge>}
                      </span>
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
