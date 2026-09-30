import { Link, createFileRoute } from '@tanstack/react-router'
import { Crown } from 'lucide-react'
import { useState } from 'react'
import { GuideCard } from '@/components/Cards'
import { GUIDES } from '@/data/fixtures'
import type { Guide } from '@/data/fixtures'
import { useMembership } from '@/lib/membership'

export const Route = createFileRoute('/guides')({
  head: () => ({ meta: [{ title: 'Guides · Les Plans de Jojo' }] }),
  component: Guides,
})

const KINDS: ('Tous' | Guide['kind'])[] = ['Tous', 'Activités', 'Voyage']

function Guides() {
  const { premium } = useMembership()
  const [kind, setKind] = useState<(typeof KINDS)[number]>('Tous')
  const list = GUIDES.filter((g) => kind === 'Tous' || g.kind === kind)

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-4xl font-semibold md:text-5xl">
        Les guides de <span className="neon">Jojo</span>
      </h1>
      <p className="mt-2 max-w-2xl text-brume">
        Mes meilleures adresses, itinéraires et astuces, réunis dans des guides à télécharger sur ton téléphone.
      </p>

      <div
        className={`mt-6 flex items-center justify-between gap-4 rounded-2xl border px-4 py-3.5 ${
          premium ? 'border-or/40 bg-nuit-2' : 'border-or/40 bg-gradient-to-r from-[#3a2a12] to-nuit-2'
        }`}
      >
        <p className="flex items-center gap-3">
          <Crown className="shrink-0 text-or" size={22} />
          <span>
            {premium
              ? 'Ton prix Premium est appliqué sur tous les guides.'
              : "Les membres Premium téléchargent les guides d'activités gratuitement et les guides voyage à petit prix."}
          </span>
        </p>
        {!premium && (
          <Link to="/premium" className="shrink-0 rounded-full bg-or px-4 py-2 text-sm font-semibold text-or-fonce">
            En savoir plus
          </Link>
        )}
      </div>

      <div className="mt-6 flex gap-2" role="group" aria-label="Type de guide">
        {KINDS.map((k) => (
          <button
            key={k}
            type="button"
            aria-pressed={kind === k}
            onClick={() => setKind(k)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
              kind === k ? 'border-neon bg-neon text-white' : 'border-ligne text-rose hover:border-neon/60'
            }`}
          >
            {k}
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((g) => (
          <GuideCard key={g.id} guide={g} />
        ))}
      </div>
    </div>
  )
}
