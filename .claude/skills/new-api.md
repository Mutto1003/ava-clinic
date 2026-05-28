---
description: Scaffold a full API route stack — server handler + mock data + typed client wrapper
allowed-tools: Write, Read, Edit, Bash
---

Create a complete API route for the AVA Clinic project from `$ARGUMENTS` (the resource name, e.g. `patients` or `treatments/history`).

## What to create

### 1. Server handler — `server/api/<resource>/index.get.ts`

```typescript
export default defineEventHandler(async event => {
    await simulateDelay(500)
    requireAuth(event)

    // TODO: add query param filtering if needed
    const data = mock<ResourceName>  // reference the mock export added in db.ts

    return {
        statusCode: 200,
        message: '<Resource> fetched successfully',
        data
    }
})
```

- `simulateDelay` and `requireAuth` are auto-imported from `server/utils/` — no import needed
- Use `getQuery(event)` for query param filtering
- For role-restricted routes: `requireAuth(event, ['admin', 'superadmin'])`

### 2. Mock data — append to `server/utils/db.ts`

Add a realistic mock array/object export named `mock<ResourceName>`. Keep it consistent with existing Thai-language mock data style in the file.

### 3. Client wrapper — `app/client/<resource>/index.ts`

```typescript
import type { ClientResp } from '../types'

export type <ResourceType> = {
    // define fields here
}

export async function get<Resource>(token: string): Promise<ClientResp<<ResourceType>[]>> {
    try {
        const res = await fetch('/api/<resource>', {
            headers: { Authorization: `Bearer ${token}` }
        })
        const json = await res.json()
        if (res.status !== 200) {
            return { status: 'fails', code: res.status, message: json?.statusMessage ?? 'error' }
        }
        return { status: 'success', code: res.status, data: json.data }
    } catch {
        return { status: 'fails', code: 500, message: 'Internal Client Error' }
    }
}
```

## Rules
- Never use `axios` — always native `fetch`
- Always return `{ statusCode, message, data }` from server handlers
- Never throw from client functions — catch and return `ClientError` instead
- 4-space indentation throughout
