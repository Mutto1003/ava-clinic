import type { ClientResp } from '../types'

export type BillingPlan = 'starter' | 'professional' | 'enterprise'
export type BillingCycle = 'monthly' | 'yearly'

export type PlanOption = {
    key: BillingPlan
    name: string
    priceMonthly: number
    priceYearly: number
    tagline: string
    features: string[]
    isCurrent: boolean
    isPopular: boolean
}

export type UsageMetric = {
    label: string
    used: number
    total: number | null
    unit: string
    unlimited: boolean
    warningThreshold: number
}

export type PaymentChannel = {
    id: string
    name: string
    slug: 'promptpay' | 'card' | 'bank_transfer' | 'cash' | 'line_pay' | 'shopee_pay'
    provider: string | null
    fee: string
    feeNote: string | null
    enabled: boolean
    isDefault: boolean
    isPending: boolean
    color: string
    initials: string
}

export type ReceiptTemplate = 'violet' | 'monochrome' | 'emerald' | 'minimal'
export type ReceiptLocale = 'th' | 'en' | 'th_en'

export type ReceiptFormat = {
    prefix: string
    startNumber: string
    locale: ReceiptLocale
    template: ReceiptTemplate
    footerNote: string
}

export type BillingInvoice = {
    id: string
    plan: string
    period: string
    date: string
    amount: number
    status: 'paid' | 'pending' | 'failed'
}

export type StoredPaymentMethod = {
    id: string
    type: 'card' | 'bank'
    label: string
    detail: string
    expiry: string | null
    initials: string
    color: string
}

export type BillingData = {
    currentPlan: BillingPlan
    billingCycle: BillingCycle
    plans: PlanOption[]
    usage: UsageMetric[]
    paymentChannels: PaymentChannel[]
    receiptFormat: ReceiptFormat
    invoices: BillingInvoice[]
    nextBillingAmount: number
    nextBillingDate: string
    storedPaymentMethods: StoredPaymentMethod[]
    accountCredit: number
    currentCharges: {
        plan: number
        addOnStorage: number
        smsReminder: { used: number; limit: number; free: boolean }
    }
}

export async function getBillingSettings(token: string): Promise<ClientResp<BillingData>> {
    try {
        const res = await fetch('/api/settings/billing', {
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

export async function updateBillingSettings(token: string, data: Partial<BillingData>): Promise<ClientResp<BillingData>> {
    try {
        const res = await fetch('/api/settings/billing', {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
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
