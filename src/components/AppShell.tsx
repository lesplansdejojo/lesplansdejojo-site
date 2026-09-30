import { Link } from '@tanstack/react-router'
import { BookOpen, Crown, Home, Ticket } from 'lucide-react'
import { useMembership } from '@/lib/membership'

const NAV = [
  { to: '/', label: 'Accueil', icon: Home },
  { to: '/rabais', label: 'Rabais', icon: Ticket },
  { to: '/guides', label: 'Guides', icon: BookOpen },
  { to: '/premium', label: 'Premium', icon: Crown },
] as const

export function AppShell({ children }: { children: React.ReactNode }) {
  const { premium } = useMembership()

  return (
    <div className="min-h-screen grain">
      <header className="sticky top-0 z-40 border-b border-ligne/60 bg-nuit/85 pt-[env(safe-area-inset-top,0px)] backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
          <Link to="/" aria-label="Les Plans de Jojo, accueil" className="shrink-0">
            <img src="/logo.png" alt="Les Plans de Jojo" width={546} height={230} className="h-11 w-auto" />
          </Link>

          <nav aria-label="Navigation principale" className="hidden items-center gap-1 md:flex">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={{ exact: n.to === '/' }}
                className="rounded-full px-4 py-2 text-sm font-medium text-brume transition hover:text-creme data-[status=active]:bg-nuit-3 data-[status=active]:text-rose"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          {premium ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-or px-3 py-1.5 text-xs font-bold text-or-fonce">
              <Crown size={14} /> Membre Premium
            </span>
          ) : (
            <Link
              to="/premium"
              className="inline-flex items-center gap-1.5 rounded-full bg-neon px-4 py-2 text-sm font-semibold text-white shadow-[0_0_18px_rgb(255_79_154/0.45)] transition hover:bg-neon-doux"
            >
              <Crown size={15} /> Devenir Premium
            </Link>
          )}
        </div>
      </header>

      <main className="pb-28 md:pb-16">{children}</main>

      <footer className="hidden border-t border-ligne/60 py-10 text-center text-sm text-brume md:block">
        <p>Les Plans de Jojo · Ton radar à bons plans à Montréal</p>
      </footer>

      <nav
        aria-label="Navigation"
        className="pb-safe fixed inset-x-0 bottom-0 z-40 border-t border-ligne bg-nuit-2/95 backdrop-blur-md md:hidden"
      >
        <ul className="mx-auto grid max-w-md grid-cols-4">
          {NAV.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <Link
                to={to}
                activeOptions={{ exact: to === '/' }}
                className="group flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium text-brume data-[status=active]:text-neon"
              >
                <Icon size={22} className="transition group-data-[status=active]:drop-shadow-[0_0_6px_rgb(255_79_154/0.8)]" />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
