export type TreatmentStatus = 'completed' | 'appointment' | 'cancelled' | 'free'

export type TreatmentItem = {
    name: string
    lotNumber?: string
    quantity: number
    unit: string
    price: number
}

export type VitalSigns = {
    bp: string
    pulse: number
    weight: number
    temp: number
}

export type BeforeAfterPhoto = {
    before: string | null
    after: string | null
    date: string
}

export type TreatmentSession = {
    id: string
    date: string
    treatmentName: string
    status: TreatmentStatus
    courseSession?: { current: number; total: number }
    isCourseStart?: boolean
    doctorName: string
    room: string
    duration: number
    price: number
    invoiceId?: string
    items?: TreatmentItem[]
    vitalSigns?: VitalSigns
    photos?: BeforeAfterPhoto[]
    outcomes?: string[]
    soapNote?: string
    nextPlan?: string
    createdAt?: string
    updatedAt?: string
    createdBy?: string
}

export type DoctorSummary = {
    id: string
    name: string
    specialty: string
    initials: string
    color: string
    sessionCount: number
}

export type CategorySummary = {
    name: string
    amount: number
    color: string
}

export type UpcomingSession = {
    treatmentName: string
    date: string
    time: string
    doctorName: string
    room: string
    duration: number
    daysUntil: number
}

export type TreatmentWarning = {
    label: string
    severity: 'high' | 'medium' | 'low'
    colorClass: string
}

export type PatientTreatmentProfile = {
    id: string
    hn: string
    firstName: string
    lastName: string
    nickname: string
    avatarInitials: string
    avatarColorClass: string
    age: number
    gender: string
    memberSince: string
    tier: 'PLATINUM' | 'GOLD' | 'SILVER' | 'STANDARD'
    isVip: boolean
    allergies: string[]
    warnings: TreatmentWarning[]
    totalSessions: number
    yearsOfService: number
    totalSpent: number
    averagePerSession: number
    spendingGrowth: number
    primaryDoctor: { name: string; sessions: number; specialty: string }
    overallOutcome: { label: string; goodCount: number; totalCount: number }
    upcomingSession: UpcomingSession | null
    sessions: TreatmentSession[]
    doctorsSummary: DoctorSummary[]
    categorySummary: CategorySummary[]
    tabCounts: {
        overview: number
        treatments: number
        appointments: number
        billing: number
        courses: number
        documents: number
        notes: number
    }
}

export function getMockTreatmentProfile(_id: string): PatientTreatmentProfile {
    return {
        id: _id,
        hn: 'CN-00184',
        firstName: 'พิมลกา',
        lastName: 'จันทร์เพ็ญ',
        nickname: 'คุณพัง',
        avatarInitials: 'วจ',
        avatarColorClass: 'bg-gradient-to-br from-pink-500 to-purple-600',
        age: 35,
        gender: 'หญิง',
        memberSince: '22 มี.ค. 2566',
        tier: 'PLATINUM',
        isVip: true,
        allergies: ['Penicillin'],
        warnings: [
            { label: 'Penicillin (รุนแรง)', severity: 'high', colorClass: 'bg-red-100 text-red-700 border border-red-200' },
            { label: 'Lidocaine', severity: 'medium', colorClass: 'bg-purple-100 text-purple-700 border border-purple-200' },
            { label: 'ผิวแห้งง่าย', severity: 'low', colorClass: 'bg-blue-100 text-blue-700 border border-blue-200' },
            { label: 'ความดันต่ำ', severity: 'low', colorClass: 'bg-amber-100 text-amber-700 border border-amber-200' },
        ],
        totalSessions: 24,
        yearsOfService: 3,
        totalSpent: 284600,
        averagePerSession: 11858,
        spendingGrowth: 18,
        primaryDoctor: { name: 'Dr. สนดล', sessions: 14, specialty: 'ผิวหนัง' },
        overallOutcome: { label: 'ดีมาก', goodCount: 22, totalCount: 24 },
        upcomingSession: {
            treatmentName: 'Pico Laser Full Face (4/6)',
            date: '24 พ.ค. 2569',
            time: '14:00 น.',
            doctorName: 'Dr. สนดล สวัสดิ',
            room: 'ห้อง 1',
            duration: 60,
            daysUntil: 6,
        },
        tabCounts: {
            overview: 0,
            treatments: 24,
            appointments: 3,
            billing: 24,
            courses: 2,
            documents: 42,
            notes: 6,
        },
        doctorsSummary: [
            { id: '1', name: 'Dr. สนดล สวัสดิ', specialty: 'ผิวหนัง', initials: 'สน', color: 'bg-emerald-500', sessionCount: 14 },
            { id: '2', name: 'Dr. พิมลกา', specialty: 'แพทย์ทั่วไป', initials: 'พม', color: 'bg-purple-500', sessionCount: 6 },
            { id: '3', name: 'Dr. สนวัฒน์', specialty: 'เวชศาสตร์ความงาม', initials: 'สว', color: 'bg-red-400', sessionCount: 4 },
        ],
        categorySummary: [
            { name: 'Filler & Botox', amount: 142000, color: 'bg-indigo-500' },
            { name: 'Laser Treatment', amount: 86000, color: 'bg-emerald-500' },
            { name: 'IV Drip & Vitamin', amount: 38000, color: 'bg-amber-400' },
            { name: 'Consultation', amount: 0, color: 'bg-slate-300' },
        ],
        sessions: [
            {
                id: 'S001',
                date: '2026-05-24',
                treatmentName: 'Pico Laser Full Face',
                status: 'appointment',
                courseSession: { current: 4, total: 6 },
                doctorName: 'Dr. สนดล สวัสดิ',
                room: 'ห้อง 1',
                duration: 60,
                price: 300,
            },
            {
                id: 'S002',
                date: '2026-05-12',
                treatmentName: 'Filler Juvederm Volift',
                status: 'completed',
                doctorName: 'Dr. สนดล สวัสดิ',
                room: 'ห้อง 2',
                duration: 45,
                price: 28000,
                invoiceId: 'INV-0412',
                items: [
                    { name: 'Filler Juvederm Volift 1ml', lotNumber: 'L2402-17', quantity: 1, unit: 'syr', price: 26000 },
                    { name: 'Lidocaine 2%', lotNumber: 'L2401-44', quantity: 2, unit: 'ml', price: 380 },
                    { name: 'EMLA Cream 5%', lotNumber: 'L2404-11', quantity: 1, unit: 'หลอด', price: 620 },
                    { name: 'After-care Pack', quantity: 1, unit: 'ชุด', price: 1000 },
                ],
                vitalSigns: { bp: '118/76', pulse: 72, weight: 54.2, temp: 36.6 },
                photos: [{ before: null, after: null, date: '12-05' }],
                outcomes: ['ผลลัพธ์ดี', 'ลูกค้าพึงพอใจ', 'ไม่มี complication'],
                soapNote: 'เติมร่องแก้ม + คาง โดยใช้ยาชา EMLA 30 นาทีล่วงหน้า ฉีดเทคนิค fanning · ลูกค้าไม่มี vasovagal reaction · มีอาการบวมเล็กน้อยตามปกติหลังหัตถการ · แนะนำดูแลสัมผัส/นวด 24 ชม. ดื่มน้ำเยอะ งาน NSAID หากปวด',
                nextPlan: 'นัด follow-up อาทิตย์หน้า · 19 พ.ค.',
                createdAt: '12 พ.ค. 16:25',
                updatedAt: '12 พ.ค. 16:48',
                createdBy: 'คุณพิมลกา',
            },
            {
                id: 'S003',
                date: '2026-04-19',
                treatmentName: 'Pico Laser Full Face',
                status: 'completed',
                courseSession: { current: 3, total: 6 },
                doctorName: 'Dr. สนดล สวัสดิ',
                room: 'ห้อง 1',
                duration: 40,
                price: 800,
                invoiceId: 'INV-0398',
            },
            {
                id: 'S004',
                date: '2026-03-22',
                treatmentName: 'Botox Aestox 50u (Forehead + Glabella)',
                status: 'completed',
                doctorName: 'Dr. พิมลกา (แพทย์)',
                room: 'ห้อง 3',
                duration: 30,
                price: 7800,
                invoiceId: 'INV-0381',
            },
            {
                id: 'S005',
                date: '2026-03-05',
                treatmentName: 'IV Drip — Glutathione + Vit C',
                status: 'completed',
                courseSession: { current: 1, total: 10 },
                doctorName: 'Dr. สนวัฒน์ (แพทย์)',
                room: 'ห้อง 4',
                duration: 45,
                price: 2800,
                invoiceId: 'INV-0356',
            },
            {
                id: 'S006',
                date: '2026-02-15',
                treatmentName: 'Pico Laser Full Face',
                status: 'completed',
                courseSession: { current: 2, total: 6 },
                doctorName: 'Dr. สนดล สวัสดิ',
                room: 'ห้อง 1',
                duration: 40,
                price: 0,
                invoiceId: 'INV-0312',
            },
            {
                id: 'S007',
                date: '2026-01-18',
                treatmentName: 'Pico Laser Full Face · ซื้อคอร์ส',
                status: 'completed',
                courseSession: { current: 1, total: 6 },
                isCourseStart: true,
                doctorName: 'Dr. สนดล สวัสดิ',
                room: 'ห้อง 1',
                duration: 45,
                price: 42000,
                invoiceId: 'INV-0285',
            },
            {
                id: 'S008',
                date: '2025-12-22',
                treatmentName: 'คอนซัล + วางแผนการรักษา',
                status: 'free',
                doctorName: 'Dr. สนดล สวัสดิ',
                room: 'ห้องตรวจ',
                duration: 30,
                price: 0,
            },
        ],
    }
}

export function formatThaiDate(isoDate: string): { day: string; month: string; year: string; full: string } {
    const d = new Date(isoDate)
    const thaiMonths = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.']
    const day = d.getDate().toString()
    const month = thaiMonths[d.getMonth()] ?? ''
    const year = (d.getFullYear() + 543).toString()
    return { day, month, year, full: `${day} ${month} ${year}` }
}

export function groupSessionsByYear(sessions: TreatmentSession[]): { year: number; sessions: TreatmentSession[] }[] {
    const map = new Map<number, TreatmentSession[]>()
    for (const s of sessions) {
        const buddhistYear = new Date(s.date).getFullYear() + 543
        if (!map.has(buddhistYear)) map.set(buddhistYear, [])
        map.get(buddhistYear)!.push(s)
    }
    return Array.from(map.entries())
        .sort((a, b) => b[0] - a[0])
        .map(([year, sessions]) => ({ year, sessions }))
}
