"use client"

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/_stores/auth.store';
import { authService } from '@/_services/auth.service';

export function useAuth() {

  const [isLoading, setIsLoading] = useState(true);
  const loggedUser = useAuthStore((state) => state.loggedUser);
  const setLoggedUser = useAuthStore((state) => state.setLoggedUser);

  useEffect(() => {
    async function checkAuth() {
      setIsLoading(true);
      if (loggedUser) return;
      await authService.refreshToken();
      setIsLoading(false);
    };

    checkAuth();
  }, [loggedUser, setLoggedUser]);

  return {
    user: loggedUser,
    isLoading
  };
}

