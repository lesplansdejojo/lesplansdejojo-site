import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowRight, BookOpen, Crown, Radar, Smartphone, Sparkles, Ticket } from 'lucide-react'
import { DealCard, GuideCard } from '@/components/Cards'
import { DEALS, GUIDES, PLANS, cdn, money } from '@/data/fixtures'
import { useMembership } from '@/lib/membership'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const { premium } = useMembership()
  const nouveautes = DEALS.filter((d) => d.isNew)
  const nbFree = DEALS.filter((d) => d.tier === 'free').length
  const nbPremium = DEALS.filter((d) => d.tier === 'premium').length
  const premiumPlan = PLANS.find((p) => p.id === 'premium')!

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <img
          src={cdn('/img/hero-montreal.png', 1600)}
          srcSet={`${cdn('/img/hero-montreal.png', 800)} 800w, ${cdn('/img/hero-montreal.png', 1600)} 1600w`}
          sizes="100vw"
          alt=""
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-nuit/70 via-nuit/75 to-nuit" />
        <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-14 md:pb-24 md:pt-24">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-neon/40 bg-nuit/60 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-rose backdrop-blur">
            <Radar size={14} className="text-neon" /> Ton radar à bons plans à Montréal
          </p>
          <h1 className="max-w-3xl text-5xl font-semibold leading-[1.02] md:text-7xl">
            Sortir plus. <span className="neon flicker">Payer moins.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-rose/90 md:text-xl">
            Activités, restos, plein air et voyages : Jojo déniche les codes promo et les rabais pour toute la communauté.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/rabais"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-neon px-7 py-3.5 font-semibold text-white shadow-[0_0_24px_rgb(255_79_154/0.55)] transition hover:bg-neon-doux"
            >
              Voir les codes promo <ArrowRight size={18} />
            </Link>
            {!premium && (
              <Link
                to="/premium"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-or/60 bg-nuit/60 px-7 py-3.5 font-semibold text-or backdrop-blur transition hover:bg-or hover:text-or-fonce"
              >
                <Crown size={18} /> Découvrir Premium
              </Link>
            )}
          </div>

          <dl className="mt-12 grid max-w-xl grid-cols-3 gap-3">
            {[
              { v: 'Des milliers', l: 'de membres' },
              { v: String(nbFree), l: 'codes gratuits' },
              { v: String(nbPremium), l: 'rabais exclusifs' },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl border border-ligne/80 bg-nuit/60 px-3 py-3 backdrop-blur">
                <dt className="sr-only">{s.l}</dt>
                <dd className="font-display text-xl font-semibold text-creme md:text-2xl">{s.v}</dd>
                <dd className="text-xs text-brume">{s.l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Nouveautés */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <SectionTitle
          icon={<Sparkles size={18} />}
          kicker="Cette semaine"
          title="Les nouveaux plans de Jojo"
          link={{ to: '/rabais', label: 'Tous les rabais' }}
        />
        <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 lg:grid-cols-4">
          {nouveautes.map((d) => (
            <div key={d.id} className="w-[85%] shrink-0 snap-start sm:w-[55%] md:w-auto">
              <DealCard deal={d} />
            </div>
          ))}
        </div>
      </section>

      {/* Gratuit vs Premium */}
      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-ligne bg-nuit-2 p-6 md:p-8">
            <Ticket className="text-neon" size={28} />
            <h2 className="mt-4 text-2xl font-semibold">Gratuit pour la communauté</h2>
            <p className="mt-2 text-brume">
              Les codes promo de mes partenaires sont accessibles à tout le monde. Tu les copies, tu économises, c'est tout.
            </p>
            <Link to="/rabais" className="mt-5 inline-flex items-center gap-1.5 font-semibold text-neon-doux hover:text-neon">
              Voir les codes gratuits <ArrowRight size={16} />
            </Link>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-or/40 bg-gradient-to-br from-[#3a2a12] via-nuit-2 to-nuit-2 p-6 md:p-8">
            <Crown className="text-or" size={28} />
            <h2 className="mt-4 text-2xl font-semibold">Premium, pour aller plus loin</h2>
            <p className="mt-2 text-brume">
              Des rabais exclusifs négociés juste pour les membres, plus mes guides d'activités et de voyage gratuits ou à petit prix.
            </p>
            <p className="mt-4 font-display text-3xl font-semibold text-or">
              {money(premiumPlan.price)} <span className="text-base font-normal text-brume">/ mois</span>
            </p>
            <Link
              to="/premium"
              className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-or px-5 py-2.5 font-semibold text-or-fonce"
            >
              {premium ? 'Mon abonnement' : 'Devenir Premium'} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Guides */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <SectionTitle
          icon={<BookOpen size={18} />}
          kicker="Guides de Jojo"
          title="Planifie tes sorties et tes escapades"
          link={{ to: '/guides', label: 'Tous les guides' }}
        />
        <div className="grid gap-4 md:grid-cols-2">
          {GUIDES.slice(0, 2).map((g) => (
            <GuideCard key={g.id} guide={g} />
          ))}
        </div>
      </section>

      {/* Installer l'app */}
      <section className="mx-auto max-w-6xl px-4 pb-8">
        <div className="neon-box flex flex-col items-start gap-4 rounded-3xl bg-nuit-2 p-6 md:flex-row md:items-center md:p-8">
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-nuit-3 text-neon">
            <Smartphone size={28} />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Garde Jojo dans ta poche</h2>
            <p className="mt-1 text-brume">
              Sur iPhone : touche <b className="text-creme">Partager</b> puis <b className="text-creme">Sur l'écran d'accueil</b>.
              Sur Android : menu <b className="text-creme">⋮</b> puis <b className="text-creme">Installer l'application</b>.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

function SectionTitle({
  icon,
  kicker,
  title,
  link,
}: {
  icon: React.ReactNode
  kicker: string
  title: string
  link: { to: '/rabais' | '/guides'; label: string }
}) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        <p className="mb-1 inline-flex items-center gap-1.5 text-sm font-semibold text-neon">
          {icon} {kicker}
        </p>
        <h2 className="text-2xl font-semibold md:text-3xl">{title}</h2>
      </div>
      <Link to={link.to} className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-neon-doux hover:text-neon sm:inline-flex">
        {link.label} <ArrowRight size={15} />
      </Link>
    </div>
  )
}
