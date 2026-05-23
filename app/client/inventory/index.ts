import type { ClientResp } from '../types'

export type InventorySummary = {
    totalItems: number
    totalValue: number
    expiringSoon: number
    lowStock: number
    expiringValue: number
    pendingOrders: number
    pendingValue: number
    pendingArrivalDays: number
    weeklyUsage: number
    weeklyTrend: string
}

export type InventoryCategory = {
    name: string
    count: number
    color: string
}

export type InventoryLocation = {
    name: string
    count: number
}

export type InventoryItem = {
    id: string
    name: string
    brand: string
    type: string
    category: string
    sku: string
    lot: string
    lotType: string
    expiryDate: string
    daysLeft: number
    stock: number
    maxStock: number
    unit: string
    location: string
    temperature: string
    price: number
    iconBg: string
    iconColor: string
}

export type InventoryExpiryItem = {
    id: string
    name: string
    lot: string
    daysLeft: number
    stock: number
    unit: string
}

export type InventoryMovement = {
    id: string
    type: 'in' | 'out' | 'adjust'
    itemName: string
    amount: number
    unit: string
    by: string
    room?: string
    time: string
    date: string
}

export type InventoryCategoryValue = {
    name: string
    value: number
    color: string
}

export type InventoryData = {
    summary: InventorySummary
    categories: InventoryCategory[]
    locations: InventoryLocation[]
    items: InventoryItem[]
    expiring: InventoryExpiryItem[]
    movements: InventoryMovement[]
    categoryValues: InventoryCategoryValue[]
}

export async function getInventory(token: string): Promise<ClientResp<InventoryData>> {
    try {
        const res = await fetch('/api/inventory', {
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
