# AGENTS.md

## Projet

« Les Plans de Jojo » : PWA en français (fr-CA) pour une communauté montréalaise de bons plans. Deux niveaux :
- **Gratuit** : codes de partenaires qui commissionnent Jojo, visibles par tous.
- **Premium** (abonnement mensuel) : rabais exclusifs non commissionnés + guides PDF gratuits ou à petit prix.

**La suite du travail est décrite dans `PLAN.md` — continuer à partir du prochain jalon non terminé.**

## Stack

TanStack Start (React 19, TanStack Router basé sur les fichiers), Vite 7, Tailwind CSS 4, TypeScript strict, déployé sur Netlify. pnpm.

## Structure

```
public/
  logo.png, icons/          # identité de Jojo (fournie par la cliente)
  img/                      # images générées (hero + couvertures de guides), servies via /.netlify/images
  manifest.webmanifest      # manifeste PWA
  sw.js                     # service worker : réseau d'abord, cache en secours
src/
  data/fixtures.ts          # SEULE source de contenu (offres, guides, forfaits) + helpers money() et cdn()
  lib/membership.tsx        # contexte : statut Premium (démo, localStorage), toast(), copy()
  components/AppShell.tsx   # en-tête, nav desktop, barre d'onglets mobile
  components/Cards.tsx      # DealCard, GuideCard
  routes/__root.tsx         # <head>, polices, enregistrement du SW, providers
  routes/index.tsx          # accueil
  routes/rabais.tsx         # liste filtrable des codes
  routes/guides.tsx         # guides
  routes/premium.tsx        # forfaits + FAQ + bascule du mode démo
```

## Conventions

- Tout le texte d'interface est en français québécois, tutoiement.
- Couleurs via les tokens Tailwind définis dans `src/styles.css` (`nuit`, `neon`, `rose`, `or`, `brume`…). Classes utilitaires : `.neon` (texte néon), `.neon-box`, `.grain`.
- Rose néon = actions et contenu gratuit ; or = tout ce qui est Premium.
- Images : toujours passer par `cdn(src, width)` (Netlify Image CDN), jamais les PNG originaux.
- Mobile d'abord : la barre d'onglets du bas remplace la nav sous `md`.

## Décisions non évidentes

- Le statut Premium est actuellement un **mode démo** (`localStorage`, clé `jojo-demo-premium`), basculé depuis le bas de `/premium`. Les codes Premium sont présents dans le bundle et seulement floutés : c'est acceptable pour l'aperçu mais le jalon 2 doit les masquer côté serveur.
- Les boutons de paiement / téléchargement affichent un toast « sera branché ici » en attendant Stripe (jalons 4 et 5).
- Le service worker ne s'enregistre qu'en production pour ne pas gêner le développement.
- Un code `LIEN` dans une offre signifie « offre par lien affilié » : la carte affiche un bouton vers `url` au lieu d'un code à copier.
