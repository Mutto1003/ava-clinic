import type { ClientResp } from '../types'

export type TeamRole = 'หมอ' | 'พนักงาน' | 'Super Admin'

export type MemberFormData = {
    title: string
    firstName: string
    lastName: string
    nickname: string
    email: string
    phone: string
    licenseNumber: string
    role: TeamRole
    branches: string[]
    workDays: string[]
    startTime: string
    endTime: string
    sendInviteEmail: boolean
    require2FA: boolean
    allowExternalIP: boolean
}

export type TeamOverview = {
    totalSeats: number
    usedSeats: number
    doctors: { used: number; total: number; addedThisMonth: number }
    staff: { used: number; total: number; addedThisMonth: number }
    superAdmins: { used: number; total: number; remaining: number }
    activeNow: number
}

export type TeamMember = {
    id: number
    name: string
    title: string
    initial: string
    avatarColor: string
    email: string
    licenseNumber: string
    role: TeamRole
    branches: string[]
    lastActive: string
    status: 'online' | 'away' | 'offline'
}

export type PendingInvitation = {
    id: number
    email: string
    role: TeamRole
    branches: string[]
    sentBy: string
    sentAt: string
    expiresIn: string
    expired: boolean
}

export type PermissionEntry = {
    module: string
    icon: string
    view: string
    edit: string
    delete: string
    viewColor: string
    editColor: string
    deleteColor: string
}

export type ActivityItem = {
    id: number
    actor: string
    action: string
    detail: string
    time: string
    color: string
}

export type TeamData = {
    overview: TeamOverview
    members: TeamMember[]
    invitations: PendingInvitation[]
    permissions: Record<TeamRole, PermissionEntry[]>
    recentActivity: ActivityItem[]
}

export async function getTeamSettings(token: string): Promise<ClientResp<TeamData>> {
    try {
        const res = await fetch('/api/settings/team', {
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
