# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server
pnpm build        # Build for production
pnpm preview      # Preview production build
pnpm lint         # Run ESLint
pnpm format       # Format with Prettier
pnpm typecheck    # Run TypeScript type checking (nuxt typecheck)
```

## Architecture

**Nuxt 4** full-stack clinic management app (aesthetic/beauty clinic). No real database yet — all backend data lives in `server/utils/db.ts` as mock exports.

### Directory structure

```
app/
  client/       # Typed fetch wrappers for each API domain (one file per resource)
  components/   # Vue components, grouped by domain (appointment/, medical/, etc.)
  composables/  # Reusable Vue composables
  languages/    # i18n message files: en.json, th.json
  layouts/      # Three layouts: default (redirects), auth (login page), main (sidebar+header)
  middleware/   # auth.ts — guards /dashboard, /customerNew, /customerInfo
  pages/        # File-based routing
  plugins/      # i18n.ts — registers vue-i18n globally
  stores/       # Pinia: auth.ts only
server/
  api/          # Nitro event handlers (REST endpoints)
  utils/
    auth.ts     # requireAuth(event, roles?) — throws 401/403
    db.ts       # All mock data (appointments, customers, inventory, etc.)
    delay.ts    # simulateDelay() used in all handlers
```

### Auth flow

- Login POSTs to `/api/auth/login`, which returns a mock bearer token
- Token and user object are persisted in cookies (`auth_token`, `auth_user`) via Pinia's `useAuthStore` for SSR hydration
- Client requests call `loginApi()` / `meApi()` from `app/client/auth/index.ts`
- Server routes call `requireAuth(event, ['admin'])` to validate the `Authorization: Bearer` header
- Mock credentials: `admin@avaclinic.com / password` → admin, `super@avaclinic.com / password` → superadmin

### Client API layer pattern

All HTTP calls go through `app/client/` — never raw fetch in components. Each file exports typed async functions returning `ClientResp<T>` (`ClientSuccess<T> | ClientError` from `app/client/types.ts`). Check `resp.status === 'success'` before accessing `resp.data`.

### Adding a new API route

1. Create `server/api/<resource>/<method>.ts` (Nitro auto-routes by filename)
2. Call `requireAuth(event)` at the top if protected
3. Add mock data to `server/utils/db.ts`
4. Create matching client function in `app/client/<resource>/index.ts`

### UI conventions

- Component library: **@nuxt/ui v4** (primary: `green`, neutral: `slate`)
- Icons: Lucide and Simple Icons via `@iconify-json/*`
- Color mode is forced to `light` (set in `nuxt.config.ts`)
- Layout `main` provides the sidebar + header shell; all authenticated pages use it
- 4-space indentation enforced by ESLint (`vue/script-indent`, `@stylistic/indent`)

### i18n

- Plugin at `app/plugins/i18n.ts`, locale files at `app/languages/`
- Default locale: `en`, fallback: `th`
- Use `$t('key')` in templates or `useI18n()` in `<script setup>`

### Roles

`admin` | `superadmin` | `doctor` | `nurse` — defined in `app/stores/auth.ts` as `UserRole`
