export const mockUsers = [
    { id: 1, name: 'จิตราภรณ์ (Admin)', role: 'admin', email: 'admin@avaclinic.com' },
    { id: 2, name: 'ผู้บริหาร (Superadmin)', role: 'superadmin', email: 'super@avaclinic.com' },
    { id: 3, name: 'สมใจ รักดี', role: 'admin', email: 'somjai@avaclinic.com' },
    { id: 4, name: 'หมอโอ๊ค', role: 'doctor', email: 'oak@avaclinic.com' },
    { id: 5, name: 'พยาบาลจอย', role: 'nurse', email: 'joy@avaclinic.com' }
]

export const mockAppointments = [
    {
        id: 1,
        time: '09:00',
        timeNote: '5 ชม. ที่แล้ว',
        isUpcoming: false,
        initials: 'อน',
        avatarColor: 'bg-orange-400',
        customer: 'คุณลินี แสงทอง',
        hn: 'HN 6700821',
        isVip: true,
        isNew: false,
        service: 'Botox Aestox 50u',
        serviceDetail: 'หน้าผาก + หางคิ้ว',
        doctor: 'นพ. นกดล',
        status: 'สำเร็จ',
        badgeColor: 'success'
    },
    {
        id: 2,
        time: '10:30',
        timeNote: '3 ชม. ที่แล้ว',
        isUpcoming: false,
        initials: 'วล',
        avatarColor: 'bg-violet-500',
        customer: 'คุณวิไลพร มั่นคง',
        hn: 'HN 6700944',
        isVip: false,
        isNew: false,
        service: 'Meso Fat Face',
        serviceDetail: 'กรอบหน้า + เหนียง',
        doctor: 'พญ. กัทรลดา',
        status: 'กำลังรอ',
        badgeColor: 'warning'
    },
    {
        id: 3,
        time: '13:00',
        timeNote: 'เริ่มเร็ว ๆ นี้',
        isUpcoming: false,
        initials: 'วช',
        avatarColor: 'bg-teal-500',
        customer: 'คุณวาชิรา ใจกล้า',
        hn: 'HN 6700952',
        isVip: false,
        isNew: true,
        service: 'Consult เลเซอร์',
        serviceDetail: 'ปรึกษาคอร์ส',
        doctor: 'พญ. กัทรลดา',
        status: 'Consult',
        badgeColor: 'info'
    },
    {
        id: 4,
        time: '14:00',
        timeNote: 'อีก 1 ชม.',
        isUpcoming: true,
        initials: 'ธน',
        avatarColor: 'bg-red-400',
        customer: 'คุณธนภูมิ ยิ่งใหญ่',
        hn: 'HN 6700102',
        isVip: true,
        isNew: false,
        service: 'Pico Laser Full Face',
        serviceDetail: 'ครั้งที่ 3 / 6',
        doctor: 'นพ. นกดล',
        status: 'นัดหมาย',
        badgeColor: 'neutral'
    },
    {
        id: 5,
        time: '15:30',
        timeNote: 'อีก 2.5 ชม.',
        isUpcoming: false,
        initials: 'สศ',
        avatarColor: 'bg-amber-500',
        customer: 'คุณสมศักดิ์ ชัดเจน',
        hn: 'HN 6700433',
        isVip: false,
        isNew: false,
        service: 'IV Drip',
        serviceDetail: 'Glutathione + Vit C',
        doctor: 'นพ. ธนกฤต',
        status: 'นัดหมาย',
        badgeColor: 'neutral'
    },
    {
        id: 6,
        time: '16:00',
        timeNote: 'อีก 3 ชม.',
        isUpcoming: false,
        initials: 'วร',
        avatarColor: 'bg-rose-500',
        customer: 'คุณวารี มีสุข',
        hn: 'HN 6700883',
        isVip: false,
        isNew: true,
        service: 'HIFU Full Face',
        serviceDetail: 'ลิฟติ้ง 60 นาที',
        doctor: 'พญ. กัทรลดา',
        status: 'ยกเลิก',
        badgeColor: 'error'
    },
    {
        id: 7,
        time: '17:30',
        timeNote: 'อีก 4.5 ชม.',
        isUpcoming: false,
        initials: 'ปร',
        avatarColor: 'bg-emerald-500',
        customer: 'คุณปริชาติ อภิรักษ์',
        hn: 'HN 6700619',
        isVip: false,
        isNew: false,
        service: 'ร้อยไหม V-shape',
        serviceDetail: 'ใต้คาง 12 เส้น',
        doctor: 'นพ. นกดล',
        status: 'นัดหมาย',
        badgeColor: 'neutral'
    },
    {
        id: 8,
        time: '19:00',
        timeNote: 'อีก 6 ชม.',
        isUpcoming: false,
        initials: 'มน',
        avatarColor: 'bg-green-500',
        customer: 'คุณณนี กานต์ ภูริกัต',
        hn: 'HN 6700751',
        isVip: false,
        isNew: false,
        service: 'Follow-up Filler',
        serviceDetail: 'หลังทำ 14 วัน',
        doctor: 'นพ. นกดล',
        status: 'นัดหมาย',
        badgeColor: 'neutral'
    }
]

export const mockCustomers = [
    {
        id: 1,
        hn: 'CN-00184',
        name: 'พิมลภา จันทร์เพ็ญ',
        age: 35,
        gender: 'หญิง',
        idCard: '1-1004-xxxxx-xx-x',
        phone: '081-234-5678',
        lineId: '@pimonpa',
        note: 'แพ้ Penicillin',
        tags: ['VIP'],
        createdAt: '2024-05-16',
        avatarColor: 'bg-rose-100 text-rose-600'
    },
    {
        id: 2,
        hn: 'CN-00185',
        name: 'สมศักดิ์ ชัดเจน',
        age: 42,
        gender: 'ชาย',
        idCard: '3-1005-xxxxx-xx-x',
        phone: '089-987-6543',
        lineId: '-',
        note: '-',
        tags: ['ลูกค้าใหม่'],
        createdAt: '2024-05-16',
        avatarColor: 'bg-blue-100 text-blue-600'
    },
    {
        id: 3,
        hn: 'CN-00186',
        name: 'วารี มีสุข',
        age: 28,
        gender: 'หญิง',
        idCard: '1-1006-xxxxx-xx-x',
        phone: '082-345-6789',
        lineId: '@waree_m',
        note: 'ความดันต่ำ',
        tags: [],
        createdAt: '2024-05-15',
        avatarColor: 'bg-emerald-100 text-emerald-600'
    },
    {
        id: 4,
        hn: 'CN-00187',
        name: 'นลินี แสงทอง',
        age: 31,
        gender: 'หญิง',
        idCard: '2-1007-xxxxx-xx-x',
        phone: '083-456-7890',
        lineId: 'nalinee.s',
        note: 'ประวัติหอบหืด',
        tags: ['VIP'],
        createdAt: '2024-05-14',
        avatarColor: 'bg-purple-100 text-purple-600'
    },
    {
        id: 5,
        hn: 'CN-00188',
        name: 'ธนภูมิ ยิ่งใหญ่',
        age: 45,
        gender: 'ชาย',
        idCard: '1-1008-xxxxx-xx-x',
        phone: '084-567-8901',
        lineId: '-',
        note: '-',
        tags: [],
        createdAt: '2024-05-12',
        avatarColor: 'bg-amber-100 text-amber-600'
    },
    {
        id: 6,
        hn: 'CN-00189',
        name: 'วิไลพร มั่นคง',
        age: 39,
        gender: 'หญิง',
        idCard: '3-1009-xxxxx-xx-x',
        phone: '085-678-9012',
        lineId: '@wilaiporn',
        note: 'แพ้อาหารทะเล',
        tags: ['ลูกค้าใหม่'],
        createdAt: '2024-05-10',
        avatarColor: 'bg-cyan-100 text-cyan-600'
    },
    {
        id: 7,
        hn: 'CN-00190',
        name: 'ประเสริฐ ดีเลิศ',
        age: 50,
        gender: 'ชาย',
        idCard: '3-1010-xxxxx-xx-x',
        phone: '086-789-0123',
        lineId: 'prasert_d',
        note: '-',
        tags: [],
        createdAt: '2024-05-09',
        avatarColor: 'bg-indigo-100 text-indigo-600'
    },
    {
        id: 8,
        hn: 'CN-00191',
        name: 'ดาริกา สวยสด',
        age: 25,
        gender: 'หญิง',
        idCard: '1-1011-xxxxx-xx-x',
        phone: '087-890-1234',
        lineId: '@darika',
        note: '-',
        tags: ['VIP'],
        createdAt: '2024-05-08',
        avatarColor: 'bg-pink-100 text-pink-600'
    }
]

export const mockReportMetrics = {
    revenue: {
        value: 1247500,
        trend: '+18.4%',
        avg: 89107,
        prevAvg: 75270
    },
    bills: {
        value: 412,
        trend: '+12%',
        prevValue: 368,
        diff: 44
    },
    avgPerBill: {
        value: 3027,
        trend: '+5.8%',
        prevValue: 2862
    },
    newCustomers: {
        value: 86,
        trend: '-3.2%',
        prevValue: 89,
        diff: -3
    }
}

export const mockDailyRevenue = {
    current: [45200, 62300, 38500, 71000, 89400, 55600, 92100, 68000, 103000, 75000, 58900, 128400, 82000, 95100],
    previous: [38000, 52000, 31000, 60000, 75000, 48000, 78000, 59000, 88000, 62000, 48000, 95000, 70000, 82000],
    target: 100000,
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14']
}

export const mockPaymentMethods = [
    { name: 'บัตรเครดิต', amount: 748000, percent: 60, hex: '#4f46e5' },
    { name: 'QR Transfer', amount: 337000, percent: 27, hex: '#10b981' },
    { name: 'เงินสด', amount: 124000, percent: 10, hex: '#f59e0b' },
    { name: 'อื่น ๆ (LINE Pay, พร้อม)', amount: 37000, percent: 3, hex: '#d1d5db' }
]

export const mockTopServices = [
    { id: 1, name: 'Filler Juvederm', revenue: 342000, bills: 42, avg: 8143, progress: 85 },
    { id: 2, name: 'Laser Treatment', revenue: 268500, bills: 68, avg: 3949, progress: 65 },
    { id: 3, name: 'Botox 50 Units', revenue: 198000, bills: 36, avg: 5500, progress: 50 },
    { id: 4, name: 'Acne Course', revenue: 156200, bills: 28, avg: 5579, progress: 40 },
    { id: 5, name: 'Vitamin Drip', revenue: 98400, bills: 76, avg: 1295, progress: 25 }
]

export const mockStaffRevenue = [
    {
        id: 1,
        initial: 'PM',
        name: 'พิมลภา จันทร์เพ็ญ',
        revenue: 542000,
        bills: 186,
        progress: 90,
        color: 'bg-rose-100 text-rose-600',
        barColor: 'bg-indigo-600'
    },
    {
        id: 2,
        initial: 'TD',
        name: 'ธนดล สวัสดี',
        revenue: 398000,
        bills: 142,
        progress: 65,
        color: 'bg-emerald-100 text-emerald-600',
        barColor: 'bg-indigo-500'
    },
    {
        id: 3,
        initial: 'NK',
        name: 'นันทกานต์ ภู่กัน',
        revenue: 216000,
        bills: 68,
        progress: 35,
        color: 'bg-blue-100 text-blue-600',
        barColor: 'bg-indigo-400'
    },
    {
        id: 4,
        initial: 'CK',
        name: 'เฉลิม คงสกุล',
        revenue: 91000,
        bills: 16,
        progress: 15,
        color: 'bg-amber-100 text-amber-600',
        barColor: 'bg-indigo-300'
    }
]

export const mockRecentBills = [
    {
        id: 'INV-0412',
        customer: 'สิรินทร์ รัตนา',
        initial: 'SR',
        color: 'bg-rose-100 text-rose-600',
        service: 'Filler Juvederm',
        serviceCount: 1,
        serviceUnit: 'ครั้ง',
        amount: 28000,
        payment: 'บัตรเครดิต',
        paymentColor: 'bg-purple-100 text-purple-700',
        time: '14:12 น.'
    },
    {
        id: 'INV-0411',
        customer: 'นภาพร แสงมณี',
        initial: 'NP',
        color: 'bg-blue-100 text-blue-600',
        service: 'Laser + Botox 50u',
        serviceCount: 2,
        serviceUnit: 'อย่าง',
        amount: 12500,
        payment: 'QR Transfer',
        paymentColor: 'bg-emerald-100 text-emerald-700',
        time: '14:05 น.'
    },
    {
        id: 'INV-0410',
        customer: 'ธวัชชัย ดีเลิศ',
        initial: 'TD',
        color: 'bg-emerald-100 text-emerald-600',
        service: 'Acne Course',
        serviceCount: 6,
        serviceUnit: 'ครั้ง',
        amount: 5500,
        payment: 'QR Transfer',
        paymentColor: 'bg-emerald-100 text-emerald-700',
        time: '13:48 น.'
    },
    {
        id: 'INV-0409',
        customer: 'วิชัย สุขเกษม',
        initial: 'WS',
        color: 'bg-amber-100 text-amber-600',
        service: 'Vitamin Drip',
        serviceCount: 1,
        serviceUnit: 'ครั้ง',
        amount: 3200,
        payment: 'เงินสด',
        paymentColor: 'bg-amber-100 text-amber-700',
        time: '13:30 น.'
    },
    {
        id: 'INV-0408',
        customer: 'กนกวรรณ ขวัญใจ',
        initial: 'KK',
        color: 'bg-purple-100 text-purple-600',
        service: 'Facial Treatment',
        serviceCount: 1,
        serviceUnit: 'ครั้ง',
        amount: 1500,
        payment: 'บัตรเครดิต',
        paymentColor: 'bg-purple-100 text-purple-700',
        time: '12:55 น.'
    }
]

// --- Teleconsult Mock Data ---
export const mockTeleconsultSummary = {
    activeSessions: 2,
    totalSessions: 14,
    activeRooms: 'ห้อง #042 · #043 · กำลังคุย 12:34',
    waitingCount: 3,
    nextPatientIn: 'คนถัดไปอีก 8 นาที',
    completedToday: 8,
    completedTrend: '+2 vs เมื่อวาน',
    revenueToday: 12800,
    revenueAvg: 1600,
    pingMs: 42,
    totalWaiting: 6,
    activeLiveCount: 2,
    targetRevenue: 18000,
    completedGoal: 16,
    revenuePercent: 71,
    waitingNewCount: 1,
    waitingAvgMin: 3
}

export const mockTeleconsultSchedule = [
    {
        id: 1,
        time: '14:30',
        duration: '30 นาที',
        patient: 'ปทมา คำสิหา',
        initial: 'ปท',
        type: 'Follow-up · ผื่นแพ้ครีม',
        hn: 'HN 6700870',
        status: 'LIVE',
        isVip: true,
        isNew: false
    },
    {
        id: 2,
        time: '14:00',
        duration: '30 นาที',
        patient: 'วิชัย สุขเกษม',
        initial: 'วช',
        type: 'First visit · ปวดศีรษะ',
        hn: 'HN 6700871',
        status: 'LIVE',
        isVip: false,
        isNew: false
    },
    {
        id: 3,
        time: '15:00',
        duration: '30 นาที',
        patient: 'นภาพร แสงมณี',
        initial: 'นภ',
        type: 'Consult · ผลตรวจเลือด',
        hn: 'HN 6700872',
        status: 'WAITING',
        isVip: false,
        isNew: false
    },
    {
        id: 4,
        time: '15:30',
        duration: '15 นาที',
        patient: 'กนกวรรณ ขวัญใจ',
        initial: 'กน',
        type: 'Follow-up · ผลหัตถการ',
        hn: 'HN 6700873',
        status: 'UPCOMING',
        isVip: false,
        isNew: true
    },
    {
        id: 6,
        time: '16:00',
        duration: '45 นาที',
        patient: 'สิรินทร์ รัตนา',
        initial: 'สร',
        type: 'Consult · สอบถามค่าใช้จ่าย',
        hn: 'HN 6700874',
        status: 'UPCOMING',
        isVip: false,
        isNew: false
    },
    {
        id: 5,
        time: '13:30',
        duration: '30 นาที',
        patient: 'ธวัชชัย ดีเลิศ',
        initial: 'ธช',
        type: 'Acne course · 23 นาที · ส่งสรุปแล้ว',
        hn: '',
        status: 'COMPLETED',
        isVip: false,
        isNew: false
    }
]

export const mockTeleconsultWaitingRoom = [
    {
        id: 1,
        patient: 'นภาพร แสงมณี',
        initial: 'NP',
        status: 'รอ 5 นาที · นัด 15:00',
        action: 'รับ',
        color: 'bg-emerald-100 text-emerald-600'
    },
    {
        id: 2,
        patient: 'กนกวรรณ ขวัญใจ',
        initial: 'KK',
        status: 'รอ 2 นาที · นัด 15:30',
        action: 'ทักทาย',
        color: 'bg-purple-100 text-purple-600'
    },
    {
        id: 3,
        patient: 'สิรินทร์ รัตนา',
        initial: 'SR',
        status: 'รอ กล้อง/ไมค์ · นัด 16:00',
        action: 'ช่วยเหลือ',
        color: 'bg-rose-100 text-rose-600'
    }
]

export const mockTeleconsultDoctors = [
    {
        id: 1,
        name: 'Dr. สมศักดิ์ พ.',
        initial: 'สศ',
        specialty: 'นิวหน้า',
        status: 'กำลังตรวจ · ห้อง #042',
        statusColor: 'bg-rose-500',
        cases: 2
    },
    {
        id: 2,
        name: 'Dr. พิมลภา จ.',
        initial: 'พม',
        specialty: 'อายุรกรรม',
        status: 'ว่าง · พร้อมรับเคส',
        statusColor: 'bg-emerald-500',
        cases: 3
    },
    {
        id: 3,
        name: 'Dr. ธนดล ส.',
        initial: 'ธด',
        specialty: 'ความงาม',
        status: 'พัก 15 นาที',
        statusColor: 'bg-amber-500',
        cases: 3
    },
    {
        id: 4,
        name: 'Dr. นันทกานต์ ภ.',
        initial: 'นก',
        specialty: 'จิตเวช',
        status: 'ว่าง · พร้อมรับเคส',
        statusColor: 'bg-emerald-500',
        cases: 0
    }
]

// --- Inventory Mock Data ---
export const mockInventorySummary = {
    totalItems: 248,
    totalValue: 1180000,
    expiringSoon: 12,
    lowStock: 8,
    expiringValue: 24800,
    pendingOrders: 3,
    pendingValue: 82400,
    pendingArrivalDays: 3,
    weeklyUsage: 142800,
    weeklyTrend: '+12%'
}

export const mockInventoryCategories = [
    { name: 'Botulinum Toxin', count: 2, color: '#6366f1' },
    { name: 'Filler / HA', count: 1, color: '#3b82f6' },
    { name: 'Mesotherapy', count: 1, color: '#10b981' },
    { name: 'PDO Thread', count: 1, color: '#06b6d4' },
    { name: 'ยาชา / Anesthetic', count: 2, color: '#f59e0b' },
    { name: 'IV Drip & Vitamin', count: 1, color: '#ec4899' }
]

export const mockInventoryLocations = [
    { name: 'ตู้เย็น A', count: 42 },
    { name: 'ตู้เก็บ B', count: 68 },
    { name: 'ตู้ยา C', count: 96 },
    { name: 'คลังหลัก', count: 42 }
]

export const mockInventoryItems = [
    {
        id: 'INV-001',
        name: 'Botox Aestox 50u',
        brand: 'Aestox',
        type: 'ผง vial',
        category: 'Botulinum Toxin',
        sku: 'BOT-AES-050',
        lot: 'L2403-22',
        lotType: 'Botulinum',
        expiryDate: '18 มิ.ย. 2569',
        daysLeft: 25,
        stock: 3,
        maxStock: 20,
        unit: 'vial',
        location: 'ตู้เย็น A · ชั้น 2',
        temperature: '2-8°C',
        price: 7800,
        iconBg: '#e0e7ff',
        iconColor: '#6366f1'
    },
    {
        id: 'INV-002',
        name: 'HA Filler Juvederm Volift 1ml',
        brand: 'Juvederm',
        type: 'syringe',
        category: 'Filler / HA',
        sku: 'FIL-JUV-V01',
        lot: 'L2402-17',
        lotType: 'Filler',
        expiryDate: '30 พ.ค. 2569',
        daysLeft: 7,
        stock: 1,
        maxStock: 10,
        unit: 'กล่อง',
        location: 'ตู้เย็น A · ชั้น 1',
        temperature: '2-25°C',
        price: 8200,
        iconBg: '#dbeafe',
        iconColor: '#3b82f6'
    },
    {
        id: 'INV-003',
        name: 'Meso Fat Solution PPC',
        brand: 'MesoFat',
        type: 'amp',
        category: 'Mesotherapy',
        sku: 'MSO-FAT-PPC',
        lot: 'L2405-08',
        lotType: 'Mesotherapy',
        expiryDate: '8 ก.ค. 2569',
        daysLeft: 60,
        stock: 6,
        maxStock: 20,
        unit: 'amp',
        location: 'ตู้เก็บ B · ชั้น 1',
        temperature: '2-25°C',
        price: 1200,
        iconBg: '#d1fae5',
        iconColor: '#10b981'
    },
    {
        id: 'INV-004',
        name: 'Glutathione + Vit C IV Drip',
        brand: 'Tatiomax',
        type: 'vial 600mg',
        category: 'IV Drip & Vitamin',
        sku: 'IVD-GLU-600',
        lot: 'L2406-03',
        lotType: 'IV Drip',
        expiryDate: '12 ส.ค. 2569',
        daysLeft: 81,
        stock: 18,
        maxStock: 30,
        unit: 'vial',
        location: 'ตู้เย็น A · ชั้น 3',
        temperature: '2-8°C',
        price: 1280,
        iconBg: '#fce7f3',
        iconColor: '#ec4899'
    },
    {
        id: 'INV-005',
        name: 'Botox Allergan 100u',
        brand: 'Allergan',
        type: 'ผง vial',
        category: 'Botulinum Toxin',
        sku: 'BOT-ALG-100',
        lot: 'L2407-19',
        lotType: 'Botulinum',
        expiryDate: '22 พ.ค. 2570',
        daysLeft: 244,
        stock: 12,
        maxStock: 20,
        unit: 'vial',
        location: 'ตู้เย็น A · ชั้น 2',
        temperature: '2-8°C',
        price: 14800,
        iconBg: '#e0e7ff',
        iconColor: '#6366f1'
    },
    {
        id: 'INV-006',
        name: 'PDO Thread Mono 29G',
        brand: 'MINT',
        type: 'กล่อง 20 เส้น',
        category: 'PDO Thread',
        sku: 'THR-MON-029',
        lot: 'L2403-09',
        lotType: 'Thread',
        expiryDate: '3 ก.ค. 2569',
        daysLeft: 41,
        stock: 4,
        maxStock: 15,
        unit: 'กล่อง',
        location: 'ตู้เก็บ B · ชั้น 2',
        temperature: 'ห้อง',
        price: 2400,
        iconBg: '#cffafe',
        iconColor: '#06b6d4'
    },
    {
        id: 'INV-007',
        name: 'Lidocaine HCL 2%',
        brand: 'Pola Pharma',
        type: 'vial 20ml',
        category: 'ยาชา / Anesthetic',
        sku: 'ANE-LID-002',
        lot: 'L2404-11',
        lotType: 'Anesthetic',
        expiryDate: '15 ก.ค. 2569',
        daysLeft: 53,
        stock: 8,
        maxStock: 30,
        unit: 'vial',
        location: 'ตู้ยา C · ชั้น 1',
        temperature: 'ห้อง',
        price: 180,
        iconBg: '#fef3c7',
        iconColor: '#f59e0b'
    },
    {
        id: 'INV-008',
        name: 'EMLA Cream 5% 30g',
        brand: 'AstraZeneca',
        type: 'หลอด 30g',
        category: 'ยาชา / Anesthetic',
        sku: 'ANE-EML-030',
        lot: 'L2408-01',
        lotType: 'Anesthetic',
        expiryDate: '5 ก.ย. 2570',
        daysLeft: 471,
        stock: 15,
        maxStock: 30,
        unit: 'หลอด',
        location: 'ตู้ยา C · ชั้น 2',
        temperature: 'ห้อง',
        price: 320,
        iconBg: '#fef3c7',
        iconColor: '#f59e0b'
    }
]

export const mockInventoryExpiring = [
    { id: 'INV-002', name: 'HA Filler Juvederm Volift 1ml', lot: 'L2402-17', daysLeft: 7, stock: 1, unit: 'กล่อง' },
    { id: 'INV-001', name: 'Botox Aestox 50u', lot: 'L2403-22', daysLeft: 25, stock: 3, unit: 'vial' },
    { id: 'INV-006', name: 'PDO Thread Mono 29G', lot: 'L2403-09', daysLeft: 41, stock: 4, unit: 'กล่อง' },
    { id: 'INV-003', name: 'Meso Fat Solution PPC', lot: 'L2405-08', daysLeft: 60, stock: 6, unit: 'amp' }
]

export const mockInventoryMovements = [
    {
        id: 'MOV-001',
        type: 'in',
        itemName: 'Botox Allergan 100u',
        amount: 10,
        unit: 'vial',
        by: 'คุณจิตราภรณ์',
        time: '10:32',
        date: 'วันนี้'
    },
    {
        id: 'MOV-002',
        type: 'out',
        itemName: 'HA Filler Juvederm Volift 1ml',
        amount: -1,
        unit: 'กล่อง',
        by: 'Dr. สมตา',
        room: 'ห้อง 2',
        time: '14:08',
        date: 'วันนี้'
    },
    {
        id: 'MOV-003',
        type: 'out',
        itemName: 'Lidocaine HCL 2%',
        amount: -2,
        unit: 'vial',
        by: 'พยาบาลกา',
        room: 'ห้อง 1',
        time: '13:45',
        date: 'วันนี้'
    },
    {
        id: 'MOV-004',
        type: 'adjust',
        itemName: 'PDO Thread Mono 29G',
        amount: -1,
        unit: 'กล่อง',
        by: 'คุณจิตราภรณ์',
        room: 'ของเสีย',
        time: '16:20',
        date: 'เมื่อวาน'
    },
    {
        id: 'MOV-005',
        type: 'in',
        itemName: 'EMLA Cream 5% 30g',
        amount: 15,
        unit: 'หลอด',
        by: 'คุณจิตราภรณ์',
        time: '11:15',
        date: 'เมื่อวาน'
    }
]

export const mockInventoryCategoryValues = [
    { name: 'Botulinum Toxin', value: 186000, color: '#6366f1' },
    { name: 'Filler / HA', value: 142000, color: '#3b82f6' },
    { name: 'IV Drip & Vitamin', value: 105000, color: '#ec4899' },
    { name: 'PDO Thread', value: 72000, color: '#06b6d4' },
    { name: 'Mesotherapy', value: 48000, color: '#10b981' },
    { name: 'ยาชา / Anesthetic', value: 38000, color: '#f59e0b' }
]

export const mockTeleconsultLiveConsult = {
    patientName: 'ปทมา คำสิหา',
    condition: 'ผื่นแพ้ครีม · Follow-up',
    room: '#042',
    doctor: 'Dr. สมศักดิ์',
    duration: '12:34'
}

export const mockTeleconsultStatistics = {
    totalCount: 73,
    trendPercent: '+12.4%',
    avgPerDay: '9.4',
    peakDay: 'สูงสุดวันพุธ',
    chart: [
        { label: 'อา', completed: 5, cancelled: 2 },
        { label: 'จ', completed: 10, cancelled: 1 },
        { label: 'อ', completed: 9, cancelled: 1 },
        { label: 'พ', completed: 11, cancelled: 2 },
        { label: 'พฤ', completed: 7, cancelled: 1 },
        { label: 'ศ', completed: 10, cancelled: 1 },
        { label: 'ส · วันนี้', completed: 10, cancelled: 4, isToday: true }
    ]
}
