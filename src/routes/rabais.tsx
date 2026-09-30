import { Link, createFileRoute } from '@tanstack/react-router'
import { Crown, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { DealCard } from '@/components/Cards'
import { CATEGORIES, DEALS } from '@/data/fixtures'
import type { Category, Tier } from '@/data/fixtures'
import { useMembership } from '@/lib/membership'

export const Route = createFileRoute('/rabais')({
  head: () => ({ meta: [{ title: 'Codes promo · Les Plans de Jojo' }] }),
  component: Rabais,
})

const TIERS: { id: 'all' | Tier; label: string }[] = [
  { id: 'all', label: 'Tout' },
  { id: 'free', label: 'Gratuit' },
  { id: 'premium', label: 'Premium' },
]

function Rabais() {
  const { premium } = useMembership()
  const [tier, setTier] = useState<'all' | Tier>('all')
  const [cat, setCat] = useState<Category | null>(null)
  const [q, setQ] = useState('')

  const list = useMemo(() => {
    const s = q.trim().toLowerCase()
    return DEALS.filter(
      (d) =>
        (tier === 'all' || d.tier === tier) &&
        (!cat || d.category === cat) &&
        (!s || `${d.partner} ${d.title} ${d.area} ${d.category}`.toLowerCase().includes(s)),
    )
  }, [tier, cat, q])

  const locked = DEALS.filter((d) => d.tier === 'premium').length

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-4xl font-semibold md:text-5xl">
        Les codes <span className="neon">promo</span>
      </h1>
      <p className="mt-2 text-brume">Copie le code, utilise-le chez le partenaire, économise.</p>

      {!premium && (
        <Link
          to="/premium"
          className="mt-6 flex items-center justify-between gap-4 rounded-2xl bg-or px-4 py-3.5 text-or-fonce transition hover:brightness-105"
        >
          <span>
            <b className="block font-display text-lg">{locked} rabais exclusifs à débloquer</b>
            <span className="text-sm opacity-80">Passe en Premium pour voir tous les codes.</span>
          </span>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-or-fonce px-4 py-2 text-sm font-semibold text-or">
            <Crown size={15} /> Débloquer
          </span>
        </Link>
      )}

      <div className="sticky top-16 z-30 -mx-4 mt-6 space-y-3 bg-nuit/90 px-4 py-3 backdrop-blur-md">
        <label className="relative block">
          <span className="sr-only">Rechercher un rabais</span>
          <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brume" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Resto, spa, Laval, trampoline…"
            className="w-full rounded-full border border-ligne bg-nuit-2 py-3 pl-11 pr-4 text-creme placeholder:text-brume/70 focus:border-neon focus:outline-none"
          />
        </label>

        <div className="no-scrollbar flex gap-2 overflow-x-auto" role="group" aria-label="Filtrer par type">
          {TIERS.map((t) => (
            <Chip key={t.id} active={tier === t.id} onClick={() => setTier(t.id)}>
              {t.label}
            </Chip>
          ))}
          <span className="mx-1 w-px shrink-0 bg-ligne" aria-hidden />
          {CATEGORIES.map((c) => (
            <Chip key={c} active={cat === c} onClick={() => setCat(cat === c ? null : c)}>
              {c}
            </Chip>
          ))}
        </div>
      </div>

      <p className="mb-3 mt-2 text-sm text-brume">
        {list.length} {list.length > 1 ? 'offres' : 'offre'}
      </p>

      {list.length ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((d) => (
            <DealCard key={d.id} deal={d} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-ligne p-10 text-center text-brume">
          Aucun rabais ne correspond. Essaie une autre recherche!
        </div>
      )}
    </div>
  )
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition ${
        active ? 'border-neon bg-neon text-white' : 'border-ligne text-rose hover:border-neon/60'
      }`}
    >
      {children}
    </button>
  )
}
