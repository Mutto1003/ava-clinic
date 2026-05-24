import { simulateDelay } from '../../utils/delay'

export default defineEventHandler(async () => {
    await simulateDelay(300)

    return {
        status: 'success',
        data: {
            currentPlan: 'professional',
            billingCycle: 'monthly',
            plans: [
                {
                    key: 'starter',
                    name: 'STARTER',
                    priceMonthly: 1490,
                    priceYearly: 1266,
                    tagline: 'คลินิกเริ่มต้น 1 สาขา · พนักงานไม่เกิน 5 คน',
                    features: ['ลูกค้าไม่จำกัด', 'นัดหมาย & POS', 'คลังสินค้าพื้นฐาน', 'รายงานพื้นฐาน', 'ใช้งาน Email Support'],
                    isCurrent: false,
                    isPopular: false
                },
                {
                    key: 'professional',
                    name: 'PROFESSIONAL',
                    priceMonthly: 3990,
                    priceYearly: 3391,
                    tagline: 'สำหรับคลินิกขนาดกลาง 1-3 สาขา · พนักงาน 30 คน',
                    features: ['ทุกฟีเจอร์ใน Starter', 'Teleconsult ไม่จำกัด', 'รายงานเชิงลึก & Export', 'E-Tax Invoice', 'สายด่วนถึง 3 แห่ง', 'Priority Support 24/7'],
                    isCurrent: true,
                    isPopular: true
                },
                {
                    key: 'enterprise',
                    name: 'ENTERPRISE',
                    priceMonthly: 0,
                    priceYearly: 0,
                    tagline: 'เครือคลินิก หลายสาขา · API & SLA · ใบเสบา ราคาเฉพาะ',
                    features: ['ทุกฟีเจอร์ใน Pro', 'สายด่วนไม่จำกัด', 'API & Webhooks', 'Dedicated CSM', 'SLA 99.9%', 'Single Sign-On (SSO)'],
                    isCurrent: false,
                    isPopular: false
                }
            ],
            usage: [
                { label: 'สาขาที่ใช้งาน', used: 3, total: 3, unit: 'สาขา', unlimited: false, warningThreshold: 100 },
                { label: 'พนักงานที่ใช้งาน', used: 18, total: 30, unit: 'คน', unlimited: false, warningThreshold: 80 },
                { label: 'Teleconsult เซสชัน (เดือนนี้)', used: 142, total: null, unit: 'เซสชัน', unlimited: true, warningThreshold: 80 },
                { label: 'พื้นที่เก็บข้อมูล', used: 8.2, total: 50, unit: 'GB', unlimited: false, warningThreshold: 80 }
            ],
            paymentChannels: [
                {
                    id: 'promptpay',
                    name: 'PromptPay QR',
                    slug: 'promptpay',
                    provider: null,
                    fee: 'ฟรี ค่าธรรมเนียม',
                    feeNote: 'พร้อมจ่ายโดยอัตโนมัติ · หมายเลข 0-2123-4567',
                    enabled: true,
                    isDefault: true,
                    isPending: false,
                    color: 'bg-emerald-500',
                    initials: 'QR'
                },
                {
                    id: 'card',
                    name: 'บัตรเครดิต / เดบิต',
                    slug: 'card',
                    provider: 'Omise · 2GBP',
                    fee: '2.95% + ฿10',
                    feeNote: 'Visa · Mastercard · JCB',
                    enabled: true,
                    isDefault: false,
                    isPending: false,
                    color: 'bg-blue-600',
                    initials: 'VISA'
                },
                {
                    id: 'bank_transfer',
                    name: 'โอนผ่านธนาคาร',
                    slug: 'bank_transfer',
                    provider: 'SCB · 123-4-56789-0',
                    fee: 'ไม่มีค่าธรรมเนียม',
                    feeNote: 'ต้องอัปโหลดสลิปยืนยัน',
                    enabled: true,
                    isDefault: false,
                    isPending: false,
                    color: 'bg-violet-600',
                    initials: 'SCB'
                },
                {
                    id: 'cash',
                    name: 'เงินสดที่หน้าร้าน',
                    slug: 'cash',
                    provider: null,
                    fee: 'ไม่มีค่าธรรมเนียม',
                    feeNote: 'รับเงินเคาน์เตอร์ · ออกใบเสร็จได้ทันที',
                    enabled: true,
                    isDefault: false,
                    isPending: false,
                    color: 'bg-amber-500',
                    initials: 'B'
                },
                {
                    id: 'line_pay',
                    name: 'LINE Pay',
                    slug: 'line_pay',
                    provider: 'ผ่านบัญชี LINE OA',
                    fee: '2.5%',
                    feeNote: null,
                    enabled: false,
                    isDefault: false,
                    isPending: true,
                    color: 'bg-green-500',
                    initials: 'LINE'
                },
                {
                    id: 'shopee_pay',
                    name: 'Shopee Pay',
                    slug: 'shopee_pay',
                    provider: null,
                    fee: '2.5%',
                    feeNote: null,
                    enabled: false,
                    isDefault: false,
                    isPending: true,
                    color: 'bg-orange-500',
                    initials: 'SP'
                }
            ],
            receiptFormat: {
                prefix: 'INV-',
                startNumber: '0001',
                locale: 'th',
                template: 'violet',
                footerNote: 'ขอบคุณที่ใช้บริการ — สอบถามเพิ่มเติม LINE @avaclinic · เก็บใบเสร็จไว้เป็นหลักฐานในการรับบริการครั้งต่อไป'
            },
            invoices: [
                { id: 'INV-2026-05', plan: 'แผน Professional', period: 'พ.ค. 2026 · 30 บัญชี · 3 สาขา', date: '01 พ.ค. 2026', amount: 3990, status: 'paid' },
                { id: 'INV-2026-04', plan: 'แผน Professional', period: 'เม.ย. 2026 · 28 บัญชี · 3 สาขา', date: '01 เม.ย. 2026', amount: 3990, status: 'paid' },
                { id: 'INV-2026-03', plan: 'แผน Professional + Add-on Storage', period: 'มี.ค. 2026 · 25 บัญชี · 3 สาขา', date: '01 มี.ค. 2026', amount: 4490, status: 'paid' },
                { id: 'INV-2026-02', plan: 'แผน Professional', period: 'ก.พ. 2026 · 24 บัญชี · 2 สาขา', date: '01 ก.พ. 2026', amount: 3990, status: 'paid' },
                { id: 'INV-2026-01', plan: 'แผน Professional', period: 'ม.ค. 2026 · 22 บัญชี · 2 สาขา', date: '01 ม.ค. 2026', amount: 3990, status: 'paid' }
            ],
            nextBillingAmount: 3990,
            nextBillingDate: '01 มิ.ย. 2026',
            storedPaymentMethods: [
                { id: 'pm_visa', type: 'card', label: 'บัตรเครดิต Visa **2847', detail: 'หมดอายุ 08/27 · บัตรหลัก', expiry: '08/27', initials: 'VISA', color: 'bg-blue-600' },
                { id: 'pm_scb', type: 'bank', label: 'SCB One · 123-4-56789-0', detail: 'ชื่อบัญชี: บริษัท เอวา คลินิก จำกัด', expiry: null, initials: 'SCB', color: 'bg-violet-600' }
            ],
            accountCredit: 2400,
            currentCharges: {
                plan: 3990,
                addOnStorage: 0,
                smsReminder: { used: 0, limit: 500, free: true }
            }
        }
    }
})
