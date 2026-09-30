// ============================================================================
// DONNÉES D'EXEMPLE — Les Plans de Jojo
// ----------------------------------------------------------------------------
// Tout le contenu affiché dans l'app vient de ce fichier.
// Plus tard (voir PLAN.md), ces listes seront remplacées par une vraie base
// de données gérée depuis un tableau de bord administrateur.
//
// tier: "free"    → partenaire qui te commissionne, code visible pour tous
//       "premium" → rabais exclusif, réservé aux membres Premium
// ============================================================================

export type Tier = 'free' | 'premium'

export type Category =
  | 'Activités'
  | 'Restos'
  | 'Plein air'
  | 'Voyage'
  | 'Boutiques'
  | 'Bien-être'

export type Deal = {
  id: string
  partner: string
  title: string
  category: Category
  area: string
  discount: string
  code: string
  tier: Tier
  expires?: string
  isNew?: boolean
  url?: string
}

export type Guide = {
  id: string
  title: string
  subtitle: string
  cover: string
  pages: number
  kind: 'Activités' | 'Voyage'
  price: number
  premiumPrice: number
}

export type Plan = {
  id: 'free' | 'premium'
  name: string
  price: number
  period: string
  tagline: string
  perks: string[]
}

export const CATEGORIES: Category[] = [
  'Activités',
  'Restos',
  'Plein air',
  'Voyage',
  'Boutiques',
  'Bien-être',
]
export const DEALS: Deal[] = [
  { id: 'd1', partner: 'Ballet Hop NDG', title: 'Cours de ballet adultes et enfants', category: 'Activités', area: 'NDG', discount: '-10 %', code: 'JOJO10', tier: 'free', isNew: true },

  { id: 'd2', partner: 'Boutique Le Cargo', title: 'Boutique', category: 'Boutiques', area: 'En ligne', discount: '-10 %', code: 'JOJO10', tier: 'free' },

  { id: 'd3', partner: 'Nidotruche', title: 'Bon plan', category: 'Activités', area: 'Saint-Eustache', discount: 'Code promo', code: 'JOJO10', tier: 'free' },

  { id: 'd4', partner: 'Leo Autopartage', title: 'Autopartage', category: 'Voyage', area: 'Montréal', discount: '10 $', code: 'A5BJGBDY', tier: 'free' },

  { id: 'd5', partner: 'Fever', title: 'Activités et sorties', category: 'Activités', area: 'En ligne', discount: '11 $ de rabais', code: 'Voir message Instagram/Facebook', tier: 'free' },

  { id: 'd6', partner: 'ATTITUDE.ca', title: 'Produits soins et beauté', category: 'Bien-être', area: 'En ligne', discount: '-20 %', code: '20JCAMART', tier: 'free' },

  { id: 'd7', partner: 'BrunoVélo & Fatbike', title: 'Vélo et fatbike', category: 'Plein air', area: 'En ligne', discount: 'Code promo', code: 'JOJO10', tier: 'free' },

  { id: 'd8', partner: 'MTArégion', title: 'Pass MTArégion', category: 'Voyage', area: 'Québec', discount: '-20 % / 10 $', code: 'JOJO20 / P676482N', tier: 'free' },

  { id: 'd9', partner: 'Rakuten', title: 'Bon d’achat', category: 'Boutiques', area: 'En ligne', discount: '30 $', code: 'JOJO30', tier: 'free', url: 'https://www.rakuten.ca/r/JOJO30?src=IOS' },

  { id: 'd10', partner: 'Wealthsimple', title: 'Offre de bienvenue', category: 'Voyage', area: 'En ligne', discount: '25 $', code: 'JRO5YW', tier: 'free' },

  { id: 'd11', partner: '87plus', title: 'Café colombien', category: 'Boutiques', area: 'En ligne', discount: '-5 %', code: 'JOJO5', tier: 'free' },
  { id: 'd12', partner: 'Test GitHub', title: 'Test de déploiement', category: 'Activités', area: 'Montréal', discount: 'Test', code: 'TEST', tier: 'free' },
]


// Prix à titre d'exemple — à ajuster
export const PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Communauté',
    price: 0,
    period: 'pour toujours',
    tagline: 'Les codes promo des partenaires de Jojo, pour tout le monde.',
    perks: ['Tous les codes promo partenaires', 'Nouveaux bons plans chaque semaine', 'Installation sur ton téléphone'],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 5.99,
    period: 'par mois',
    tagline: 'Les rabais exclusifs et les guides de Jojo, sans limite.',
    perks: [
      'Tout ce qui est inclus dans Communauté',
      'Rabais exclusifs que tu ne trouves nulle part ailleurs',
      "Guides d'activités gratuits",
      'Guides voyage à petit prix',
      'Annulable en tout temps',
    ],
  },
]

export const money = (n: number) =>
  n === 0 ? 'Gratuit' : n.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD' })

export const cdn = (src: string, w: number) =>
  `/.netlify/images?url=${encodeURIComponent(src)}&w=${w}&fm=webp`
