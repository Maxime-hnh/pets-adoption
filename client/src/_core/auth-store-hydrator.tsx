'use client'

import { useAuthStore } from '@/_stores/auth.store'
import { AuthenticatedUser } from '@/_types/authenticated-user.interface.ts'
import { authService } from '@/_services/auth.service'
import { useEffect, useRef } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { favoritesService } from '@/_services/favorites.service'

export function AuthStoreHydrator({ user }: { user: AuthenticatedUser | null }) {
  
  const setLoggedUser = useAuthStore((state) => state.setLoggedUser)
  const setIsHydrated = useAuthStore((state) => state.setIsHydrated)
  const hasHydrated = useRef(false)
  const queryClient = useQueryClient()

  useEffect(() => {
    if (hasHydrated.current) return;
    hasHydrated.current = true;

    async function hydrate() {
      if (user) {
        setLoggedUser(user);
        await queryClient.prefetchQuery({
          queryKey: ['favorites'],
          queryFn: favoritesService.getFavorites,
        });
        console.log(user)
      } else {
        await authService.refreshToken()
      }
      setIsHydrated(true);
    }

    hydrate();
  }, [user, setLoggedUser, setIsHydrated])

  return null
}
