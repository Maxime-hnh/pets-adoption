# Guide d'Authentification - Pets Adoption

## Architecture

L'authentification utilise maintenant des **cookies httpOnly** pour une sécurité maximale, avec une architecture séparée pour les **Client Components** et **Server Components**.

## Structure des Services

### 1. Services d'Authentification

#### `authService` (Client Components)
- **Fichier**: `src/_services/auth.service.ts`
- **Usage**: Client Components uniquement
- **Fonctionnalités**:
  - Login/Logout
  - Refresh token automatique
  - Gestion du store Zustand
  - Utilise le proxy Next.js (`/api/*`)

#### `authServerService` (Server Components)
- **Fichier**: `src/_services/auth-server.service.ts`
- **Usage**: Server Components uniquement
- **Fonctionnalités**:
  - Récupération de l'utilisateur actuel
  - Vérification des rôles
  - Accès direct aux cookies Next.js
  - Pas de store Zustand

### 2. Hooks d'Authentification

#### `useAuth(options)`
- **Fichier**: `src/_hooks/useAuth.ts`
- **Options**:
  - `redirectTo`: URL de redirection
  - `redirectIfFound`: Rediriger si authentifié
  - `requiredRole`: Rôle requis

#### Hooks spécialisés
- `useRequireAuth()`: Protection des routes
- `useRequireAdmin()`: Protection admin
- `useRedirectIfAuthenticated()`: Redirection si connecté

### 3. Composants de Protection

#### `ProtectedRoute`
```tsx
<ProtectedRoute redirectTo="/auth/login" requiredRole="ADMIN">
  <YourComponent />
</ProtectedRoute>
```

#### `AdminRoute`
```tsx
<AdminRoute>
  <AdminComponent />
</AdminRoute>
```

## Configuration Backend

### Cookies
- **httpOnly**: `true` (sécurité)
- **secure**: `process.env.NODE_ENV === 'production'`
- **sameSite**: `'lax'` (compatibilité)
- **path**: `'/'`

### Endpoints
- `POST /api/auth/login`: Connexion
- `POST /api/auth/logout`: Déconnexion
- `POST /api/auth/refresh`: Refresh token
- `GET /api/auth/me`: Informations utilisateur

## Middleware Next.js

Le middleware protège automatiquement les routes `/admin/*` :
- Vérifie la présence du token
- Contrôle les rôles ADMIN/SUPERADMIN
- Redirection automatique

## Utilisation

### Client Component
```tsx
"use client"

import { useRequireAuth } from '@/_hooks/useAuth';

export default function MyPage() {
  const { user, isLoading } = useRequireAuth('/auth/login');
  
  if (isLoading) return <div>Chargement...</div>;
  
  return <div>Bonjour {user?.email}</div>;
}
```

### Server Component
```tsx
import { authServerService } from '@/_services/auth-server.service';

export default async function MyServerPage() {
  const user = await authServerService.getCurrentUser();
  
  if (!user) {
    redirect('/auth/login');
  }
  
  return <div>Bonjour {user.email}</div>;
}
```

### Protection par Composant
```tsx
"use client"

import { ProtectedRoute } from '@/_components/ProtectedRoute';

export default function MyPage() {
  return (
    <ProtectedRoute redirectTo="/auth/login">
      <MyContent />
    </ProtectedRoute>
  );
}
```

## API Client

Utilisez `apiClient` pour les appels API avec gestion automatique du refresh :

```tsx
import { apiClient } from '@/_lib/api-client';

// GET
const response = await apiClient.get('/api/animals');

// POST
const response = await apiClient.post('/api/animals', animalData);

// Avec options
const response = await apiClient.get('/api/public-data', { skipAuth: true });
```

## Problèmes Résolus

1. **Cookies httpOnly**: Sécurité maximale, pas d'accès JavaScript
2. **Proxy Next.js**: Toutes les requêtes passent par `/api/*`
3. **Refresh automatique**: Gestion transparente des tokens expirés
4. **Séparation Client/Server**: Services adaptés à chaque contexte
5. **Protection des routes**: Middleware + composants + hooks
6. **Configuration cohérente**: Cookies identiques partout

## Notes Importantes

- **Jamais** utiliser `useAuthStore` dans un Server Component
- **Toujours** utiliser `credentials: 'include'` pour les cookies
- **Préférer** les composants `ProtectedRoute` aux hooks manuels
- **Utiliser** `apiClient` au lieu de `fetch` direct
