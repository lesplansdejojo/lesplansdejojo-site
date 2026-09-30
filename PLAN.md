# Feuille de route — Les Plans de Jojo

Application web installable (PWA) pour la communauté Les Plans de Jojo à Montréal : des codes promo gratuits (partenaires commissionnés) pour tout le monde, et un abonnement mensuel Premium qui débloque les rabais exclusifs et donne accès aux guides d'activités et de voyage gratuitement ou à petit prix.

## Jalon 1 — L'application visible ✅ (terminé)

- Image de marque néon (logo, couleurs, polices) et navigation mobile en bas de l'écran
- Accueil : accroche, nouveautés de la semaine, gratuit vs Premium, guides, instructions d'installation
- Rabais : recherche, filtres Gratuit / Premium et catégories, copie du code en un geste, codes Premium masqués
- Guides : couvertures, prix normal vs prix Premium, filtre Activités / Voyage
- Premium : forfaits, FAQ, aperçu « membre Premium » (mode démo mémorisé sur l'appareil)
- PWA : manifeste, icônes, service worker (installation + consultation hors ligne)
- Contenu d'exemple centralisé dans `src/data/fixtures.ts`

## Jalon 2 — Base de données des offres et des guides

- Schéma Netlify Database (Drizzle) : `deals`, `guides`, `categories`
- Remplacer `src/data/fixtures.ts` par des lectures serveur (loaders TanStack Start)
- Les codes Premium ne sont **jamais envoyés** au navigateur d'un non-membre (masquage côté serveur, pas seulement visuel)
- Dates d'expiration : les offres expirées disparaissent automatiquement

## Jalon 3 — Comptes membres

- Inscription / connexion (Netlify Identity) : courriel + mot de passe, éventuellement Google
- Page « Mon compte » : statut, abonnement, guides achetés
- Rôle administrateur réservé à Jojo

## Jalon 4 — Abonnement Premium (Stripe)

- Stripe Checkout en mode abonnement (prix mensuel en CAD, taxes TPS/TVQ via Stripe Tax)
- Webhook Stripe → mise à jour du statut Premium du membre
- Portail client Stripe pour annuler ou changer de carte
- Remplacement du mode démo par le vrai statut

## Jalon 5 — Guides téléchargeables

- Stockage des PDF dans Netlify Blobs (privés)
- Téléchargement gratuit pour Premium (guides d'activités), achat unique Stripe pour les autres
- Liens de téléchargement signés, bibliothèque « Mes guides »

## Jalon 6 — Tableau de bord de Jojo

- Ajouter / modifier / retirer une offre ou un guide sans toucher au code
- Statistiques : codes copiés par partenaire (utile pour négocier), nombre de membres Premium, revenus

## Jalon 7 — Croissance et fidélisation

- Favoris et alertes (« préviens-moi des nouveaux rabais Restos »)
- Notifications push web pour les nouveaux plans de la semaine
- Infolettre (inscription via Netlify Forms)
- Partage d'un rabais gratuit sur Instagram / Facebook
