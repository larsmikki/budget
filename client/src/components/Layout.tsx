import { Link, Outlet, useLocation } from 'react-router-dom'
import { useTheme } from '@/contexts/ThemeContext'
import { useBudget } from '@/contexts/BudgetContext'
import Footer from '@/components/Footer'
import { Pill } from '@/components/ui'

const LogoMark = () => (
  <img src="/favicon.svg" width={28} height={28} alt="Spendr" className="shrink-0" />
)

const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
  </svg>
)

export default function Layout() {
  const { theme } = useTheme()
  const { state } = useBudget()
  const location = useLocation()
  const isSettings = location.pathname === '/settings'
  const showFictiveBadge = !!state.settings.fictiveAmounts

  return (
    <div className="min-h-screen flex flex-col" style={{ background: theme.bg, color: theme.text }}>
      <header
        className="sticky top-0 z-40 backdrop-blur-md"
        style={{ background: `${theme.surface}dd`, borderBottom: `1px solid ${theme.border}` }}
      >
        <div className="mx-auto px-4 sm:px-8 h-16 flex items-center justify-between" style={{ maxWidth: 1152 }}>
          <Link to="/" className="flex items-center gap-2.5" style={{ textDecoration: 'none' }}>
            <LogoMark />
            <span className="text-xl font-extrabold tracking-tight gradient-text select-none">Spendr</span>
          </Link>
          <nav className="flex items-center gap-2">
            {showFictiveBadge && (
              <Pill active={false} style={{ color: theme.yellow, borderColor: `${theme.yellow}40`, background: `${theme.yellow}15` }}>
                Demo mode
              </Pill>
            )}
            <Link
              to="/settings"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150"
              style={
                isSettings
                  ? { background: `${theme.accent}22`, color: theme.accent }
                  : { color: theme.text2 }
              }
            >
              <SettingsIcon />
              <span className="hidden sm:inline">Settings</span>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
