import { createAuthClient } from 'better-auth/react'

export const auth = createAuthClient({
  baseUrl: 'http://localhost:3001',
  endpoints: {
    login: '/auth/login',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    me: '/auth/me',
  },
})