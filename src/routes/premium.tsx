import { createFileRoute } from '@tanstack/react-router'
import { Check, ChevronDown, Crown, Sparkles } from 'lucide-react'
import { PLANS, money } from '@/data/fixtures'
import { useMembership } from '@/lib/membership'

export const Route = createFileRoute('/premium')({
  head: () => ({ meta: [{ title: 'Premium · Les Plans de Jojo' }] }),
  component: Premium,
})

const FAQ = [
  {
    q: "Pourquoi certains codes sont gratuits et d'autres Premium?",
    a: "Les codes gratuits viennent de partenaires qui soutiennent la communauté. Les rabais Premium sont des offres exclusives que je négocie juste pour les membres : ton abonnement me permet de continuer à les dénicher.",
  },
  {
    q: 'Est-ce que je peux annuler en tout temps?',
    a: "Oui. L'abonnement est mensuel, sans engagement. Tu gardes l'accès jusqu'à la fin du mois payé.",
  },
  {
    q: 'Comment je télécharge les guides?',
    a: "Depuis l'onglet Guides. Les guides d'activités sont gratuits pour les membres Premium et les guides voyage sont offerts à petit prix. Ils restent dans ton compte.",
  },
  {
    q: "Faut-il télécharger l'app dans l'App Store?",
    a: "Non! Ouvre le site sur ton téléphone et ajoute-le à ton écran d'accueil : il s'utilise comme une vraie app.",
  },
]

function Premium() {
  const { premium, setPremium, toast } = useMembership()

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="text-center">
        <p className="inline-flex items-center gap-1.5 rounded-full bg-or/15 px-3 py-1 text-sm font-semibold text-or">
          <Sparkles size={15} /> Rabais exclusifs + guides
        </p>
        <h1 className="mt-4 text-4xl font-semibold md:text-6xl">
          Deviens <span className="text-or drop-shadow-[0_0_18px_rgb(255_200_87/0.45)]">Premium</span>
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-lg text-brume">
          Débloque les rabais que je réserve aux membres et télécharge mes guides gratuitement ou à petit prix.
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {PLANS.map((p) => {
          const isPremium = p.id === 'premium'
          const current = isPremium === premium
          return (
            <div
              key={p.id}
              className={`relative flex flex-col rounded-3xl border p-6 md:p-8 ${
                isPremium
                  ? 'border-or/60 bg-gradient-to-br from-[#3a2a12] via-nuit-2 to-nuit-2 shadow-[0_0_40px_rgb(255_200_87/0.12)]'
                  : 'border-ligne bg-nuit-2'
              }`}
            >
              {isPremium && (
                <span className="absolute -top-3 right-6 rounded-full bg-or px-3 py-1 text-xs font-bold text-or-fonce">
                  Le plus populaire
                </span>
              )}
              <h2 className="flex items-center gap-2 text-2xl font-semibold">
                {isPremium && <Crown className="text-or" size={22} />} {p.name}
              </h2>
              <p className="mt-1 text-brume">{p.tagline}</p>
              <p className="mt-6">
                <span className={`font-display text-5xl font-semibold ${isPremium ? 'text-or' : 'text-creme'}`}>
                  {money(p.price)}
                </span>{' '}
                <span className="text-brume">{p.period}</span>
              </p>
              <ul className="mt-6 space-y-3">
                {p.perks.map((perk) => (
                  <li key={perk} className="flex gap-2.5">
                    <Check size={20} className={`mt-0.5 shrink-0 ${isPremium ? 'text-or' : 'text-neon'}`} />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                {current ? (
                  <p className="rounded-full border border-ligne py-3 text-center font-semibold text-brume">Ton forfait actuel</p>
                ) : isPremium ? (
                  <button
                    type="button"
                    onClick={() => toast('Le paiement sécurisé sera branché ici (Stripe)')}
                    className="w-full rounded-full bg-or py-3.5 font-semibold text-or-fonce transition hover:brightness-105 active:scale-[0.98]"
                  >
                    M'abonner pour {money(p.price)}/mois
                  </button>
                ) : (
                  <p className="py-3 text-center text-sm text-brume">Toujours inclus, même sans abonnement</p>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <section className="mx-auto mt-16 max-w-3xl">
        <h2 className="mb-5 text-center text-3xl font-semibold">Questions fréquentes</h2>
        <div className="space-y-3">
          {FAQ.map((f) => (
            <details key={f.q} className="group rounded-2xl border border-ligne bg-nuit-2 px-5 py-4 open:border-neon/50">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold [&::-webkit-details-marker]:hidden">
                {f.q}
                <ChevronDown size={18} className="shrink-0 text-neon transition group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-brume">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <p className="mt-12 text-center text-sm text-brume">
        Aperçu :{' '}
        <button
          type="button"
          onClick={() => {
            setPremium(!premium)
            toast(premium ? 'Version gratuite affichée' : 'Version Premium affichée')
          }}
          className="font-semibold text-neon-doux underline underline-offset-4 hover:text-neon"
        >
          {premium ? 'revenir à la version gratuite' : "voir l'app comme un membre Premium"}
        </button>
      </p>
    </div>
  )
}
