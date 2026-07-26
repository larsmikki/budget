# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Running the Application

```bash
npm run dev        # Start both client (port 3000) and server (port 3001)
npm run build      # Production build
npm start          # Start production server (port 3000)
```

**Docker:**
```bash
docker compose up      # Start with persistent volume (port 3000)
docker build -t ledger .  # Build image
```

## Architecture

Monorepo with client/server workspaces — same structure as other apps (prompty, linkpad, etc.).

- **`server/`** — Express + TypeScript. Two API endpoints: `GET /api/state` and `PUT /api/state`. Persists data to `data/budget.json`.
- **`client/`** — React 19 + Vite 8 + Tailwind CSS 4 + TypeScript SPA.
- **`favicon.svg`** — App icon (also at `client/resources/favicon.svg`).

### State Model

```ts
{
  year: number
  sections: Section[]       // { id, name, type: 'income'|'expense', color? }
  posts: Post[]             // { id, name, amount, frequency, startMonth, sectionId, customMonths, icon? }
  collapsed: Record<string, boolean>
  settings: { themeName?, locale?, hideDecimals?, fictiveAmounts? }
}
```

**Frequencies**: `monthly | quarterly | biannual | yearly | custom`

### Key Files

| Purpose | File |
|---|---|
| App shell / routing | `client/src/App.tsx` |
| Header / nav / footer | `client/src/components/Layout.tsx` |
| Footer | `client/src/components/Footer.tsx` |
| Main budget page | `client/src/pages/HomePage.tsx` |
| Settings page | `client/src/pages/SettingsPage.tsx` |
| Donate page | `client/src/pages/DonatePage.tsx` |
| Budget section + table | `client/src/components/BudgetSection.tsx` |
| Post add/edit modal | `client/src/components/PostModal.tsx` |
| Section add/edit modal | `client/src/components/SectionModal.tsx` |
| Quick setup modal | `client/src/components/QuickSetupModal.tsx` |
| Theme definitions | `client/src/contexts/ThemeContext.tsx` |
| Budget state / API | `client/src/contexts/BudgetContext.tsx` |
| Utility functions | `client/src/utils.ts` (getMonthlyAmounts, fmt, fictiveAmt) |
| Constants | `client/src/data/constants.ts` (MONTHS, ICONS, QUICK_TEMPLATES) |
| Global CSS / Tailwind | `client/src/index.css` |

### Data Flow

User action → `updateState()` → localStorage (immediate) + `PUT /api/state` (debounced 300ms)

On load: `GET /api/state` → BudgetContext → render

### Styling Notes

- Theme colors applied via CSS custom properties (`--bg`, `--surface`, `--accent`, `--green`, `--red`, etc.) on `:root` via ThemeContext
- The budget table uses these CSS variables directly in `index.css` classes
- Settings/Donate pages use `max-w-2xl mx-auto` — budget tables must NOT be constrained (they need full width + horizontal scroll)
- Theme colors on React components use inline `style={{}}` props, not Tailwind color classes

## Tests

`npm test` runs Vitest for both workspaces (server API + static-serving tests in `server/src/app.test.ts`, client unit tests). UI changes are additionally verified manually in the browser.

## Notes

- The `data/` directory is auto-created on first write; excluded from Docker image.
