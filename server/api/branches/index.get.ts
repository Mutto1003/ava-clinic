import { simulateDelay } from '../../utils/delay'

export default defineEventHandler(async () => {
    await simulateDelay(300)

    return {
        status: 'success',
        data: {
            branches: [
                {
                    id: 1,
                    name: 'สาขาเลย',
                    shortCode: 'L',
                    fullTitle: 'สาขาเลย — สำนักงานใหญ่',
                    tagLabel: 'สำนักงานใหญ่',
                    tagType: 'hq',
                    district: 'อ.เมืองเลย',
                    yearOpen: 2562,
                    colorClass: 'bg-emerald-500',
                    isLive: true,
                    isPending: false,
                    address: 'เลขที่ 88/3 ถนนเจริญรัฐ ต.กุดป่อง อ.เมืองเลย จ.เลย 42000',
                    coordinates: { lat: 17.486, lng: 101.7223 },
                    teamCount: 14,
                    queueToday: 38,
                    photoThisMonth: 126,
                    liveStats: {
                        queueWaiting: 14,
                        avgWaitMin: 12,
                        teamOnline: 6,
                        teamTotal: 14,
                        photosToday: 34,
                        photosTodayChange: 18,
                        storageGb: 2.1,
                        storageTotalGb: 20
                    },
                    businessHours: [
                        { day: 'จันทร์', open: true, start: '09:00', end: '20:00', isToday: false },
                        { day: 'อังคาร', open: true, start: '09:00', end: '20:00', isToday: false },
                        { day: 'พุธ', open: true, start: '09:00', end: '20:00', isToday: false },
                        { day: 'พฤหัสบดี', open: true, start: '09:00', end: '20:00', isToday: true },
                        { day: 'ศุกร์', open: true, start: '09:00', end: '21:00', isToday: false },
                        { day: 'เสาร์', open: true, start: '10:00', end: '21:00', isToday: false },
                        { day: 'อาทิตย์', open: false, start: '', end: '', isToday: false }
                    ],
                    facilities: {
                        examRooms: { count: 5, detail: 'ห้องหัตถการ 2 · ห้องเลเซอร์ 2 · ห้องให้คำปรึกษา 1' },
                        waitingSeats: { count: 18, detail: '+ มุมเด็กเล่น & ห้องน้ำ 2 จุด' },
                        parking: { count: 22, detail: 'รถยนต์ 18 · รถจักรยานยนต์ 4 · ฟรี' },
                        manager: { name: 'คุณสดใส วรรณกร', phone: '081-489-2207', line: '@sodsai' }
                    },
                    contacts: [
                        { name: 'สดใส วรรณกร', initials: 'สด', role: 'ผู้จัดการสาขา · เจ้าของ', colorClass: 'bg-blue-500' },
                        { name: 'นพ.นกดล ศิริพัฒน์', initials: 'นก', role: 'หัวหน้าทีมแพทย์', colorClass: 'bg-indigo-500' },
                        { name: 'อารยา พิกัษ์', initials: 'อ', role: 'หัวหน้าเคาน์เตอร์ กะเช้า', colorClass: 'bg-violet-500' }
                    ],
                    equipment: [
                        { name: 'เครื่องเลเซอร์ Pico', status: 'ready', note: null },
                        { name: 'HIFU Ultraformer III', status: 'ready', note: null },
                        { name: 'เครื่อง RF Thermage', status: 'maintenance', note: null },
                        { name: 'กล้องวิเคราะห์ผิว Visia', status: 'ready', note: null },
                        { name: 'ตู้แช่ผลิตภัณฑ์', status: 'ready', note: '4°C' }
                    ]
                },
                {
                    id: 2,
                    name: 'สาขาเมืองทองธานี',
                    shortCode: 'MT',
                    fullTitle: 'สาขาเมืองทองธานี',
                    tagLabel: 'สาขาใหม่',
                    tagType: 'new',
                    district: 'นนทบุรี',
                    yearOpen: 2566,
                    colorClass: 'bg-indigo-600',
                    isLive: true,
                    isPending: false,
                    address: '50 ถนนแจ้งวัฒนะ ต.บางพูด อ.ปากเกร็ด จ.นนทบุรี 11120',
                    coordinates: { lat: 13.9205, lng: 100.5525 },
                    teamCount: 11,
                    queueToday: 52,
                    photoThisMonth: 214,
                    liveStats: {
                        queueWaiting: 21,
                        avgWaitMin: 18,
                        teamOnline: 8,
                        teamTotal: 11,
                        photosToday: 58,
                        photosTodayChange: 32,
                        storageGb: 5.4,
                        storageTotalGb: 20
                    },
                    businessHours: [
                        { day: 'จันทร์', open: true, start: '09:00', end: '21:00', isToday: false },
                        { day: 'อังคาร', open: true, start: '09:00', end: '21:00', isToday: false },
                        { day: 'พุธ', open: true, start: '09:00', end: '21:00', isToday: false },
                        { day: 'พฤหัสบดี', open: true, start: '09:00', end: '21:00', isToday: true },
                        { day: 'ศุกร์', open: true, start: '09:00', end: '21:00', isToday: false },
                        { day: 'เสาร์', open: true, start: '10:00', end: '22:00', isToday: false },
                        { day: 'อาทิตย์', open: true, start: '10:00', end: '22:00', isToday: false }
                    ],
                    facilities: {
                        examRooms: { count: 7, detail: 'ห้องหัตถการ 3 · ห้องเลเซอร์ 3 · ห้องให้คำปรึกษา 1' },
                        waitingSeats: { count: 30, detail: '+ มุมกาแฟ & ห้องน้ำ 4 จุด' },
                        parking: { count: 80, detail: 'ที่จอดรถห้าง ImPact เมืองทอง · บัตรลด 3 ชม.' },
                        manager: { name: 'คุณวาสนา ทองดี', phone: '081-234-5678', line: '@wasana_mt' }
                    },
                    contacts: [
                        { name: 'วาสนา ทองดี', initials: 'วา', role: 'ผู้จัดการสาขา', colorClass: 'bg-indigo-500' },
                        { name: 'นพ.ชัยวัฒน์ สุขใจ', initials: 'ชั', role: 'หัวหน้าทีมแพทย์', colorClass: 'bg-blue-500' },
                        { name: 'ปิยะ มั่นคง', initials: 'ปิ', role: 'หัวหน้าเคาน์เตอร์', colorClass: 'bg-cyan-500' }
                    ],
                    equipment: [
                        { name: 'เครื่องเลเซอร์ Pico Plus', status: 'ready', note: null },
                        { name: 'HIFU Ultraformer III', status: 'ready', note: null },
                        { name: 'เครื่อง CO2 Fractional', status: 'ready', note: null },
                        { name: 'กล้องวิเคราะห์ผิว Visia', status: 'ready', note: null },
                        { name: 'ตู้แช่ผลิตภัณฑ์', status: 'ready', note: '4°C' }
                    ]
                },
                {
                    id: 3,
                    name: 'สาขาอมตะ ชลบุรี',
                    shortCode: 'AC',
                    fullTitle: 'สาขาอมตะ ชลบุรี',
                    tagLabel: 'สาขาในนิคม',
                    tagType: 'pending',
                    district: 'อ.เมืองชลบุรี',
                    yearOpen: 2567,
                    colorClass: 'bg-emerald-500',
                    isLive: false,
                    isPending: true,
                    address: '700/6 ถนนสุขุมวิท ต.หนองไม้แดง อ.เมือง จ.ชลบุรี 20000',
                    coordinates: { lat: 13.3621, lng: 100.9847 },
                    teamCount: 9,
                    queueToday: 27,
                    photoThisMonth: 88,
                    liveStats: {
                        queueWaiting: 8,
                        avgWaitMin: 9,
                        teamOnline: 5,
                        teamTotal: 9,
                        photosToday: 19,
                        photosTodayChange: -4,
                        storageGb: 1.2,
                        storageTotalGb: 20
                    },
                    businessHours: [
                        { day: 'จันทร์', open: true, start: '08:00', end: '17:00', isToday: false },
                        { day: 'อังคาร', open: true, start: '08:00', end: '17:00', isToday: false },
                        { day: 'พุธ', open: true, start: '08:00', end: '17:00', isToday: false },
                        { day: 'พฤหัสบดี', open: true, start: '08:00', end: '17:00', isToday: true },
                        { day: 'ศุกร์', open: true, start: '08:00', end: '17:00', isToday: false },
                        { day: 'เสาร์', open: false, start: '', end: '', isToday: false },
                        { day: 'อาทิตย์', open: false, start: '', end: '', isToday: false }
                    ],
                    facilities: {
                        examRooms: { count: 3, detail: 'ห้องหัตถการ 1 · ห้องเลเซอร์ 1 · ห้องให้คำปรึกษา 1' },
                        waitingSeats: { count: 12, detail: '+ ห้องน้ำ 1 จุด' },
                        parking: { count: 40, detail: 'ที่จอดรถในนิคม · ฟรีสำหรับลูกค้า' },
                        manager: { name: 'คุณธนภัทร คงดี', phone: '082-345-6789', line: '@thanapat_ac' }
                    },
                    contacts: [
                        { name: 'ธนภัทร คงดี', initials: 'ธน', role: 'ผู้จัดการสาขา', colorClass: 'bg-emerald-500' },
                        { name: 'พญ.สุภาพร รักดี', initials: 'สุ', role: 'แพทย์ประจำสาขา', colorClass: 'bg-teal-500' }
                    ],
                    equipment: [
                        { name: 'เครื่องเลเซอร์ Diode', status: 'ready', note: null },
                        { name: 'เครื่อง RF Thermage', status: 'maintenance', note: null },
                        { name: 'กล้องวิเคราะห์ผิว', status: 'ready', note: null },
                        { name: 'ตู้แช่ผลิตภัณฑ์', status: 'ready', note: '4°C' }
                    ]
                }
            ],
            team: [
                {
                    id: 1,
                    name: 'มนัสนันท์ ตั้งใจ',
                    initials: 'มน',
                    colorClass: 'bg-emerald-500',
                    position: 'พยาบาล',
                    startLabel: 'เริ่ม มี.ค. 2566',
                    role: 'staff',
                    isNew: false,
                    photosLast30: 248,
                    photosProgress: 85,
                    casesManaged: 43,
                    status: 'uploading'
                },
                {
                    id: 2,
                    name: 'นพ. นกดล ศิริพัฒน์',
                    initials: 'นก',
                    colorClass: 'bg-indigo-500',
                    position: 'แพทย์เวชศาสตร์ความงาม · ว.30821',
                    startLabel: 'เริ่ม ม.ค. 2565',
                    role: 'doctor',
                    isNew: false,
                    photosLast30: 186,
                    photosProgress: 65,
                    casesManaged: 67,
                    status: 'checking'
                },
                {
                    id: 3,
                    name: 'ชนิกานต์ กูริกัต',
                    initials: 'ชน',
                    colorClass: 'bg-amber-500',
                    position: 'พยาบาล',
                    startLabel: 'เริ่ม 1 มิ.ย. 2569',
                    role: 'staff',
                    isNew: true,
                    photosLast30: null,
                    photosProgress: 0,
                    casesManaged: 0,
                    status: 'pending-invite'
                },
                {
                    id: 4,
                    name: 'พญ. กัทรลดา ใจดี',
                    initials: 'พญ',
                    colorClass: 'bg-violet-500',
                    position: 'แพทย์ผิวหนัง · ว.41205',
                    startLabel: 'เริ่ม ก.พ. 2566',
                    role: 'doctor',
                    isNew: false,
                    photosLast30: 142,
                    photosProgress: 50,
                    casesManaged: 51,
                    status: 'online'
                },
                {
                    id: 5,
                    name: 'กฤษณา วรพินิจ',
                    initials: 'กฤ',
                    colorClass: 'bg-teal-500',
                    position: 'ช่างภาพ / คอนเทนต์',
                    startLabel: 'เริ่ม ส.ค. 2566',
                    role: 'staff',
                    isNew: false,
                    photosLast30: 118,
                    photosProgress: 40,
                    casesManaged: null,
                    status: 'break'
                },
                {
                    id: 6,
                    name: 'สุดารัตน์ พิมพ์ใจ',
                    initials: 'สุ',
                    colorClass: 'bg-pink-500',
                    position: 'พยาบาล',
                    startLabel: 'เริ่ม เม.ย. 2567',
                    role: 'staff',
                    isNew: false,
                    photosLast30: 94,
                    photosProgress: 33,
                    casesManaged: 28,
                    status: 'offline'
                }
            ],
            queue: [
                {
                    id: 1,
                    caseCode: 'CN-00187',
                    treatmentName: 'ฉีดฟิลเลอร์ใต้ตา',
                    photoType: 'หลัง',
                    photoTypeNote: '1 สัปดาห์',
                    uploadedBy: 'มนัสนันท์',
                    assignedDoctor: 'หมอ นกดล',
                    photoCount: 4,
                    sizeMb: 12.4,
                    uploadProgress: 74,
                    status: 'uploading',
                    bgColor: 'bg-violet-50',
                    iconBg: 'bg-violet-100',
                    iconColor: 'text-violet-500'
                },
                {
                    id: 2,
                    caseCode: 'CN-00204',
                    treatmentName: 'เลเซอร์รักษาสิว',
                    photoType: 'ก่อนทำ',
                    photoTypeNote: null,
                    uploadedBy: 'กฤษณา',
                    assignedDoctor: 'หมอ กัทรลดา',
                    photoCount: 6,
                    sizeMb: 28.1,
                    uploadProgress: 42,
                    status: 'uploading',
                    bgColor: 'bg-rose-50',
                    iconBg: 'bg-rose-100',
                    iconColor: 'text-rose-500'
                },
                {
                    id: 3,
                    caseCode: 'CN-00198',
                    treatmentName: 'ร้อยไหม V-shape',
                    photoType: 'ระหว่างทำ',
                    photoTypeNote: null,
                    uploadedBy: 'มนัสนันท์',
                    assignedDoctor: 'หมอ นกดล',
                    photoCount: 8,
                    sizeMb: 41,
                    uploadProgress: 100,
                    status: 'done',
                    bgColor: 'bg-emerald-50',
                    iconBg: 'bg-emerald-100',
                    iconColor: 'text-emerald-500'
                },
                {
                    id: 4,
                    caseCode: 'CN-00202',
                    treatmentName: 'Botox หน้าผาก',
                    photoType: 'ก่อนทำ',
                    photoTypeNote: null,
                    uploadedBy: 'กฤษณา',
                    assignedDoctor: null,
                    photoCount: 3,
                    sizeMb: 9.2,
                    uploadProgress: 0,
                    status: 'no-doctor',
                    bgColor: 'bg-amber-50',
                    iconBg: 'bg-amber-100',
                    iconColor: 'text-amber-500'
                }
            ]
        }
    }
})
