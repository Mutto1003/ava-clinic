<script setup lang="ts">
    import Overview from '~/components/settings/team/Overview.vue'
    import AddMemberForm from '~/components/settings/team/AddMemberForm.vue'
    import PermissionMatrix from '~/components/settings/team/PermissionMatrix.vue'
    import MemberTable from '~/components/settings/team/MemberTable.vue'
    import Invitations from '~/components/settings/team/Invitations.vue'
    import InvitePreview from '~/components/settings/team/InvitePreview.vue'
    import BrandIdentity from '~/components/settings/clinic/BrandIdentity.vue'
    import LicenseInfo from '~/components/settings/clinic/LicenseInfo.vue'
    import ContactChannels from '~/components/settings/clinic/ContactChannels.vue'
    import BranchList from '~/components/settings/clinic/BranchList.vue'
    import BusinessHours from '~/components/settings/clinic/BusinessHours.vue'
    import Services from '~/components/settings/clinic/Services.vue'
    import ClinicLivePreview from '~/components/settings/clinic/ClinicLivePreview.vue'
    import UsagePlan from '~/components/settings/billing/UsagePlan.vue'
    import CurrentUsage from '~/components/settings/billing/CurrentUsage.vue'
    import PaymentChannels from '~/components/settings/billing/PaymentChannels.vue'
    import ReceiptFormat from '~/components/settings/billing/ReceiptFormat.vue'
    import BillingHistory from '~/components/settings/billing/BillingHistory.vue'
    import BillingSidebar from '~/components/settings/billing/BillingSidebar.vue'
    import type { TeamData, MemberFormData, ClinicData, BillingData } from '~/client/settings'

    definePageMeta({
        layout: 'main',
        middleware: ['auth']
    })

    const toast = useAppToast()

    const { data: settingsData, pending } = useFetch<{ status: string; data: TeamData }>('/api/settings/team')
    const { data: clinicRaw, pending: clinicPending } = useFetch<{ status: string; data: ClinicData }>('/api/settings/clinic')

    const clinicForm = ref<ClinicData | null>(null)
    const clinicDirtyCount = ref(0)
    const clinicSaveTimer = ref<ReturnType<typeof setInterval> | null>(null)
    const clinicSaveCountdown = ref(0)
    const clinicSaving = ref(false)

    watch(clinicRaw, (val) => {
        if (val?.data) clinicForm.value = JSON.parse(JSON.stringify(val.data))
    }, { immediate: true })

    watch(clinicForm, () => {
        if (!clinicRaw.value?.data || !clinicForm.value) return
        clinicDirtyCount.value = countDirtyFields(clinicRaw.value.data, clinicForm.value)
        if (clinicDirtyCount.value > 0) startAutoSaveTimer()
    }, { deep: true })

    function countDirtyFields(orig: ClinicData, form: ClinicData): number {
        let count = 0
        const flatOrig = flatObj(orig)
        const flatForm = flatObj(form)
        for (const k in flatForm) {
            if (JSON.stringify(flatOrig[k]) !== JSON.stringify(flatForm[k])) count++
        }
        return count
    }

    function flatObj(obj: object, prefix = ''): Record<string, unknown> {
        return Object.entries(obj).reduce((acc, [k, v]) => {
            const key = prefix ? `${prefix}.${k}` : k
            if (v && typeof v === 'object' && !Array.isArray(v)) Object.assign(acc, flatObj(v as object, key))
            else acc[key] = v
            return acc
        }, {} as Record<string, unknown>)
    }

    function startAutoSaveTimer() {
        if (clinicSaveTimer.value) return
        clinicSaveCountdown.value = 28
        clinicSaveTimer.value = setInterval(() => {
            clinicSaveCountdown.value--
            if (clinicSaveCountdown.value <= 0) stopAutoSaveTimer()
        }, 1000)
    }

    function stopAutoSaveTimer() {
        if (clinicSaveTimer.value) clearInterval(clinicSaveTimer.value)
        clinicSaveTimer.value = null
    }

    async function handleClinicSave() {
        clinicSaving.value = true
        stopAutoSaveTimer()
        await new Promise((r) => setTimeout(r, 600))
        if (clinicRaw.value && clinicForm.value) {
            clinicRaw.value.data = JSON.parse(JSON.stringify(clinicForm.value))
        }
        clinicDirtyCount.value = 0
        clinicSaving.value = false
        toast.success('บันทึกสำเร็จ', 'ข้อมูลคลินิกถูกบันทึกเรียบร้อยแล้ว', { icon: 'i-lucide-check-circle' })
    }

    function handleClinicDiscard() {
        if (clinicRaw.value?.data) clinicForm.value = JSON.parse(JSON.stringify(clinicRaw.value.data))
        clinicDirtyCount.value = 0
        stopAutoSaveTimer()
    }

    onUnmounted(() => stopAutoSaveTimer())

    // ── Billing ──────────────────────────────────────────────────────────────
    const { data: billingRaw, pending: billingPending } = useFetch<{ status: string; data: BillingData }>('/api/settings/billing')
    const billingForm = ref<BillingData | null>(null)
    const billingSaving = ref(false)

    watch(billingRaw, (val) => {
        if (val?.data) billingForm.value = JSON.parse(JSON.stringify(val.data))
    }, { immediate: true })

    async function handleBillingSave() {
        if (!billingForm.value) return
        billingSaving.value = true
        await $fetch('/api/settings/billing', { method: 'PUT', body: billingForm.value })
        billingSaving.value = false
        toast.success('บันทึกสำเร็จ', 'ตั้งค่าการชำระเงินถูกบันทึกเรียบร้อยแล้ว', { icon: 'i-lucide-check-circle' })
    }

    function handleChangePlan(plan: BillingData['currentPlan']) {
        if (!billingForm.value) return
        toast.info('เปลี่ยนแผน', `กำลังดำเนินการเปลี่ยนไปยังแผน ${plan}`, { icon: 'i-lucide-refresh-cw' })
    }

    function handleExportBillingCsv() {
        toast.info('Export CSV', 'กำลังสร้างไฟล์ประวัติการชำระเงิน...', { icon: 'i-lucide-download' })
    }

    const tabs = [
        { key: 'general', label: 'ทั่วไป' },
        { key: 'team', label: 'ทีมงาน & สิทธิ์', badge: '34' },
        { key: 'clinic', label: 'ข้อมูลคลินิก' },
        { key: 'billing', label: 'การชำระเงิน' },
        { key: 'notifications', label: 'การแจ้งเตือน' },
        { key: 'security', label: 'ความปลอดภัย' },
        { key: 'audit', label: 'Audit log' }
    ]
    const activeTab = ref('clinic')
    const showAddMember = ref(false)

    function switchTab(key: string) {
        activeTab.value = key
        if (import.meta.client) window.scrollTo(0, 0)
    }

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

    type TabHeaderAction = { label: string; icon: string; style: 'outline' | 'solid'; onClick: () => void }
    type TabHeaderConfig = {
        icon: string
        breadcrumb: string
        title: string
        description: string
        actions: TabHeaderAction[]
    }

    const tabHeaderConfig = computed<TabHeaderConfig>(() => {
        switch (activeTab.value) {
            case 'team':
                return {
                    icon: 'i-lucide-users',
                    breadcrumb: 'ทีมงาน & สิทธิ์',
                    title: 'ตั้งค่าระบบ — ทีมงาน & สิทธิ์',
                    description: 'จัดการสมาชิกในคลินิก: เพิ่มผู้ใช้ใหม่ · กำหนด role · ควบคุมว่าใครเห็นข้อมูลส่วนไหนได้ · ดูประวัติการเข้าใช้งาน',
                    actions: [
                        { label: 'Export รายชื่อ', icon: 'i-lucide-download', style: 'outline', onClick: handleExport },
                        { label: showAddMember.value ? 'ปิดฟอร์ม' : 'เพิ่มสมาชิก', icon: showAddMember.value ? 'i-lucide-x' : 'i-lucide-user-plus', style: 'solid', onClick: () => { showAddMember.value = !showAddMember.value } }
                    ]
                }
            case 'clinic':
                return {
                    icon: 'i-lucide-settings',
                    breadcrumb: 'ข้อมูลคลินิก',
                    title: 'ตั้งค่าระบบ — ข้อมูลคลินิก',
                    description: 'โลโก้ · ชื่อทางการค้า · เลขผู้เสียภาษี · สาขา · เวลาทำการ — ใช้แสดงบนใบเสร็จ ใบรับรอง และระบบจองออนไลน์',
                    actions: [
                        { label: 'ดูตัวอย่าง', icon: 'i-lucide-eye', style: 'outline', onClick: () => {} },
                        { label: 'บันทึก', icon: 'i-lucide-save', style: 'solid', onClick: handleClinicSave }
                    ]
                }
            case 'billing':
                return {
                    icon: 'i-lucide-credit-card',
                    breadcrumb: 'การชำระเงิน',
                    title: 'ตั้งค่าระบบ — การชำระเงิน',
                    description: 'จัดการแผนการใช้งาน · ช่องทางชำระเงิน · ใบเสร็จ และ invoice ของคลินิก',
                    actions: [
                        { label: 'โหลดใบเสร็จย้อนหลัง', icon: 'i-lucide-download', style: 'outline', onClick: handleExportBillingCsv },
                        { label: 'บันทึก', icon: 'i-lucide-save', style: 'solid', onClick: handleBillingSave }
                    ]
                }
            case 'notifications':
                return {
                    icon: 'i-lucide-bell',
                    breadcrumb: 'การแจ้งเตือน',
                    title: 'ตั้งค่าระบบ — การแจ้งเตือน',
                    description: 'ตั้งค่าการแจ้งเตือน LINE · Email · SMS สำหรับนัดหมาย ผลการรักษา และอื่นๆ',
                    actions: []
                }
            case 'security':
                return {
                    icon: 'i-lucide-shield',
                    breadcrumb: 'ความปลอดภัย',
                    title: 'ตั้งค่าระบบ — ความปลอดภัย',
                    description: 'จัดการ 2FA · IP Whitelist · Session timeout · Audit log และนโยบายรหัสผ่าน',
                    actions: []
                }
            case 'audit':
                return {
                    icon: 'i-lucide-clipboard-list',
                    breadcrumb: 'Audit log',
                    title: 'ตั้งค่าระบบ — Audit log',
                    description: 'ดูประวัติการเข้าใช้งาน การเปลี่ยนแปลงข้อมูล และกิจกรรมทั้งหมดในระบบ',
                    actions: []
                }
            default:
                return {
                    icon: 'i-lucide-sliders-horizontal',
                    breadcrumb: 'ทั่วไป',
                    title: 'ตั้งค่าระบบ — ทั่วไป',
                    description: 'ตั้งค่าทั่วไปของระบบ เช่น ภาษา เขตเวลา และการแสดงผล',
                    actions: []
                }
        }
    })

</script>

<template>
    <ClientOnly>
    <div class="max-w-[1400px] mx-auto px-6 lg:px-8 py-6 pb-28 space-y-0">
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
                        <div class="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                        <div class="flex items-center justify-between relative z-10">
                            <div class="flex items-center gap-4">
                                <div class="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center shrink-0">
                                    <UIcon :name="tabHeaderConfig.icon" class="w-7 h-7 text-white" />
                                </div>
                                <div>
                                    <div class="text-xs font-bold text-indigo-200 mb-1">
                                        หน้าแรก
                                        <span class="mx-1.5 opacity-60">›</span>
                                        ตั้งค่า
                                        <span class="mx-1.5 opacity-60">›</span>
                                        {{ tabHeaderConfig.breadcrumb }}
                                    </div>
                                    <h1 class="text-2xl font-black tracking-tight">{{ tabHeaderConfig.title }}</h1>
                                    <p class="text-sm text-indigo-100/90 font-medium mt-1">{{ tabHeaderConfig.description }}</p>
                                </div>
                            </div>
                            <div
                                v-if="tabHeaderConfig.actions.length"
                                class="flex items-center gap-2 shrink-0"
                            >
                                <button
                                    v-for="action in tabHeaderConfig.actions"
                                    :key="action.label"
                                    class="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-colors cursor-pointer"
                                    :class="action.style === 'solid'
                                        ? 'bg-white text-indigo-700 hover:bg-indigo-50 shadow-sm'
                                        : 'bg-white/10 hover:bg-white/20 border border-white/20 text-white'"
                                    @click="action.onClick"
                                >
                                    <UIcon :name="action.icon" class="w-4 h-4" />
                                    {{ action.label }}
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
                                @click="switchTab(tab.key)"
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

                    </div>

                    <!-- ── Clinic tab content ── -->
                    <div
                        v-else-if="activeTab === 'clinic'"
                        class="space-y-5"
                    >
                        <div
                            v-if="clinicPending || !clinicForm"
                            class="flex items-center justify-center min-h-[40vh]"
                        >
                            <UIcon name="i-heroicons-arrow-path" class="w-7 h-7 text-indigo-600 animate-spin" />
                        </div>
                        <template v-else>
                            <BrandIdentity v-model="clinicForm.brand" />
                            <LicenseInfo v-model="clinicForm.license" />
                            <ContactChannels v-model="clinicForm.contact" />
                            <BranchList :branches="clinicForm.branches" />
                            <BusinessHours v-model="clinicForm.businessHours" />
                            <Services v-model="clinicForm.services" />
                        </template>
                    </div>

                    <!-- ── Billing tab content ── -->
                    <div
                        v-else-if="activeTab === 'billing'"
                        class="space-y-5"
                    >
                        <div
                            v-if="billingPending || !billingForm"
                            class="flex items-center justify-center min-h-[40vh]"
                        >
                            <UIcon name="i-heroicons-arrow-path" class="w-7 h-7 text-indigo-600 animate-spin" />
                        </div>
                        <template v-else>
                            <UsagePlan
                                :plans="billingForm.plans"
                                :current-plan="billingForm.currentPlan"
                                :billing-cycle="billingForm.billingCycle"
                                @update:billing-cycle="billingForm.billingCycle = $event"
                                @change-plan="handleChangePlan"
                            />
                            <CurrentUsage
                                :usage="billingForm.usage"
                                data-as-of="24 พ.ค. 2026"
                                :next-billing-date="billingForm.nextBillingDate"
                            />
                            <PaymentChannels
                                :channels="billingForm.paymentChannels"
                                @update:channels="billingForm.paymentChannels = $event"
                            />
                            <ReceiptFormat
                                v-model="billingForm.receiptFormat"
                                clinic-name="AVACLINIC"
                                clinic-legal-name="บริษัท เอวา คลินิก จำกัด"
                                clinic-tax-id="0105563984721"
                                clinic-address="123 ถนนพระราม 9 แขวงบางกะปิ เขตห้วยขวาง กรุงเทพ 10310"
                            />
                            <BillingHistory
                                :invoices="billingForm.invoices"
                                @export-csv="handleExportBillingCsv"
                            />
                        </template>
                    </div>

                    <!-- Other tabs: placeholder -->
                    <div
                        v-else
                        class="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center"
                    >
                        <UIcon name="i-lucide-construction" class="w-10 h-10 text-gray-300 mx-auto mb-3" />
                        <p class="font-bold text-gray-500">{{ tabs.find(t => t.key === activeTab)?.label }}</p>
                        <p class="text-xs text-gray-400 mt-1">หน้านี้อยู่ระหว่างการพัฒนา</p>
                    </div>
                </div>

                <!-- Right column: Sticky preview panel -->
                <div class="w-72 shrink-0 sticky top-6 pb-6">
                    <BillingSidebar
                        v-if="activeTab === 'billing' && billingForm"
                        :next-billing-amount="billingForm.nextBillingAmount"
                        :next-billing-date="billingForm.nextBillingDate"
                        :stored-payment-methods="billingForm.storedPaymentMethods"
                        :account-credit="billingForm.accountCredit"
                        :current-charges="billingForm.currentCharges"
                        :billing-cycle="billingForm.billingCycle"
                        @defer-cycle="toast.info('เลื่อนรอบ', 'ฟีเจอร์นี้อยู่ระหว่างพัฒนา', { icon: 'i-lucide-calendar' })"
                        @edit-payment="toast.info('แก้ไขวิธีชำระ', 'ฟีเจอร์นี้อยู่ระหว่างพัฒนา', { icon: 'i-lucide-pencil' })"
                        @add-payment-method="toast.info('เพิ่มวิธีชำระ', 'ฟีเจอร์นี้อยู่ระหว่างพัฒนา', { icon: 'i-lucide-plus' })"
                    />
                    <ClinicLivePreview
                        v-else-if="activeTab === 'clinic' && clinicForm"
                        :clinic="clinicForm"
                    />
                    <InvitePreview
                        v-else
                        :form="form"
                        :recent-activity="settingsData.data.recentActivity"
                    />
                </div>
            </div>
        </template>
    </div>

    <!-- ── Clinic Bottom Action Bar ── -->
    <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 translate-y-4"
        leave-active-class="transition-all duration-200 ease-in"
        leave-to-class="opacity-0 translate-y-4"
    >
        <div
            v-if="activeTab === 'clinic' && clinicDirtyCount > 0"
            class="fixed bottom-0 left-[255px] right-0 z-40 bg-white/95 backdrop-blur-sm border-t border-gray-100 shadow-lg px-6 py-3 flex items-center justify-between"
        >
            <div class="flex items-center gap-3">
                <div class="flex items-center gap-1.5 text-xs font-bold text-amber-600">
                    <UIcon name="i-lucide-pencil" class="w-3.5 h-3.5" />
                    มีการเปลี่ยน {{ clinicDirtyCount }} ฟิลด์ ที่ยังไม่ได้บันทึก
                </div>
                <span
                    v-if="clinicSaveCountdown > 0"
                    class="text-[11px] text-gray-400 font-medium"
                >· บันทึกอัตโนมัติใน {{ clinicSaveCountdown }} วินาที</span>
            </div>
            <div class="flex items-center gap-2">
                <button
                    class="px-4 py-2 text-sm font-bold text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
                    @click="handleClinicDiscard"
                >
                    ยกเลิกการเปลี่ยนแปลง
                </button>
                <button
                    class="px-4 py-2 text-sm font-bold text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors flex items-center gap-1.5"
                    @click="handleClinicSave"
                >
                    <UIcon name="i-lucide-save" class="w-3.5 h-3.5" />
                    บันทึกแบบร่าง
                </button>
                <button
                    class="px-5 py-2 text-sm font-black text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl cursor-pointer transition-colors shadow-md shadow-indigo-200 flex items-center gap-2 disabled:opacity-60"
                    :disabled="clinicSaving"
                    @click="handleClinicSave"
                >
                    <UIcon
                        :name="clinicSaving ? 'i-heroicons-arrow-path' : 'i-lucide-check'"
                        class="w-3.5 h-3.5"
                        :class="clinicSaving ? 'animate-spin' : ''"
                    />
                    บันทึกการเปลี่ยนแปลง
                </button>
            </div>
        </div>
    </Transition>

    <!-- ── Billing Bottom Action Bar ── -->
    <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 translate-y-4"
        leave-active-class="transition-all duration-200 ease-in"
        leave-to-class="opacity-0 translate-y-4"
    >
        <div
            v-if="activeTab === 'billing' && billingForm"
            class="fixed bottom-0 left-[255px] right-0 z-40 bg-white/95 backdrop-blur-sm border-t border-gray-100 shadow-lg px-6 py-3 flex items-center justify-between"
        >
            <p class="text-xs font-bold text-gray-500 flex items-center gap-1.5">
                <UIcon name="i-lucide-shield-check" class="w-3.5 h-3.5 text-emerald-500" />
                ข้อมูลการชำระเงินทั้งหมดเข้ารหัสมาตรฐาน PCI-DSS · บันทึกอัตโนมัติ
            </p>
            <div class="flex items-center gap-2">
                <button
                    class="px-4 py-2 text-sm font-bold text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
                    @click="handleExportBillingCsv"
                >
                    ดาวน์โหลดสำเนาทั้งหมด
                </button>
                <button
                    class="px-5 py-2 text-sm font-black text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl cursor-pointer transition-colors shadow-md shadow-indigo-200 flex items-center gap-2 disabled:opacity-60"
                    :disabled="billingSaving"
                    @click="handleBillingSave"
                >
                    <UIcon
                        :name="billingSaving ? 'i-heroicons-arrow-path' : 'i-lucide-check'"
                        class="w-3.5 h-3.5"
                        :class="billingSaving ? 'animate-spin' : ''"
                    />
                    บันทึกการเปลี่ยนแปลง
                </button>
            </div>
        </div>
    </Transition>

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
    <template #fallback>
        <div class="flex items-center justify-center min-h-[60vh]">
            <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 text-indigo-600 animate-spin" />
        </div>
    </template>
    </ClientOnly>
</template>

<style scoped>
    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
</style>
