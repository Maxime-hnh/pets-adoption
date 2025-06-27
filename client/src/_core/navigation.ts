import { AuthenticatedUser } from '@/_types/authenticated-user.interface.ts';
import { Role } from '@/_types/role.interface';
import { CalendarDays, Home, Mail, PawPrint, User } from 'lucide-react';

export const getMenuItems = (loggedUser: AuthenticatedUser | null) => [
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
    href: "/animals",
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
      "radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(126,70,238,0.06) 50%, rgba(109,40,217,0) 100%)",
    iconColor: "text-purple-500",
  },
  {
    icon: User,
    label: "Compte",
    href: !loggedUser
      ? "/auth/login"
      : [Role.ADMIN, Role.SUPERADMIN].includes(loggedUser.role)
        ? "/admin"
        : "/profile",
    gradient:
      "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)",
    iconColor: "text-blue-500",
  },
];
