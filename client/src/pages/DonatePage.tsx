import { Button, Surface } from '@/components/ui'
import { useTheme } from '@/contexts/ThemeContext'

const CoffeeIcon = () => (
  <svg className="h-9 w-9" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M4 4h12a1 1 0 0 1 1 1v2h1a4 4 0 0 1 0 8h-1.1A7 7 0 0 1 10 21H9a7 7 0 0 1-7-7V6a2 2 0 0 1 2-2Zm13 5v4h1a2 2 0 0 0 0-4h-1ZM4 6v8a5 5 0 0 0 5 5h1a5 5 0 0 0 5-5V6H4Z" />
  </svg>
)

const HeartIcon = () => (
  <svg className="h-9 w-9" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 21.35 10.55 20.03C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08A6 6 0 0 1 16.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35Z" />
  </svg>
)

export default function DonatePage() {
  const { theme } = useTheme()
  const badges = [
    { label: '100% free forever', color: theme.green },
    { label: 'No ads or tracking', color: theme.yellow },
    { label: 'Your data, your device', color: theme.accent },
  ]

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold tracking-tight text-text">Support Ledger</h1>
        <p className="text-sm mt-0.5 text-text2">
          I build privacy-first, self-hosted tools - no subscriptions, no ads, no tracking. Your data stays yours.
        </p>
      </div>

      <Surface className="p-6 mb-5">
        <h2 className="text-base font-bold mb-1 text-text">What you get</h2>
        <p className="text-xs mb-5 text-text2">Everything Ledger is and always will be.</p>
        <div className="flex flex-wrap gap-2.5">
          {badges.map(badge => (
            <span
              key={badge.label}
              className="rounded-lg px-3 py-1.5 text-sm font-medium"
              style={{ background: `${badge.color}15`, color: badge.color, border: `1px solid ${badge.color}25` }}
            >
              {badge.label}
            </span>
          ))}
        </div>
      </Surface>

      <Surface className="p-6 mb-5">
        <h2 className="text-base font-bold mb-1 text-text">Donate</h2>
        <p className="text-xs mb-5 text-text2">Every contribution keeps Ledger free for everyone.</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl p-6 text-center" style={{ background: theme.surface2, border: `1px solid ${theme.border}` }}>
            <div className="mb-3 flex justify-center text-accent"><CoffeeIcon /></div>
            <h3 className="text-base font-bold leading-snug text-text">Buy Me a Coffee</h3>
            <p className="mb-4 text-sm text-text2">One-time donation</p>
            <Button variant="primary" size="lg" fullWidth onClick={() => window.open('https://buymeacoffee.com/larsmikki', '_blank')}>
              Buy Me a Coffee
            </Button>
          </div>
          <div className="rounded-xl p-6 text-center" style={{ background: theme.surface2, border: `1px solid ${theme.border}` }}>
            <div className="mb-3 flex justify-center text-accent"><HeartIcon /></div>
            <h3 className="text-base font-bold leading-snug text-text">PayPal</h3>
            <p className="mb-4 text-sm text-text2">Secure donation</p>
            <Button variant="primary" size="lg" fullWidth onClick={() => window.open('https://paypal.me/larsmikki', '_blank')}>
              Donate via PayPal
            </Button>
          </div>
        </div>
      </Surface>

      <Surface className="p-6 text-center">
        <h2 className="text-base font-bold mb-1 text-text">Thank you</h2>
        <p className="text-xs text-text2">Every bit of support keeps Ledger free for everyone.</p>
      </Surface>
    </div>
  )
}
