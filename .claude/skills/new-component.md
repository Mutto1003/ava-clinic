---
description: Create a Vue component following AVA Clinic conventions (Nuxt UI, Tailwind, no scoped styles)
allowed-tools: Write, Read, Bash
---

Create a new Vue component for the AVA Clinic project.

**Arguments:** `$ARGUMENTS` — domain and component name, e.g. `appointment/CalendarView` or `common/StatusBadge`

## Steps

1. **Resolve the path**: `app/components/<domain>/<ComponentName>.vue`

2. **Ask the user** what the component should do if `$ARGUMENTS` doesn't make it clear.

3. **Create the component** using this template:

```vue
<script setup lang="ts">
    // Props go here
    // defineProps<{}>()
</script>

<template>
    <div>
        <!-- content -->
    </div>
</template>
```

## Conventions

- **No `<style>` blocks** — Tailwind utility classes only
- **No scoped CSS** — never add `scoped` attribute
- Use **@nuxt/ui** components (UButton, UBadge, UInput, UModal, etc.) before writing custom HTML
- Icons: `i-lucide-<name>` (Lucide) or `i-simple-icons-<name>` — via Nuxt Icon
- Toast feedback: use `useAppToast()` composable from `~/composables/useAppToast`
- Colors follow app config: primary = `green`, neutral = `slate`
- 4-space indentation

## Nuxt UI badge color values
`success` | `warning` | `error` | `info` | `neutral` — match these to appointment `badgeColor` convention

## Component placement
- Domain-specific → `app/components/<domain>/`
- Reused across domains → `app/components/common/`
- Layout chrome (sidebar, header) → `app/components/layout/`
