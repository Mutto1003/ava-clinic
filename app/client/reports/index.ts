import type { ClientResp } from '../types'

export type ReportPeriod = 'daily' | 'weekly' | 'monthly' | 'yearly' | 'custom'
export type ReportCompare = 'previous' | 'last_year'

export type ReportParams = {
    period?: ReportPeriod
    startDate?: string
    endDate?: string
    compare?: ReportCompare
}

export type ReportMetricItem = {
    value: number
    trend: string
    avg?: number
    prevAvg?: number
    prevValue?: number
    diff?: number
}

export type ReportMetrics = {
    revenue: ReportMetricItem
    bills: ReportMetricItem
    avgPerBill: ReportMetricItem
    newCustomers: ReportMetricItem
}

export type ServiceItem = {
    id: number
    name: string
    revenue: number
    bills: number
    avg: number
    progress: number
}

export type StaffItem = {
    id: number
    initial: string
    name: string
    revenue: number
    bills: number
    progress: number
    color: string
    barColor: string
}

export type BillItem = {
    id: string
    customer: string
    initial: string
    color: string
    service: string
    serviceCount: number
    serviceUnit: string
    amount: number
    payment: string
    paymentColor: string
    time: string
}

export type PaymentMethod = {
    name: string
    amount: number
    percent: number
    hex: string
}

export type DailyRevenue = {
    current: number[]
    previous: number[]
    target: number
    labels: string[]
}

export type ReportData = {
    metrics: ReportMetrics
    topServices: ServiceItem[]
    staffRevenue: StaffItem[]
    recentBills: BillItem[]
    paymentMethods: PaymentMethod[]
    dailyRevenue: DailyRevenue
    totalBills: number
    period: {
        label: string
        days: number
    }
}

export async function getReports(params: ReportParams = {}): Promise<ClientResp<ReportData>> {
    try {
        const query = new URLSearchParams()
        if (params.period) query.append('period', params.period)
        if (params.startDate) query.append('startDate', params.startDate)
        if (params.endDate) query.append('endDate', params.endDate)
        if (params.compare) query.append('compare', params.compare)

        const qs = query.toString()
        const res = await fetch(`/api/reports${qs ? '?' + qs : ''}`)
        const json = await res.json()

        if (res.status !== 200) {
            return { status: 'fails', code: res.status, message: json?.statusMessage ?? 'error' }
        }
        return { status: 'success', code: res.status, data: json.data }
    } catch {
        return { status: 'fails', code: 500, message: 'Internal Client Error' }
    }
}
