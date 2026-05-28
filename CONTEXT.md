# Project Context — AVA Clinic

Nuxt 4 full-stack clinic management system for an aesthetic/beauty clinic (Ava Clinic Muak Lek).
No real database — all data is mocked in `server/utils/db.ts`.

---

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | Nuxt 4 (Vue 3 + Nitro) |
| UI Library | @nuxt/ui v4 — primary: `green`, neutral: `slate` |
| State | Pinia (`app/stores/`) |
| Icons | Lucide + Simple Icons via `@iconify-json/*` |
| i18n | vue-i18n — `en` (default), `th` (fallback) |
| Styling | Tailwind CSS via @nuxt/ui, 4-space indent |
| Package manager | pnpm |

---

## Pages & Routes

| Route | Page | Layout |
|---|---|---|
| `/` | Redirect → dashboard or login | default |
| `/dashboard` | หน้าแรก — summary cards + today's appointments | main |
| `/customerNew` | เพิ่มลูกค้าใหม่ — multi-tab registration form | main |
| `/customerInfo` | ข้อมูลลูกค้า — searchable customer list | main |
| `/customerInfo/[id]` | ข้อมูลลูกค้า — patient detail | main |
| `/customerInfo/[id]/treatment` | ประวัติการรักษา — treatment overview | main |
| `/appointment` | ปฏิทินนัดหมาย — calendar grid | main |
| `/inventory` | คลังสินค้า — stock, movements, expiry | main |
| `/reports` | รายงาน — charts, leaderboard, billing | main |
| `/branches` | จุดบริการ — branch list (badge: 3) | main |
| `/teleconsult` | Teleconsult — waiting room, doctors (BETA) | main |
| `/settings` | ตั้งค่า — clinic, team, billing tabs | main |

Auth routes use the `auth` layout (login page only).

---

## Auth

- Login: `POST /api/auth/login` → returns mock bearer token
- Token + user stored in cookies: `auth_token`, `auth_user` (SSR-safe via Pinia + `useCookie`)
- Middleware `app/middleware/auth.ts` guards `/dashboard`, `/customerNew`, `/customerInfo`
- Server routes call `requireAuth(event, roles?)` from `server/utils/auth.ts`

**Mock credentials:**
- `admin@avaclinic.com / password` → role: `admin`
- `super@avaclinic.com / password` → role: `superadmin`

**Roles:** `admin` | `superadmin` | `doctor` | `nurse`

---

## Component Groups

```
app/components/
  appointment/        CalendarGrid, DoctorFilter, FilterHeader, SidebarPanel
  common/             StepperNav
  customerInfo/       DetailHeader, EditFooter, Header, Pagination, PatientSideCard,
                      SectionBasic/Consent/Contact/Health, Table, Toolbar
  customerNew/        CompletionScore, LivePreview, PageHeader, SaveFooter,
                      TabAdditional/Contact/General/Health
  dashboard/          AnnouncementCard, AppointmentTable, ClinicHeader,
                      QuickActionCard, RecentActivities, SummaryCard
  inventory/          AlertCards, ExpirySection, Header, InventorySidebar,
                      ItemTable, MovementsSection, ValueChart
  layout/             HeaderBar, Sidebar
  login/              LoginFooter, LoginFormTabs, LoginHero, LoginSignInForm, LoginSignUpForm
  reports/            Charts, Filter, Header, Leaderboard, Metrics, RecentBills
  settings/
    billing/          BillingHistory, BillingSidebar, CurrentUsage, PaymentChannels,
                      ReceiptFormat, UsagePlan
    clinic/           BranchList, BrandIdentity, BusinessHours, ClinicLivePreview,
                      ContactChannels, LicenseInfo, Services
    team/             AddMemberForm, Invitations, InvitePreview, MemberTable,
                      Overview, PermissionMatrix
  teleconsult/        Doctors, Header, Schedule, Shortcuts, Statistics, SummaryCards, WaitingRoom
  treatments/         FilterBar, PageHeader, RightPanel, SessionCard, SessionList, StatCards, TabBar
  AppLoadingScreen, AppLogo, TemplateMenu
```

---

## API Routes (server/api/)

| Domain | Files |
|---|---|
| auth | `login.post.ts`, `me.get.ts` |
| customers | `[id].get.ts`, `[id].put.ts`, `index.get.ts`, `index.post.ts` |
| dashboard | `appointments/index.get.ts` |
| inventory | `index.get.ts` |
| reports | `index.get.ts` |
| branches | `index.get.ts` |
| teleconsult | `index.get.ts` |
| users | (ava-users) |
| settings | `billing.get/put.ts`, `clinic.get/put.ts`, `team.get.ts` |

All handlers call `simulateDelay()` from `server/utils/delay.ts`.

---

## Client API Layer

All HTTP calls go through `app/client/` — never raw `fetch` in components.

```
app/client/
  auth/index.ts           loginApi(), meApi()
  appointment/index.ts
  ava-users/user-info.ts
  branches.ts
  dashboard/appointments.ts
  inventory/index.ts
  reports/index.ts
  settings/billing.ts, clinic.ts, index.ts, team.ts
  teleconsult/index.ts
  treatments/index.ts
  types.ts                ClientResp<T>, ClientSuccess<T>, ClientError
  urls.ts                 URL constants
  with-queryparams.ts     query string helper
```

**Pattern:** Each function returns `ClientResp<T>`. Always check `resp.status === 'success'` before accessing `resp.data`.

---

## Composables

| File | Purpose |
|---|---|
| `useAppToast.ts` | Wrapper for UToast notifications |
| `useBranchColor.ts` | Maps branch id → color class |
| `useCustomerForm.ts` | Shared state/validation for customer registration form |

---

## i18n

- Locale files: `app/languages/en.json`, `app/languages/th.json`
- Plugin: `app/plugins/i18n.ts`
- Usage in templates: `$t('key')` / in script: `useI18n()`

---

## Adding Things

### New API route
1. Create `server/api/<resource>/<method>.ts`
2. Call `requireAuth(event)` if protected
3. Add mock data to `server/utils/db.ts`
4. Create typed client function in `app/client/<resource>/index.ts`

### New page
1. Create `app/pages/<name>/index.vue`
2. Set `definePageMeta({ layout: 'main' })` for authenticated pages
3. Add nav entry to `app/components/layout/Sidebar.vue` if needed
4. Add i18n keys to both locale files
