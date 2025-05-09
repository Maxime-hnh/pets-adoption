# Next.js + Shadcn/UI + Tailwind CSS Template

Un template moderne et prêt à l'emploi pour démarrer rapidement des projets React avec Next.js, Shadcn/UI et Tailwind CSS. Ce template inclut une structure organisée, une gestion de contexte, un thème clair/sombre, et des composants UI réutilisables.

## 🚀 Technologies

- **Next.js 15** - Framework React avec App Router
- **React 19** - Bibliothèque UI
- **Tailwind CSS 4** - Framework CSS utilitaire
- **Shadcn/UI** - Composants UI basés sur Radix UI
- **TypeScript** - Typage statique
- **Next Themes** - Gestion du thème clair/sombre
- **Sonner** - Notifications toast élégantes
- **Google Fonts** - Polices optimisées (Geist, Poppins, Sora, IBM Plex Sans)

## 📁 Structure du Projet

```
src/
├── _components/        # Composants réutilisables
│   ├── layout/         # Composants de mise en page (header, footer)
│   └── ui/             # Composants UI (boutons, inputs, etc.)
├── _context/           # Contexte React pour l'état global
├── _core/              # Éléments fondamentaux (providers, loaders)
├── _helper/            # Utilitaires et constantes
├── _hooks/             # Hooks personnalisés
├── _lib/               # Bibliothèques et utilitaires
└── app/                # Pages et routes Next.js
    ├── globals.css     # Styles globaux
    ├── layout.tsx      # Layout racine
    ├── page.tsx        # Page d'accueil
    └── template-page/  # Exemple de page template
```

## 🔧 Fonctionnalités

- **Architecture App Router** - Utilise le nouveau système de routage de Next.js
- **Thème Clair/Sombre** - Changement de thème avec persistance
- **Responsive Design** - Détection automatique des appareils mobiles
- **Composants UI** - Collection de composants UI prêts à l'emploi
- **Context API** - Gestion d'état globale avec React Context
- **Hooks Personnalisés** - Hooks réutilisables pour des fonctionnalités communes
- **Polices Optimisées** - Chargement optimisé des polices Google Fonts

## 🏁 Démarrage Rapide

1. Clonez ce template :
   ```bash
   git clone <url-du-repo> mon-projet
   cd mon-projet
   ```

2. Installez les dépendances :
   ```bash
   npm install
   # ou
   yarn install
   # ou
   pnpm install
   # ou
   bun install
   ```

3. Lancez le serveur de développement :
   ```bash
   npm run dev
   # ou
   yarn dev
   # ou
   pnpm dev
   # ou
   bun dev
   ```

4. Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 🧩 Utilisation du Contexte

Le template inclut un contexte d'application prêt à l'emploi 

## 🎨 Personnalisation du Thème

Le thème Tailwind est préconfigué et peut être personnalisé dans `tailwind.config.ts`.

Pour basculer entre les thèmes clair et sombre, utilisez le composant `ThemeToggle` :

```tsx
import { ThemeToggle } from '@/_components/ui/theme-toggle';

function MonHeader() {
  return (
    <header>
      <ThemeToggle />
    </header>
  );
}
```

## 📦 Composants UI Disponibles

- Alerts
- Buttons
- Dropdown Menus
- Inputs
- Separators
- Sheets (modals)
- Skeletons
- Toasts (via Sonner)
- Tooltips
- Et plus encore...

## 📱 Responsive Design

Le template inclut une détection automatique des appareils mobiles via le contexte d'application et des hooks personnalisés 

## 🚀 Déploiement

Le moyen le plus simple de déployer votre application Next.js est d'utiliser la [Plateforme Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) des créateurs de Next.js.

Consultez la [documentation de déploiement Next.js](https://nextjs.org/docs/app/building-your-application/deploying) pour plus de détails.

## 📝 Licence

MIT
