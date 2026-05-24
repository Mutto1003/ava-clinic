import type { ClientResp } from '../types'

export type Appointment = {
    id: number
    time: string
    timeNote: string
    isUpcoming: boolean
    initials: string
    avatarColor: string
    customer: string
    hn: string
    isVip: boolean
    isNew: boolean
    service: string
    serviceDetail: string
    doctor: string
    status: string
    badgeColor: 'success' | 'info' | 'warning' | 'error' | 'neutral'
}

export async function getAppointments(
    token: string,
    statusFilter?: string
): Promise<ClientResp<Appointment[]>> {
    const query = statusFilter ? `?status=${encodeURIComponent(statusFilter)}` : ''
    const endpoint = `/api/dashboard/appointments${query}`

    try {
        const res = await fetch(endpoint, {
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
