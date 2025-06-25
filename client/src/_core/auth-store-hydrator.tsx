'use client'

import { useAuthStore } from '@/_stores/auth.store'
import { AuthenticatedUser } from '@/_types/authenticated-user.interface.ts'
import { useEffect } from 'react'

export function AuthStoreHydrator({ user }: { user: AuthenticatedUser | null }) {
  const setLoggedUser = useAuthStore((state) => state.setLoggedUser)

  useEffect(() => {
    if (user) setLoggedUser(user)
    console.log("user", user)
  }, [user, setLoggedUser])

  return null
}
