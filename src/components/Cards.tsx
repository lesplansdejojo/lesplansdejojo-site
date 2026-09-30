import { Link } from '@tanstack/react-router'
import { Clock, Copy, Crown, Download, ExternalLink, Lock, MapPin } from 'lucide-react'
import { cdn, money } from '@/data/fixtures'
import type { Deal, Guide } from '@/data/fixtures'
import { useMembership } from '@/lib/membership'

export function DealCard({ deal }: { deal: Deal }) {
  const { premium, copy } = useMembership()
  const locked = deal.tier === 'premium' && !premium
  const isLink = deal.code === 'LIEN'

  return (
    <article
      className={`relative flex flex-col rounded-2xl border p-4 transition ${
        locked
          ? 'border-dashed border-or/40 bg-nuit-2/70'
          : 'border-ligne bg-nuit-2 hover:border-neon/60'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="mb-1.5 flex flex-wrap items-center gap-1.5">
            {deal.tier === 'premium' ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-or px-2 py-0.5 text-[11px] font-bold text-or-fonce">
                <Crown size={11} /> Premium
              </span>
            ) : (
              <span className="rounded-full bg-nuit-3 px-2 py-0.5 text-[11px] font-semibold text-rose">Gratuit</span>
            )}
            {deal.isNew && (
              <span className="rounded-full border border-neon/50 px-2 py-0.5 text-[11px] font-semibold text-neon-doux">Nouveau</span>
            )}
          </div>
          <h3 className="truncate text-lg font-semibold leading-tight text-creme">{deal.partner}</h3>
          <p className="text-sm text-brume">{deal.title}</p>
        </div>
        <p className={`shrink-0 text-right font-display text-2xl font-semibold ${locked ? 'text-or' : 'neon'}`}>
          {deal.discount}
        </p>
      </div>

      <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-brume">
        <span className="inline-flex items-center gap-1"><MapPin size={12} />{deal.area}</span>
        <span>{deal.category}</span>
        {deal.expires && (
          <span className="inline-flex items-center gap-1"><Clock size={12} />Jusqu'au {deal.expires}</span>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 rounded-xl bg-nuit px-3 py-2.5">
        {isLink ? (
          <span className="text-sm text-brume">Offre par lien partenaire</span>
        ) : (
          <code
            aria-label={locked ? 'Code masqué, réservé aux membres Premium' : `Code ${deal.code}`}
            className={`font-semibold tracking-[0.12em] ${locked ? 'select-none text-brume blur-[6px]' : 'text-creme'}`}
          >
            {deal.code}
          </code>
        )}

        {locked ? (
          <Link
            to="/premium"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-or px-3.5 py-1.5 text-sm font-semibold text-or-fonce"
          >
            <Lock size={14} /> Débloquer
          </Link>
        ) : isLink ? (
          <a
            href={deal.url}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-neon px-3.5 py-1.5 text-sm font-semibold text-white"
          >
            Voir l'offre <ExternalLink size={14} />
          </a>
        ) : (
          <button
            type="button"
            onClick={() => copy(deal.code)}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-neon px-3.5 py-1.5 text-sm font-semibold text-white transition hover:bg-neon-doux active:scale-95"
          >
            <Copy size={14} /> Copier
          </button>
        )}
      </div>
    </article>
  )
}

export function GuideCard({ guide }: { guide: Guide }) {
  const { premium, toast } = useMembership()
  const price = premium ? guide.premiumPrice : guide.price

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-ligne bg-nuit-2 transition hover:border-neon/60">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={cdn(guide.cover, 640)}
          srcSet={`${cdn(guide.cover, 640)} 640w, ${cdn(guide.cover, 960)} 960w`}
          sizes="(min-width: 768px) 33vw, 100vw"
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-nuit-2 via-transparent" />
        <span className="absolute left-3 top-3 rounded-full bg-nuit/80 px-2.5 py-1 text-xs font-semibold text-rose backdrop-blur">
          Guide {guide.kind.toLowerCase()} · {guide.pages} pages
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4 pt-1">
        <h3 className="text-xl font-semibold leading-tight text-creme">{guide.title}</h3>
        <p className="mt-1 text-sm text-brume">{guide.subtitle}</p>

        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <div>
            {premium ? (
              <>
                <p className="text-xs text-brume line-through">{money(guide.price)}</p>
                <p className="font-display text-xl font-semibold text-or">{money(price)}</p>
              </>
            ) : (
              <>
                <p className="font-display text-xl font-semibold text-creme">{money(guide.price)}</p>
                <p className="text-xs text-or">
                  {guide.premiumPrice === 0 ? 'Gratuit' : money(guide.premiumPrice)} avec Premium
                </p>
              </>
            )}
          </div>
          <button
            type="button"
            onClick={() =>
              toast(price === 0 ? 'Le téléchargement sera branché ici' : 'Le paiement sera branché ici')
            }
            className="inline-flex items-center gap-1.5 rounded-full bg-neon px-4 py-2 text-sm font-semibold text-white transition hover:bg-neon-doux active:scale-95"
          >
            <Download size={15} /> {price === 0 ? 'Télécharger' : 'Acheter'}
          </button>
        </div>
      </div>
    </article>
  )
}
