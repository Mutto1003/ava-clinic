---
description: Add i18n translation keys to both en.json and th.json for a new feature or page
allowed-tools: Read, Edit
---

Add i18n translation keys for `$ARGUMENTS` to both locale files in the AVA Clinic project.

## Steps

1. **Read both files** to understand existing key structure:
   - `app/languages/en.json`
   - `app/languages/th.json`

2. **Identify the correct namespace** from existing structure (e.g., `common`, `appointment`, `customer`, etc.)

3. **Add the keys** under the appropriate namespace in both files simultaneously. Keep keys consistent between files — same structure, same nesting depth.

4. **Thai translations**: Use natural Thai clinic/medical vocabulary. When unsure, use a clear transliteration or ask the user.

## Rules
- Never add keys to only one file — always update both
- Keep JSON sorted alphabetically within each namespace object
- Use camelCase for key names (e.g. `patientName`, `appointmentDate`)
- Usage in templates: `$t('namespace.keyName')` or `useI18n().t('namespace.keyName')` in script
