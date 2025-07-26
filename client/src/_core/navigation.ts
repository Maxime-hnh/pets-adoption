import { AuthenticatedUser } from '@/_types/authenticated-user.interface.ts';
import { Role } from '@/_types/role.interface';
import { CalendarDays, Home, Mail, PawPrint, User } from 'lucide-react';
import { ROUTES } from '@/_lib/constants';

export const getMenuItems = (loggedUser: AuthenticatedUser | null) => [
  {
    icon: Home,
    label: "Home",
    href: "/",
    gradient:
      "radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(234,88,12,0.06) 50%, rgba(194,65,12,0) 100%)",
    iconColor: "text-orange-500",
  },
  {
    icon: PawPrint,
    label: "Animaux",
    href: ROUTES.ANIMALS,
    gradient: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)",
    iconColor: "text-indigo-500",
  },
  {
    icon: CalendarDays,
    label: "Evènements",
    href: ROUTES.EVENTS,
    gradient:
      "radial-gradient(circle, rgba(173,70,255,0.15) 0%, rgba(173,70,255,0.06) 50%, rgba(173,70,255,0) 100%)",
    iconColor: "text-purple-500",
  },
  {
    icon: Mail,
    label: "Contact",
    href: ROUTES.CONTACT,
    gradient:
      "radial-gradient(circle, rgba(0,188,125,0.15) 0%, rgba(0,188,125,0.06) 50%, rgba(0,188,125,0) 100%)",
    iconColor: "text-emerald-500",
  },
  {
    icon: User,
    label: "Compte",
    href: !loggedUser
      ? ROUTES.AUTH + ROUTES.LOGIN
      : [Role.ADMIN, Role.SUPERADMIN].includes(loggedUser.role)
        ? ROUTES.ADMIN
        : ROUTES.PROFILE,
    gradient:
      "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)",
    iconColor: "text-blue-500",
  },
];
