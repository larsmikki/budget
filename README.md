# Budget

A self-hosted annual budget planner. Track income and expenses across custom sections with monthly breakdowns, running balances, and cumulative totals.

![Budget screenshot](screenshot.png)

## Getting started

Pick whichever install path matches your setup. Production deployments land on [http://localhost:3130](http://localhost:3130); the development server remains at [http://localhost:3000](http://localhost:3000). Data is persisted to `budget.json` (in the Docker volume or `./data/` for local installs).

### 1. Docker (Docker Desktop, NAS, or any Docker server)

Works on Synology, Unraid, TrueNAS, QNAP, Proxmox, or a plain Docker host.

```bash
docker run -d \
  --name budget \
  -e PORT=3130 \
  -p 3130:3130 \
  -v budget-data:/app/data \
  --restart unless-stopped \
  larsmikki/budget:latest
```

Or with Compose:

```yaml
services:
  budget:
    image: larsmikki/budget:latest
    container_name: budget
    environment:
      PORT: "3130"
    ports:
      - "3130:3130"
    volumes:
      - budget-data:/app/data
    restart: unless-stopped

volumes:
  budget-data:
```

To build the image locally instead: `docker build -t budget . && docker run -e PORT=3130 -p 3130:3130 -v budget-data:/app/data budget`.

> **Upgrading from Ledger?** The app is now published as `larsmikki/budget`. The image, container, and volume names have changed. If you used the Docker named volume, your data lives in `ledger-data` (`budget-planner-data`, `spendr-data`, or the original `budget-data` on older installations) - either keep that volume name in your compose file, or copy its contents into `budget-data` before switching (note: if a stale `budget-data` volume from a pre-Spendr install still exists on your host, back it up or rename it first to avoid mixing generations). The persisted `budget.json` format is unchanged.

### 2. Local install on Windows

Requires [Git for Windows](https://git-scm.com/download/win) and [Node.js 20+](https://nodejs.org/).

```powershell
git clone https://github.com/larsmikki/budget.git
cd budget
npm install
npm run dev
```

For a production build: `npm run build && npm start`.

### 3. Local install on macOS

```bash
brew install node git
git clone https://github.com/larsmikki/budget.git
cd budget
npm install
npm run dev
```

For a production build: `npm run build && npm start`.

### 4. Local install on Linux

Debian/Ubuntu:

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs git

git clone https://github.com/larsmikki/budget.git
cd budget
npm install
npm run dev
```

On Fedora/RHEL use `dnf install nodejs git`; on Arch use `pacman -S nodejs npm git`.

For a production build: `npm run build && npm start`.

## Features

- **Annual budget grid** - 12-month view with per-post and per-section subtotals
- **Custom sections** - organize posts into income/expense groups with optional color coding
- **Flexible frequencies** - monthly, quarterly, biannual, yearly, or custom month selection
- **Inline editing** - double-click any cell to override amounts directly
- **Drag and drop** - reorder posts within sections
- **Quick Setup** - pre-built templates for common budget posts
- **Themes** - light/dark and color themes
- **Multi-currency** - USD, EUR, GBP, NOK, SEK, DKK, JPY, CHF, PLN with locale-aware formatting
- **Import/Export** - JSON backup and restore
- **Demo mode** - fictive amounts for screenshots without exposing real data

## Tech stack

Monorepo with npm workspaces:

- **`client/`** - React 19 + Vite 8 + Tailwind CSS 4 + TypeScript SPA
- **`server/`** - Express + TypeScript REST API (`GET`/`PUT /api/state`), persisting to a flat `data/budget.json` - no database
- **Dev** - Vite dev server on port 3000 with `/api` proxied to the server on 3001 (`npm run dev` starts both)
- **Production** - single Express server on port 3130 serving the built client and the API (the Docker image sets `PORT=3130`)
- **Tests** - Vitest for client and server (`npm test`)
