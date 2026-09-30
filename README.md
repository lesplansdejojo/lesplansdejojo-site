# Les Plans de Jojo

Application web installable (PWA) du radar à codes promo de Montréal. La communauté y trouve gratuitement les codes promo des partenaires de Jojo. Les membres Premium (abonnement mensuel) débloquent en plus des rabais exclusifs et téléchargent les guides d'activités et de voyage gratuitement ou à petit prix.

## Écrans

- **Accueil** (`/`) : accroche, nouveautés de la semaine, gratuit vs Premium, guides, installation
- **Rabais** (`/rabais`) : recherche, filtres, copie des codes, codes Premium verrouillés
- **Guides** (`/guides`) : guides d'activités et de voyage, prix normal et prix Premium
- **Premium** (`/premium`) : forfaits, FAQ, aperçu de l'app en tant que membre Premium

## Modifier le contenu

Toutes les offres, tous les guides et les prix se trouvent dans `src/data/fixtures.ts`. Les images sont dans `public/img/`.

## Technologies

- TanStack Start (React 19) + Vite
- Tailwind CSS 4
- PWA : `public/manifest.webmanifest`, `public/sw.js`
- Netlify (hébergement, Image CDN)

## Lancer en local

```bash
pnpm install
netlify dev
```

## Prochaines étapes

Voir [PLAN.md](./PLAN.md) : base de données des offres, comptes membres, abonnement Stripe, guides téléchargeables et tableau de bord administrateur.
