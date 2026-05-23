import { simulateDelay } from '../../utils/delay'

export default defineEventHandler(async () => {
    await simulateDelay(300)

    return {
        status: 'success',
        data: {
            overview: {
                totalSeats: 40,
                usedSeats: 34,
                doctors: { used: 8, total: 10, addedThisMonth: 1 },
                staff: { used: 24, total: 26, addedThisMonth: 3 },
                superAdmins: { used: 2, total: 4, remaining: 2 },
                activeNow: 12
            },
            members: [
                { id: 1, name: 'นกดล ศิริพัฒน์', title: 'นพ.', initial: 'นก', avatarColor: 'bg-blue-500 text-white', email: 'napadol.s@avaclinic.co.th', licenseNumber: 'ว.30821', role: 'หมอ', branches: ['มวกเหล็ก', 'โคราช'], lastActive: '5 นาทีที่แล้ว', status: 'online' },
                { id: 2, name: 'กัทรลดา ใจดี', title: 'พญ.', initial: 'พญ', avatarColor: 'bg-pink-500 text-white', email: 'patlada.j@avaclinic.co.th', licenseNumber: 'ว.41205', role: 'หมอ', branches: ['มวกเหล็ก'], lastActive: '22 นาทีที่แล้ว', status: 'online' },
                { id: 3, name: 'มนัสนันท์ ตั้งใจ', title: '', initial: 'มน', avatarColor: 'bg-emerald-500 text-white', email: 'manatsanan@avaclinic.co.th', licenseNumber: '', role: 'พนักงาน', branches: ['มวกเหล็ก'], lastActive: 'ตอนนี้', status: 'online' },
                { id: 4, name: 'อารยา พิทักษ์', title: '', initial: 'อา', avatarColor: 'bg-orange-500 text-white', email: 'araya.p@avaclinic.co.th', licenseNumber: '', role: 'พนักงาน', branches: ['โคราช ซิตี้พลาซ่า'], lastActive: '1 ชม. ที่แล้ว', status: 'away' },
                { id: 5, name: 'ปริชาติ ดวงดี', title: '', initial: 'ปส', avatarColor: 'bg-violet-500 text-white', email: 'parichat@avaclinic.co.th', licenseNumber: '', role: 'Super Admin', branches: ['ทุกสาขา'], lastActive: '10 นาทีที่แล้ว', status: 'online' },
                { id: 6, name: 'วรรณา เลิศศักดิ์', title: 'พญ.', initial: 'วน', avatarColor: 'bg-cyan-500 text-white', email: 'wanna.l@avaclinic.co.th', licenseNumber: 'ว.38922', role: 'หมอ', branches: ['สระบุรี โรบินสัน'], lastActive: '3 ชม. ที่แล้ว', status: 'offline' },
                { id: 7, name: 'ภาณุมาศ ทองคำ', title: '', initial: 'ภม', avatarColor: 'bg-amber-500 text-white', email: 'panumat.t@avaclinic.co.th', licenseNumber: '', role: 'พนักงาน', branches: ['ปากช่อง'], lastActive: 'เมื่อวาน', status: 'offline' },
                { id: 8, name: 'สิทธิชัย อรุณรัตน์', title: 'นพ.', initial: 'สช', avatarColor: 'bg-indigo-500 text-white', email: 'sittichai.a@avaclinic.co.th', licenseNumber: 'ว.52104', role: 'หมอ', branches: ['มวกเหล็ก', 'ปากช่อง'], lastActive: '45 นาทีที่แล้ว', status: 'online' }
            ],
            invitations: [
                { id: 1, email: 'poramet.t@avaclinic.co.th', role: 'พนักงาน', branches: ['โคราช ซิตี้พลาซ่า'], sentBy: 'คุณสดใส', sentAt: 'เมื่อ 12 ชม. ที่แล้ว', expiresIn: 'เหลือ 6 วัน 11 ชม.', expired: false },
                { id: 2, email: 'prawit.r@avaclinic.co.th', role: 'หมอ', branches: ['มวกเหล็ก', 'ปากช่อง'], sentBy: 'คุณปริชาติ', sentAt: 'เมื่อ 3 วันที่แล้ว', expiresIn: 'เหลือ 3 วัน 21 ชม.', expired: false },
                { id: 3, email: 'sukanya.k@avaclinic.co.th', role: 'พนักงาน', branches: ['สระบุรี'], sentBy: 'คุณสดใส', sentAt: 'เมื่อ 9 วันที่แล้ว', expiresIn: 'หมดอายุแล้ว', expired: true }
            ],
            permissions: {
                'หมอ': [
                    { module: 'เวชระเบียน · SOAP', icon: 'i-lucide-file-text', view: 'ทุกเคสที่ดูแล', edit: 'เต็ม', delete: 'ลบไม่ได้', viewColor: 'green', editColor: 'green', deleteColor: 'orange' },
                    { module: 'รูปก่อน-หลัง', icon: 'i-lucide-image', view: 'ทุกเคสที่ดูแล', edit: 'เต็ม', delete: 'ส่งออกได้', viewColor: 'green', editColor: 'green', deleteColor: 'blue' },
                    { module: 'การเงิน · ใบเสร็จ', icon: 'i-lucide-receipt', view: 'เฉพาะเคสตนเอง', edit: 'ไม่มีสิทธิ์', delete: 'ไม่มีสิทธิ์', viewColor: 'orange', editColor: 'gray', deleteColor: 'gray' },
                    { module: 'รายงานยอดขาย', icon: 'i-lucide-bar-chart-2', view: 'สรุปของตัวเอง', edit: 'ไม่มีสิทธิ์', delete: 'ไม่มีสิทธิ์', viewColor: 'orange', editColor: 'gray', deleteColor: 'gray' },
                    { module: 'ตั้งค่าระบบ & user', icon: 'i-lucide-settings', view: 'ไม่มีสิทธิ์', edit: 'ไม่มีสิทธิ์', delete: 'ไม่มีสิทธิ์', viewColor: 'gray', editColor: 'gray', deleteColor: 'gray' },
                    { module: 'Teleconsult / LINE OA', icon: 'i-lucide-video', view: 'เต็ม', edit: 'เต็ม', delete: 'ดาวน์โหลด log', viewColor: 'green', editColor: 'green', deleteColor: 'blue' }
                ],
                'พนักงาน': [
                    { module: 'เวชระเบียน · SOAP', icon: 'i-lucide-file-text', view: 'ทุกเคสในสาขา', edit: 'เพิ่มได้', delete: 'ลบไม่ได้', viewColor: 'green', editColor: 'orange', deleteColor: 'orange' },
                    { module: 'รูปก่อน-หลัง', icon: 'i-lucide-image', view: 'ทุกเคสในสาขา', edit: 'อัปโหลดได้', delete: 'ลบไม่ได้', viewColor: 'green', editColor: 'orange', deleteColor: 'orange' },
                    { module: 'การเงิน · ใบเสร็จ', icon: 'i-lucide-receipt', view: 'ทุกใบเสร็จ', edit: 'เต็ม', delete: 'รายได้ตนเอง', viewColor: 'green', editColor: 'green', deleteColor: 'orange' },
                    { module: 'รายงานยอดขาย', icon: 'i-lucide-bar-chart-2', view: 'สรุปรวม', edit: 'ไม่มีสิทธิ์', delete: 'ไม่มีสิทธิ์', viewColor: 'green', editColor: 'gray', deleteColor: 'gray' },
                    { module: 'ตั้งค่าระบบ & user', icon: 'i-lucide-settings', view: 'ไม่มีสิทธิ์', edit: 'ไม่มีสิทธิ์', delete: 'ไม่มีสิทธิ์', viewColor: 'gray', editColor: 'gray', deleteColor: 'gray' },
                    { module: 'Teleconsult / LINE OA', icon: 'i-lucide-video', view: 'ไม่มีสิทธิ์', edit: 'ไม่มีสิทธิ์', delete: 'ไม่มีสิทธิ์', viewColor: 'gray', editColor: 'gray', deleteColor: 'gray' }
                ],
                'Super Admin': [
                    { module: 'เวชระเบียน · SOAP', icon: 'i-lucide-file-text', view: 'เต็ม', edit: 'เต็ม', delete: 'เต็ม', viewColor: 'green', editColor: 'green', deleteColor: 'green' },
                    { module: 'รูปก่อน-หลัง', icon: 'i-lucide-image', view: 'เต็ม', edit: 'เต็ม', delete: 'เต็ม', viewColor: 'green', editColor: 'green', deleteColor: 'green' },
                    { module: 'การเงิน · ใบเสร็จ', icon: 'i-lucide-receipt', view: 'เต็ม', edit: 'เต็ม', delete: 'เต็ม', viewColor: 'green', editColor: 'green', deleteColor: 'green' },
                    { module: 'รายงานยอดขาย', icon: 'i-lucide-bar-chart-2', view: 'เต็ม', edit: 'เต็ม', delete: 'เต็ม', viewColor: 'green', editColor: 'green', deleteColor: 'green' },
                    { module: 'ตั้งค่าระบบ & user', icon: 'i-lucide-settings', view: 'เต็ม', edit: 'เต็ม', delete: 'เต็ม', viewColor: 'green', editColor: 'green', deleteColor: 'green' },
                    { module: 'Teleconsult / LINE OA', icon: 'i-lucide-video', view: 'เต็ม', edit: 'เต็ม', delete: 'เต็ม', viewColor: 'green', editColor: 'green', deleteColor: 'green' }
                ]
            },
            recentActivity: [
                { id: 1, actor: 'คุณปริชาติ', action: 'เชิญ prawit.r@...', detail: 'role: หมอ · 2 สาขา', time: '2 ชม.', color: 'bg-violet-500' },
                { id: 2, actor: 'คุณสดใส', action: 'ปรับสิทธิ์ พญ. กัทรลดา', detail: 'เพิ่มสิทธิ์ดู report', time: 'เมื่อวาน', color: 'bg-blue-500' },
                { id: 3, actor: 'ระบบ', action: 'ปิดการใช้งาน นายมานพ', detail: 'เก็บข้อมูลย้อนหลัง 90 วัน', time: '2 วัน', color: 'bg-red-500' },
                { id: 4, actor: 'คุณสดใส', action: 'เปิด 2FA แบบบังคับ', detail: 'มีผลกับทุก role', time: '5 วัน', color: 'bg-blue-500' }
            ]
        }
    }
})
