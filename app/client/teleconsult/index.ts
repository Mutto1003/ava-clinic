import type { ClientResp } from '../types'

export type TeleconsultSummary = {
    activeSessions: number
    totalSessions: number
    activeRooms: string
    waitingCount: number
    nextPatientIn: string
    completedToday: number
    completedTrend: string
    revenueToday: number
    revenueAvg: number
    pingMs: number
    totalWaiting: number
    activeLiveCount: number
    targetRevenue: number
    completedGoal: number
    revenuePercent: number
    waitingNewCount: number
    waitingAvgMin: number
}

export type TeleconsultScheduleItem = {
    id: number
    time: string
    duration: string
    patient: string
    initial: string
    type: string
    hn?: string
    status: string
    isVip?: boolean
    isNew?: boolean
}

export type TeleconsultWaitingRoomItem = {
    id: number
    patient: string
    initial: string
    status: string
    color?: string
    action?: string
}

export type TeleconsultDoctor = {
    id: number
    name: string
    initial: string
    specialty: string
    status: string
    statusColor: string
    avatarClass?: string
    cases: number
}

export type TeleconsultLiveConsult = {
    patientName: string
    condition: string
    room: string
    doctor: string
    duration: string
}

export type TeleconsultChartItem = {
    label: string
    completed: number
    cancelled: number
    isToday?: boolean
}

export type TeleconsultStatistics = {
    totalCount: number
    trendPercent: string
    avgPerDay: string
    peakDay: string
    chart: TeleconsultChartItem[]
}

export type TeleconsultData = {
    summary: TeleconsultSummary
    schedule: TeleconsultScheduleItem[]
    waitingRoom: TeleconsultWaitingRoomItem[]
    doctors: TeleconsultDoctor[]
    liveConsult: TeleconsultLiveConsult
    statistics: TeleconsultStatistics
}

export async function getTeleconsult(token: string): Promise<ClientResp<TeleconsultData>> {
    try {
        const res = await fetch('/api/teleconsult', {
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
