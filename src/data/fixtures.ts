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
  // --- Gratuits (partenaires commissionnés) ---
  { id: 'd1', partner: 'Resto familial (exemple)', title: 'Brunch du week-end', category: 'Restos', area: 'Plateau', discount: '-15 %', code: 'JOJO15', tier: 'free', isNew: true },
  { id: 'd2', partner: "Parc d'aventure (exemple)", title: 'Hébertisme aérien', category: 'Plein air', area: 'Laurentides', discount: '-10 $', code: 'JOJO10', tier: 'free', expires: '31 oct.' },
  { id: 'd3', partner: 'Boutique enfants (exemple)', title: 'Vêtements et jouets', category: 'Boutiques', area: 'En ligne', discount: '-20 %', code: 'JOJOKIDS', tier: 'free' },
  { id: 'd4', partner: 'Comparateur de vols (exemple)', title: 'Vols au départ de YUL', category: 'Voyage', area: 'Lien partenaire', discount: 'Meilleurs prix', code: 'LIEN', tier: 'free', url: '#' },
  { id: 'd5', partner: 'Équipement rando (exemple)', title: 'Tout le plein air', category: 'Plein air', area: 'En ligne', discount: '-12 %', code: 'JOJOHIKE', tier: 'free' },
  { id: 'd6', partner: 'Escape game (exemple)', title: 'Salles 2 à 6 joueurs', category: 'Activités', area: 'Mile End', discount: '-15 %', code: 'JOJOESCAPE', tier: 'free', isNew: true },

  // --- Premium (rabais exclusifs, non commissionnés) ---
  { id: 'd7', partner: 'Musée interactif (exemple)', title: 'Entrée famille', category: 'Activités', area: 'Centre-ville', discount: '2 pour 1', code: 'JOJO2X1', tier: 'premium', isNew: true },
  { id: 'd8', partner: 'Café-jeux (exemple)', title: 'Soirée jeux de société', category: 'Restos', area: 'NDG', discount: '-25 %', code: 'JOJOCAFE', tier: 'premium' },
  { id: 'd9', partner: 'Trampoline park (exemple)', title: 'Saut libre 90 min', category: 'Activités', area: 'Laval', discount: '-30 %', code: 'JOJOJUMP', tier: 'premium', expires: '15 nov.' },
  { id: 'd10', partner: 'Ferme pédagogique (exemple)', title: 'Autocueillette et animaux', category: 'Plein air', area: 'Montérégie', discount: '-5 $', code: 'JOJOFERME', tier: 'premium' },
  { id: 'd11', partner: 'Boulangerie brunch (exemple)', title: 'Viennoiseries et café', category: 'Restos', area: 'Rosemont', discount: '-20 %', code: 'JOJOBRUNCH', tier: 'premium' },
  { id: 'd12', partner: 'Spa nordique (exemple)', title: 'Accès thermal', category: 'Bien-être', area: 'Estrie', discount: '-18 %', code: 'JOJOSPA', tier: 'premium' },
  { id: 'd13', partner: 'Ciné-club enfants (exemple)', title: 'Séances du dimanche', category: 'Activités', area: 'Villeray', discount: '-3 $', code: 'JOJOCINE', tier: 'premium' },
  { id: 'd14', partner: 'Auberge boutique (exemple)', title: 'Nuitée en Charlevoix', category: 'Voyage', area: 'Charlevoix', discount: '-20 %', code: 'JOJOGETAWAY', tier: 'premium', isNew: true },
]

export const GUIDES: Guide[] = [
  { id: 'g1', title: '100 activités gratuites à Montréal', subtitle: 'Parcs, festivals, musées gratuits et sorties à 0 $', cover: '/img/guide-gratuit.png', pages: 42, kind: 'Activités', price: 9.99, premiumPrice: 0 },
  { id: 'g2', title: "L'hiver en famille", subtitle: 'Patinoires, glissades, cabanes à sucre et sorties au chaud', cover: '/img/guide-hiver.png', pages: 36, kind: 'Activités', price: 9.99, premiumPrice: 0 },
  { id: 'g3', title: 'Road trip en Charlevoix', subtitle: 'Itinéraire de 4 jours, adresses et budget détaillé', cover: '/img/guide-roadtrip.png', pages: 28, kind: 'Voyage', price: 14.99, premiumPrice: 4.99 },
  { id: 'g4', title: 'Québec en 48 heures', subtitle: 'Le Vieux-Québec, les bonnes tables et les incontournables', cover: '/img/guide-quebec.png', pages: 24, kind: 'Voyage', price: 12.99, premiumPrice: 2.99 },
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
