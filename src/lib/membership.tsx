import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'

// Statut Premium de démonstration, mémorisé sur l'appareil.
// Sera remplacé par le vrai compte membre + abonnement Stripe (voir PLAN.md).
type Membership = {
  premium: boolean
  setPremium: (v: boolean) => void
  toast: (message: string) => void
  copy: (code: string) => void
}

const Ctx = createContext<Membership | null>(null)
const KEY = 'jojo-demo-premium'

export function MembershipProvider({ children }: { children: React.ReactNode }) {
  const [premium, setPremiumState] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    setPremiumState(localStorage.getItem(KEY) === '1')
  }, [])

  const setPremium = useCallback((v: boolean) => {
    setPremiumState(v)
    localStorage.setItem(KEY, v ? '1' : '0')
  }, [])

  const toast = useCallback((m: string) => {
    setMessage(m)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setMessage(null), 2000)
  }, [])

  const copy = useCallback(
    (code: string) => {
      navigator.clipboard?.writeText(code).catch(() => {})
      toast(`Code copié : ${code}`)
    },
    [toast],
  )

  return (
    <Ctx.Provider value={{ premium, setPremium, toast, copy }}>
      {children}
      <div
        role="status"
        aria-live="polite"
        className={`fixed left-1/2 z-50 -translate-x-1/2 rounded-full bg-creme px-5 py-2.5 font-semibold text-nuit shadow-lg transition-all duration-200 bottom-[calc(6rem+env(safe-area-inset-bottom,0px))] md:bottom-8 ${
          message ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0'
        }`}
      >
        {message}
      </div>
    </Ctx.Provider>
  )
}

export function useMembership() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useMembership doit être utilisé dans MembershipProvider')
  return v
}
