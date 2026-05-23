<script setup lang="ts">
    import Overview from '~/components/settings/team/Overview.vue'
    import AddMemberForm from '~/components/settings/team/AddMemberForm.vue'
    import PermissionMatrix from '~/components/settings/team/PermissionMatrix.vue'
    import MemberTable from '~/components/settings/team/MemberTable.vue'
    import Invitations from '~/components/settings/team/Invitations.vue'
    import InvitePreview from '~/components/settings/team/InvitePreview.vue'
    import type { TeamData, MemberFormData } from '~/client/settings'

    definePageMeta({
        layout: 'main',
        middleware: ['auth']
    })

    const toast = useAppToast()

    const { data: settingsData, pending } = useFetch<{ status: string; data: TeamData }>('/api/settings/team')

    const tabs = [
        { key: 'general', label: 'ทั่วไป' },
        { key: 'team', label: 'ทีมงาน & สิทธิ์', badge: '34' },
        { key: 'clinic', label: 'ข้อมูลคลินิก' },
        { key: 'billing', label: 'การชำระเงิน' },
        { key: 'notifications', label: 'การแจ้งเตือน' },
        { key: 'security', label: 'ความปลอดภัย' },
        { key: 'audit', label: 'Audit log' }
    ]
    const activeTab = ref('team')
    const showAddMember = ref(false)

    const form = ref<MemberFormData>({
        title: 'นพ.',
        firstName: '',
        lastName: '',
        nickname: '',
        email: '',
        phone: '',
        licenseNumber: '',
        role: 'หมอ',
        branches: ['มวกเหล็ก (สำนักงานใหญ่)', 'โคราช ซิตี้พลาซ่า'],
        workDays: ['จ', 'อ', 'พ', 'พฤ', 'ศ'],
        startTime: '09:00',
        endTime: '18:00',
        sendInviteEmail: true,
        require2FA: true,
        allowExternalIP: false
    })

    const filledRequiredFields = computed(() => {
        const required = [form.value.firstName, form.value.lastName, form.value.email, form.value.phone, form.value.role]
        return required.filter(Boolean).length
    })

    const teamSeats = computed(() => {
        const ov = settingsData.value?.data.overview
        return {
            doctors: { remaining: ov ? ov.doctors.total - ov.doctors.used : 2 },
            staff: { remaining: ov ? ov.staff.total - ov.staff.used : 2 },
            superAdmins: { remaining: ov?.superAdmins.remaining ?? 2 }
        }
    })

    const handleSendInvite = () => {
        if (filledRequiredFields.value < 5) {
            toast.error('กรอกข้อมูลให้ครบ', `กรุณากรอกฟิลด์บังคับ ${5 - filledRequiredFields.value} ช่องที่เหลือ`, { icon: 'i-lucide-alert-circle' })
            return
        }
        const name = `${form.value.title} ${form.value.firstName} ${form.value.lastName}`.trim()
        toast.success('ส่งคำเชิญสำเร็จ!', `สร้างบัญชีและส่งคำเชิญไปยัง ${form.value.email} เรียบร้อยแล้ว`, { icon: 'i-lucide-send' })
        showAddMember.value = false
    }

    const handleSaveDraft = () => {
        toast.info('บันทึกแบบร่าง', 'บันทึกข้อมูลฟอร์มเรียบร้อยแล้ว', { icon: 'i-lucide-save' })
    }

    const handleExport = () => {
        toast.info('Export รายชื่อ', 'กำลังสร้างไฟล์ CSV รายชื่อสมาชิก...', { icon: 'i-lucide-download' })
    }

    const designCards = [
        {
            num: '01',
            title: 'ภาพรวมทีม',
            desc: 'เห็นจำนวนสมาชิกแต่ละ role และที่นั่ง license ที่เหลือในแต่ละแผนก',
            bullets: ['หมอ / พนักงาน / Super Admin แยกการ์ด', 'เตือนเมื่อใกล้เต็ม license', 'จำนวนคนกำลังออนไลน์']
        },
        {
            num: '02',
            title: 'เพิ่มสมาชิกใหม่',
            desc: 'ฟอร์มเดียวตั้งแต่ข้อมูลตัวตน > role > สาขา > ตารางทำงาน > 2FA',
            bullets: ['3 การ์ดเลือก role พร้อมคำอธิบาย', 'เลือกได้หลายสาขา (chip multi-select)', 'Toggle 2FA และ IP whitelist']
        },
        {
            num: '03',
            title: 'ปรับสิทธิ์รายคน',
            desc: 'Matrix แสดงสิ่งที่สมาชิกคนนี้ทำได้แต่ละโมดูล เริ่มจาก template ของ role แล้วปรับเฉพาะตามต้องการ',
            bullets: ['ดู / แก้ไข / ลบ และ ส่งออก', 'เห็น scope ชัด เฉพาะเคสตัวเอง', 'ไม่กระทบ role template']
        },
        {
            num: '04-05',
            title: 'จัดการทีม และ คำเชิญ',
            desc: 'ตารางสมาชิกทุกคน + คิวคำเชิญรอตอบรับ ดูว่าใครออนไลน์ใครกำลังส่งรูป',
            bullets: ['กรองด้วย role / สาขา', 'ปุ่มส่งซ้ำเมื่อคำเชิญใกล้หมดอายุ', 'Audit log ทุกการเปลี่ยนแปลง']
        }
    ]
</script>

<template>
    <div class="max-w-[1400px] mx-auto px-4 py-6 pb-28 space-y-0">
        <!-- Loading overlay -->
        <div v-if="pending" class="flex items-center justify-center min-h-[60vh]">
            <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 text-indigo-600 animate-spin" />
        </div>

        <template v-else-if="settingsData?.data">
            <!-- ── 2-col layout wraps banner + tabs + content on left, preview on right ── -->
            <div class="flex gap-6 items-start">
                <!-- Left column: banner + tabs + all content -->
                <div class="flex-1 min-w-0 space-y-0">
                    <!-- ── Page Header Banner ── -->
                    <div class="bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 rounded-2xl p-6 text-white shadow-lg shadow-indigo-500/20 relative overflow-hidden mb-6">
                        <div class="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                        <div class="flex items-center justify-between relative z-10">
                            <div class="flex items-center gap-4">
                                <div class="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center">
                                    <UIcon name="i-lucide-users" class="w-7 h-7 text-white" />
                                </div>
                                <div>
                                    <div class="text-xs font-bold text-indigo-200 mb-1">
                                        หน้าแรก
                                        <span class="mx-1.5 opacity-60">›</span>
                                        ตั้งค่า
                                        <span class="mx-1.5 opacity-60">›</span>
                                        ทีมงาน & สิทธิ์
                                    </div>
                                    <h1 class="text-2xl font-black tracking-tight">ตั้งค่าระบบ — ทีมงาน & สิทธิ์</h1>
                                    <p class="text-sm text-indigo-100/90 font-medium mt-1">
                                        จัดการสมาชิกในคลินิก: เพิ่มผู้ใช้ใหม่ · กำหนด role · ควบคุมว่าใครเห็นข้อมูลส่วนไหนได้ · ดูประวัติการเข้าใช้งาน
                                    </p>
                                </div>
                            </div>
                            <div class="flex items-center gap-2 shrink-0">
                                <button
                                    class="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm transition-colors cursor-pointer"
                                    @click="handleExport"
                                >
                                    <UIcon name="i-lucide-download" class="w-4 h-4" />
                                    Export รายชื่อ
                                </button>
                                <button
                                    class="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-indigo-700 font-black text-sm hover:bg-indigo-50 transition-colors cursor-pointer shadow-sm"
                                    @click="showAddMember = !showAddMember"
                                >
                                    <UIcon :name="showAddMember ? 'i-lucide-x' : 'i-lucide-user-plus'" class="w-4 h-4" />
                                    {{ showAddMember ? 'ปิดฟอร์ม' : 'เพิ่มสมาชิก' }}
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- ── Tab bar ── -->
                    <div class="bg-white border-b border-gray-100 mb-6 sticky top-0 z-30 shadow-sm rounded-t-xl">
                        <div class="flex overflow-x-auto scrollbar-hide">
                            <button
                                v-for="tab in tabs"
                                :key="tab.key"
                                class="flex items-center gap-2 px-5 py-3.5 text-sm font-bold whitespace-nowrap border-b-2 transition-colors cursor-pointer shrink-0"
                                :class="activeTab === tab.key
                                    ? 'text-indigo-600 border-indigo-600'
                                    : 'text-gray-500 border-transparent hover:text-gray-700'"
                                @click="activeTab = tab.key"
                            >
                                {{ tab.label }}
                                <span
                                    v-if="tab.badge"
                                    class="text-[10px] font-black px-1.5 py-0.5 rounded-md"
                                    :class="activeTab === tab.key ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-500'"
                                >
                                    {{ tab.badge }}
                                </span>
                            </button>
                        </div>
                    </div>

                    <!-- ── Team tab content ── -->
                    <div v-if="activeTab === 'team'" class="space-y-5">
                        <!-- Section 01: Overview -->
                        <Overview :overview="settingsData.data.overview" />

                        <!-- Section 02: Add Member Form -->
                        <Transition
                            enter-active-class="transition-all duration-300 ease-out"
                            enter-from-class="opacity-0 -translate-y-2"
                            leave-active-class="transition-all duration-200 ease-in"
                            leave-to-class="opacity-0 -translate-y-2"
                        >
                            <AddMemberForm
                                v-if="showAddMember"
                                v-model="form"
                                :team-seats="teamSeats"
                            />
                        </Transition>

                        <!-- Section 03: Permission Matrix (shown when adding member) -->
                        <Transition
                            enter-active-class="transition-all duration-300 ease-out"
                            enter-from-class="opacity-0 -translate-y-2"
                            leave-active-class="transition-all duration-200 ease-in"
                            leave-to-class="opacity-0 -translate-y-2"
                        >
                            <PermissionMatrix
                                v-if="showAddMember"
                                :permissions="settingsData.data.permissions[form.role]"
                                :role="form.role"
                            />
                        </Transition>

                        <!-- Section 04: Member Table -->
                        <MemberTable
                            :members="settingsData.data.members"
                            :total-count="34"
                        />

                        <!-- Section 05: Pending Invitations -->
                        <Invitations :invitations="settingsData.data.invitations" />

                        <!-- Design Summary Cards -->
                        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                            <div class="mb-5">
                                <h2 class="font-black text-gray-900 text-lg">สรุป Design — ทำอะไรในแต่ละส่วน</h2>
                                <p class="text-xs text-gray-400 font-medium mt-1">หน้านี้ตอบโจทย์ "ควบคุมทีมที่ส่งรูปเข้าระบบ" โดยแยกความรับผิดชอบให้ชัดเจน 4 ขั้น</p>
                            </div>
                            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                <div
                                    v-for="card in designCards"
                                    :key="card.num"
                                    class="bg-slate-50 rounded-xl p-4"
                                >
                                    <div class="flex items-center gap-2 mb-3">
                                        <span class="w-6 h-6 rounded-md bg-indigo-100 text-indigo-600 flex items-center justify-center text-[10px] font-black">{{ card.num }}</span>
                                        <span class="font-black text-gray-800 text-sm">{{ card.title }}</span>
                                    </div>
                                    <p class="text-[11px] text-gray-500 font-medium leading-relaxed mb-3">{{ card.desc }}</p>
                                    <ul class="space-y-1">
                                        <li
                                            v-for="bullet in card.bullets"
                                            :key="bullet"
                                            class="text-[10px] text-gray-500 font-medium flex items-start gap-1.5"
                                        >
                                            <span class="text-emerald-500 mt-0.5 shrink-0">·</span>
                                            {{ bullet }}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Other tabs: placeholder -->
                    <div v-else class="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
                        <UIcon name="i-lucide-construction" class="w-10 h-10 text-gray-300 mx-auto mb-3" />
                        <p class="font-bold text-gray-500">{{ tabs.find(t => t.key === activeTab)?.label }}</p>
                        <p class="text-xs text-gray-400 mt-1">หน้านี้อยู่ระหว่างการพัฒนา</p>
                    </div>
                </div>

                <!-- Right column: Sticky preview panel -->
                <div class="w-72 shrink-0 sticky top-6 max-h-[calc(100vh-80px)] overflow-y-auto pb-6 scrollbar-hide">
                    <InvitePreview
                        :form="form"
                        :recent-activity="settingsData.data.recentActivity"
                    />
                </div>
            </div>
        </template>
    </div>

    <!-- ── Bottom Action Bar (fixed, shown when form is open) ── -->
    <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 translate-y-4"
        leave-active-class="transition-all duration-200 ease-in"
        leave-to-class="opacity-0 translate-y-4"
    >
        <div
            v-if="showAddMember"
            class="fixed bottom-0 left-[255px] right-0 z-40 bg-white/95 backdrop-blur-sm border-t border-gray-100 shadow-lg px-6 py-3 flex items-center justify-between"
        >
            <!-- Status -->
            <div class="flex items-center gap-3">
                <div class="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                    <UIcon name="i-lucide-check-circle" class="w-3.5 h-3.5" />
                    ฟอร์มเพิ่มสมาชิกพร้อมส่ง
                </div>
                <span class="text-[11px] text-gray-400 font-medium">·</span>
                <span class="text-[11px] text-gray-500 font-medium">
                    กรอก {{ filledRequiredFields }}/5 ฟิลด์บังคับ
                </span>
            </div>

            <!-- Actions -->
            <div class="flex items-center gap-2">
                <button
                    class="px-4 py-2 text-sm font-bold text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
                    @click="showAddMember = false"
                >
                    ยกเลิก
                </button>
                <button
                    class="px-4 py-2 text-sm font-bold text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors flex items-center gap-1.5"
                    @click="handleSaveDraft"
                >
                    <UIcon name="i-lucide-save" class="w-3.5 h-3.5" />
                    บันทึกแบบร่าง
                </button>
                <button
                    class="px-5 py-2 text-sm font-black text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl cursor-pointer transition-colors shadow-md shadow-indigo-200 flex items-center gap-2"
                    @click="handleSendInvite"
                >
                    <UIcon name="i-lucide-send" class="w-3.5 h-3.5" />
                    ส่งคำเชิญ & สร้างบัญชี
                </button>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
</style>
