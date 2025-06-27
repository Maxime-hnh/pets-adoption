'use client'

import { useAuthStore } from '@/_stores/auth.store'
import { AuthenticatedUser } from '@/_types/authenticated-user.interface.ts'
import { authService } from '@/_services/auth.service'
import { useEffect, useRef } from 'react'

export function AuthStoreHydrator({ user }: { user: AuthenticatedUser | null }) {
  
  const setLoggedUser = useAuthStore((state) => state.setLoggedUser)
  const setIsHydrated = useAuthStore((state) => state.setIsHydrated)
  const hasHydrated = useRef(false)

  useEffect(() => {
    if (hasHydrated.current) return;
    hasHydrated.current = true;

    async function hydrate() {
      if (user) {
        setLoggedUser(user);
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
