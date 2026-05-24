import type { ClientResp } from './types'

export type BranchContact = {
    name: string
    initials: string
    role: string
    colorClass: string
}

export type BranchEquipment = {
    name: string
    status: 'ready' | 'maintenance' | 'offline'
    note: string | null
}

export type BranchBusinessHour = {
    day: string
    open: boolean
    start: string
    end: string
    isToday: boolean
}

export type BranchFacilities = {
    examRooms: { count: number; detail: string }
    waitingSeats: { count: number; detail: string }
    parking: { count: number; detail: string }
    manager: { name: string; phone: string; line: string }
}

export type BranchLiveStats = {
    queueWaiting: number
    avgWaitMin: number
    teamOnline: number
    teamTotal: number
    photosToday: number
    photosTodayChange: number
    storageGb: number
    storageTotalGb: number
}

export type BranchItem = {
    id: number
    name: string
    shortCode: string
    fullTitle: string
    tagLabel: string
    tagType: 'hq' | 'new' | 'pending'
    district: string
    yearOpen: number
    colorClass: string
    isLive: boolean
    isPending: boolean
    address: string
    coordinates: { lat: number; lng: number }
    teamCount: number
    queueToday: number
    photoThisMonth: number
    liveStats: BranchLiveStats | null
    businessHours: BranchBusinessHour[]
    facilities: BranchFacilities | null
    contacts: BranchContact[]
    equipment: BranchEquipment[]
}

export type TeamMember = {
    id: number
    name: string
    initials: string
    colorClass: string
    position: string
    startLabel: string
    role: 'doctor' | 'staff'
    isNew: boolean
    photosLast30: number | null
    photosProgress: number
    casesManaged: number | null
    status: 'uploading' | 'checking' | 'online' | 'offline' | 'break' | 'pending-invite'
}

export type QueueItem = {
    id: number
    caseCode: string
    treatmentName: string
    photoType: string
    photoTypeNote: string | null
    uploadedBy: string
    assignedDoctor: string | null
    photoCount: number
    sizeMb: number
    uploadProgress: number
    status: 'uploading' | 'done' | 'no-doctor'
    bgColor: string
    iconBg: string
    iconColor: string
}

export type BranchesData = {
    branches: BranchItem[]
    team: TeamMember[]
    queue: QueueItem[]
}

export async function getBranchesData(token: string): Promise<ClientResp<BranchesData>> {
    try {
        const res = await fetch('/api/branches', {
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
