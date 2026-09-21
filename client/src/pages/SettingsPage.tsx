import { useRef } from 'react'
import ThemePicker from '@/components/ThemePicker'
import { useBudget } from '@/contexts/BudgetContext'
import { migrateState } from '@/utils'
import type { BudgetState } from '@/types'
import { Button, Select, Surface, useToast } from '@/components/ui'

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean
  onChange: (checked: boolean) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      aria-pressed={checked}
      className="relative h-6 w-11 shrink-0 rounded-full transition-colors"
      style={{
        background: checked ? 'var(--theme-accent)' : 'var(--theme-surface2)',
        border: `1px solid ${checked ? 'var(--theme-accent)' : 'var(--theme-border)'}`,
      }}
    >
      <span
        className="absolute top-0.5 h-[18px] w-[18px] rounded-full bg-white shadow-sm transition-[left]"
        style={{ left: checked ? 20 : 2 }}
      />
    </button>
  )
}

export default function SettingsPage() {
  const { state, updateState, setState } = useBudget()
  const { addToast } = useToast()
  const importRef = useRef<HTMLInputElement>(null)

  const updateSettings = (patch: Partial<typeof state.settings>) => {
    updateState({ settings: { ...state.settings, ...patch } })
  }

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `budget-${state.year}.json`
    a.click()
    URL.revokeObjectURL(url)
    addToast('Export ready', 'success')
  }

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result as string) as Partial<BudgetState>
        if (!data.posts) throw new Error('Missing posts')
        setState(migrateState(data))
        addToast('Budget imported', 'success')
      } catch {
        addToast('Invalid JSON file', 'error')
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold tracking-tight text-text">Settings</h1>
        <p className="text-sm mt-0.5 text-text2">Customize Budget to your preferences.</p>
      </div>

      <Surface className="p-6 mb-5">
        <h2 className="text-base font-bold mb-1 text-text">Themes</h2>
        <p className="text-xs mb-5 text-text2">Choose how Budget looks to you.</p>
        <ThemePicker onSelect={name => updateSettings({ themeName: name })} />
      </Surface>

      <Surface className="p-6 mb-5">
        <h2 className="text-base font-bold mb-1 text-text">Appearance</h2>
        <p className="text-xs mb-5 text-text2">Show or hide interface elements.</p>
        <div className="space-y-4">
          <label className="flex items-center justify-between gap-4 text-sm font-medium text-text">
            <span>Hide decimals</span>
            <Toggle checked={!!state.settings.hideDecimals} onChange={hideDecimals => updateSettings({ hideDecimals })} />
          </label>
          <label className="flex items-center justify-between gap-4 text-sm font-medium text-text">
            <span>
              Fictive amounts <span className="font-normal text-text2">(demo mode)</span>
            </span>
            <Toggle checked={!!state.settings.fictiveAmounts} onChange={fictiveAmounts => updateSettings({ fictiveAmounts })} />
          </label>
        </div>
      </Surface>

      <Surface className="p-6 mb-5">
        <h2 className="text-base font-bold mb-1 text-text">Layout</h2>
        <p className="text-xs mb-5 text-text2">Set your preferred currency and number style.</p>
        <label className="block text-xs uppercase tracking-wider font-semibold text-text2 mb-1">Currency</label>
        <Select value={state.settings.locale || ''} onChange={e => updateSettings({ locale: e.target.value || undefined })}>
          <option value="">Default (6.250,00)</option>
          <option value="en-US:USD">$ USD (1,000.00)</option>
          <option value="en-GB:GBP">GBP (1,000.00)</option>
          <option value="de-DE:EUR">EUR German (1.000,00)</option>
          <option value="fr-FR:EUR">EUR French (1 000,00)</option>
          <option value="nb-NO:NOK">kr NOK (1 000,00)</option>
          <option value="sv-SE:SEK">kr SEK (1 000,00)</option>
          <option value="da-DK:DKK">kr DKK (1.000,00)</option>
          <option value="ja-JP:JPY">JPY (1,000)</option>
          <option value="de-CH:CHF">CHF (1&apos;000.00)</option>
          <option value="pl-PL:PLN">PLN (1 000,00)</option>
        </Select>
      </Surface>

      <Surface className="p-6">
        <h2 className="text-base font-bold mb-1 text-text">Data</h2>
        <p className="text-xs mb-5 text-text2">Export or import your data as a JSON backup.</p>
        <div className="flex flex-wrap gap-3">
          <Button onClick={handleExport}>Export data</Button>
          <input ref={importRef} type="file" accept=".json" className="hidden" onChange={handleImport} />
          <Button onClick={() => importRef.current?.click()}>Import data</Button>
        </div>
      </Surface>
    </div>
  )
}
