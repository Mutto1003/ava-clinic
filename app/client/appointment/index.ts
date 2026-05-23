export type CalendarAppointment = {
    id: number
    day: number
    time: string
    name: string
    branch: string
    doctor: string
}

export type CalendarDay = {
    day: number
    isCurrentMonth: boolean
}

export type SidebarDoctor = {
    id: number
    name: string
    branch: string
    specialty: string
    time: string
    initial: string
    color: string
}

export type DayAppointment = {
    id: number
    time: string
    customer: string
    branch: string
    colorClass: string
}

export type BookingPayload = {
    day: number
    time: string
    doctor: string
    branch: string
    customer: string
}
