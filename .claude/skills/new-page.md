---
description: Scaffold a new authenticated page with correct layout, structure, and components directory
allowed-tools: Write, Read, Bash
---

Create a new Nuxt page for the AVA Clinic project following these exact conventions:

**Arguments:** `$ARGUMENTS` — the page name/path (e.g. `reports/detail` or `pharmacy`)

## Steps

1. **Determine paths** from `$ARGUMENTS`:
   - Page file: `app/pages/<name>/index.vue`
   - Components dir: `app/components/<name>/` (create placeholder if no components yet)

2. **Create the page file** using this template:

```vue
<script setup lang="ts">
    definePageMeta({
        layout: 'main',
        middleware: ['auth']
    })
</script>

<template>
    <div class="max-w-7xl mx-auto px-6 lg:px-8 py-6 pb-8">
        <div
            class="bg-white rounded-3xl shadow-xl shadow-blue-900/5 ring-1 ring-gray-100 flex flex-col h-full overflow-hidden"
        >
            <!-- TODO: add components here -->
        </div>
    </div>
</template>
```

3. **Ask the user** whether they need an API route for this page. If yes, instruct them to run `/new-api <name>`.

4. **Report** the files created. Do not add sidebar navigation automatically — tell the user to add the route to `app/components/layout/` manually.

**Rules:**
- Always use `layout: 'main'` and `middleware: ['auth']` for protected pages
- Never add `<style>` blocks — use Tailwind utility classes only
- 4-space indentation
