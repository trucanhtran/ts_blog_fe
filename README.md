# TS Blog FE

A Next.js front-end application with TypeScript, React, Tailwind CSS, and full tooling (ESLint, Prettier, Vitest, Husky). Runs locally or via Docker Compose.

---

## Tech Stack & Versions

| Category        | Technology        | Version | Description                                                          |
| --------------- | ----------------- | ------- | -------------------------------------------------------------------- |
| **Runtime**     | Node.js           | ≥ 22    | Required for local dev; Docker uses Node 22 Alpine                   |
| **Framework**   | Next.js           | 15.x    | App Router, Turbopack for dev                                        |
| **UI**          | React             | 19.x    | React DOM 19                                                         |
| **Language**    | TypeScript        | 5.x     | Strict mode, path alias `@/*`                                        |
| **Styling**     | Tailwind CSS      | 3.x     | PostCSS + Autoprefixer                                               |
| **Linting**     | ESLint            | 9.x     | Flat config; Next.js + TypeScript + Prettier                         |
| **Formatting**  | Prettier          | 3.x     | Integrated with ESLint                                               |
| **Testing**     | Vitest            | 2.x     | Unit tests; jsdom, React Testing Library                             |
| **Git hooks**   | Husky             | 9.x     | Pre-commit: lint + test                                              |
| **Container**   | Docker            | -       | Multi-stage Dockerfile; Node 22 Alpine                               |
| **UI library**  | Material UI (MUI) | 6.x     | Theme, App Router cache provider                                     |
| **HTTP client** | Axios             | 1.x     | Configured in `src/lib/axios.ts`; base URL via `NEXT_PUBLIC_API_URL` |
| **i18n**        | next-intl         | 3.x     | Messages in `src/i18n/messages/`; `useTranslations` / `getTranslations` |

---

## Requirements

- **Local development:** Node.js ≥ 22, npm
- **Docker:** Docker Engine + Docker Compose

---

## Commands (detailed)

### Install dependencies

```bash
npm install
```

Installs all dependencies and runs `prepare`, which sets up Husky git hooks (e.g. pre-commit).

---

### Development server

```bash
npm run dev
```

- Starts the Next.js dev server with **Turbopack**.
- App: **http://localhost:3000**
- Hot reload on file changes.
- Sample page (API + MUI): **http://localhost:3000/sample**

**If `/sample` returns 404:**

1. Stop the dev server (Ctrl+C), then clear cache and restart:
   ```bash
   rm -rf .next && npm run dev
   ```
2. Try without Turbopack (sometimes Turbopack misses new routes):
   ```bash
   npm run dev:no-turbopack
   ```
3. If you use `npm run start` (production), run `npm run build` first so `/sample` is included in the build.

---

### Production build

```bash
npm run build
```

- Builds the app for production (output: `.next`).
- Uses `output: "standalone"` for Docker/self-hosting.

---

### Run production build locally

```bash
npm run start
```

- Serves the app from the result of `npm run build`.
- Use after running `npm run build`; typically used in Docker or staging.

---

### Linting

```bash
npm run lint
```

- Runs ESLint (Next.js core-web-vitals + TypeScript + Prettier rules).
- Fails the script if there are errors.

```bash
npm run lint:fix
```

- Same as `lint` but applies auto-fixes where possible (e.g. some ESLint and Prettier fixes).

---

### Formatting

```bash
npm run format
```

- Runs Prettier and **overwrites** files under `src/**` (`.ts`, `.tsx`, `.js`, `.jsx`, `.json`, `.css`, `.md`) to match `.prettierrc`.

```bash
npm run format:check
```

- Runs Prettier in **check-only** mode (no writes). Useful in CI to ensure code is formatted.

---

### Tests

```bash
npm run test
```

- Runs Vitest once (no watch). Used in CI and by the Husky pre-commit hook.
- Tests are under `src/**/*.{test,spec}.{ts,tsx}`.

```bash
npm run test:watch
```

- Runs Vitest in watch mode; re-runs tests when files change.

---

### Docker (dev only)

Một service: build từ **Dockerfile** (target `dev`), mount source để hot reload.

**Chạy:**

```bash
docker compose up
```

- Cài dependency + chạy dev server. Hot reload, thêm file không cần build. **http://localhost:3000** — Dừng: `Ctrl+C`.

**Chạy nền:**

```bash
docker compose up -d
```

**Dừng:**

```bash
docker compose down
```

| Lệnh                       | Mô tả              |
| -------------------------- | ------------------ |
| `docker compose up`        | Chạy dev (foreground) |
| `docker compose up -d`     | Chạy dev nền       |
| `docker compose down`      | Dừng và xóa container |
| `docker compose logs -f dev` | Xem log dev    |

**Production:** Khi cần build image để deploy thì dùng Dockerfile: `docker build -t ts-blog-fe . && docker run -p 3000:3000 ts-blog-fe`.

---

## Git hooks (Husky)

On `git commit`, the **pre-commit** hook runs:

1. `npm run lint` — ESLint must pass.
2. `npm run test` — Vitest must pass.

If either fails, the commit is aborted. Fix lint/test issues and try again.

Hooks are installed when you run `npm install` (via the `prepare` script).

---

## Project structure (overview)

| Path                             | Purpose                                                |
| -------------------------------- | ------------------------------------------------------ |
| `src/app/`                       | Next.js App Router (layout, pages, globals.css)        |
| `src/app/sample/`                | Sample page: MUI + API (JSONPlaceholder) — **/sample** |
| `src/app/api-sample/`            | Same sample at **/api-sample**                         |
| `src/components/`                | Shared components (e.g. `MuiProvider`)                 |
| `src/lib/axios.ts`               | Axios instance: baseURL, request/response interceptors |
| `src/lib/api.ts`                 | Common API: `apiGet`, `apiPost`, `apiPut`, `apiDelete` |
| `src/theme/`                     | MUI theme (typography, palette)                        |
| `src/i18n/`                      | i18n config, request, messages (en, vi)                |
| `src/test/`                      | Test setup (e.g. Vitest + Testing Library)             |
| `public/`                        | Static assets                                          |
| `Dockerfile`                     | Multi-stage build; Node 22 Alpine; standalone output   |
| `docker-compose.yml`             | Defines `app` service on port 3000                     |
| `eslint.config.mjs`              | ESLint flat config                                     |
| `.prettierrc`, `.prettierignore` | Prettier config and ignore list                        |
| `.husky/pre-commit`              | Pre-commit hook: lint + test                           |
| `.vscode/`                       | Suggested editor settings (format on save, ESLint)     |

---

## i18n (next-intl)

- **Config:** `src/i18n/config.ts` — `locales`, `defaultLocale` (vi).
- **Request:** `src/i18n/request.ts` — `getRequestConfig` loads messages for the active locale.
- **Messages:** `src/i18n/messages/en.json`, `vi.json` — namespaced keys (e.g. `home.title`, `common.loading`).
- **Usage:** Server: `getTranslations('home')` from `next-intl/server`. Client: `useTranslations('home')` from `next-intl`. Root layout wraps with `NextIntlClientProvider` and `getMessages()`.
- **Import:** `import { defaultLocale, type Locale } from '@/i18n';`

---

## Configuration summary

- **ESLint:** Next.js, TypeScript, Prettier (plugin + config-prettier); `prettier/prettier` as warning.
- **Prettier:** Semicolons, double quotes, 2-space indent, trailing commas (ES5), print width 100, LF line endings.
- **VS Code:** Format on save, default formatter Prettier, ESLint fix on save. Install extensions: ESLint, Prettier.

---

## Quick reference: all npm scripts

| Script                 | Description                                    |
| ---------------------- | ---------------------------------------------- |
| `npm run dev`          | Start dev server (Turbopack)                   |
| `npm run build`        | Production build                               |
| `npm run start`        | Serve production build                         |
| `npm run lint`         | Run ESLint                                     |
| `npm run lint:fix`     | Run ESLint with auto-fix                       |
| `npm run format`       | Prettier: format files in `src`                |
| `npm run format:check` | Prettier: check only (CI)                      |
| `npm run test`         | Run tests once (used in pre-commit)            |
| `npm run test:watch`   | Run tests in watch mode                        |
| `npm run prepare`      | Install Husky hooks (runs after `npm install`) |
