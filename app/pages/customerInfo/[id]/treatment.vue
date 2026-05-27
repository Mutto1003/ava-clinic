<script setup lang="ts">
import { getMockTreatmentProfile } from '~/client/treatments'

definePageMeta({
    layout: 'main',
    middleware: ['auth'],
})

const route = useRoute()
const toast = useAppToast()

const id = route.params.id as string
const profile = computed(() => getMockTreatmentProfile(id))

const activeTab = ref('treatments')
const viewMode = ref<'timeline' | 'cards'>('timeline')
const statusFilter = ref('completed')
const searchQuery = ref('')

const handleBack = () => navigateTo(`/customerInfo/${id}`)

const handleNewSession = () => {
    toast.info('บันทึกเซสชันใหม่', 'ฟีเจอร์กำลังพัฒนา')
}

const handlePrint = () => {
    toast.info('พิมพ์ประวัติ', 'กำลังเตรียมไฟล์สำหรับพิมพ์...')
}

const handleExportPdf = () => {
    toast.info('Export PDF', 'กำลังสร้างไฟล์ PDF ประวัติการรักษา...')
}

const handleEditSession = (sessionId: string) => {
    toast.info('แก้ไขเซสชัน', `กำลังเปิดแก้ไขรายการ ${sessionId}`)
}

const handleViewInvoice = (sessionId: string) => {
    toast.info('ดูใบเสร็จ', `กำลังโหลดใบเสร็จสำหรับรายการ ${sessionId}`)
}

const handleConfirmSession = () => {
    toast.success('ยืนยันนัดหมาย', `ยืนยันการนัดหมาย ${profile.value.upcomingSession?.treatmentName} เรียบร้อย`)
}

const handleReschedule = () => {
    toast.info('เลื่อนนัด', 'กำลังเปิดหน้าเลื่อนนัดหมาย...')
}
</script>

<template>
    <div class="max-w-screen-xl mx-auto px-4 lg:px-6 py-5 pb-10">
        <!-- Page header -->
        <TreatmentsPageHeader
            :profile="profile"
            @back="handleBack"
            @new-session="handleNewSession"
            @print="handlePrint"
            @export-pdf="handleExportPdf"
        />

        <!-- Tab navigation -->
        <TreatmentsTabBar
            :active-tab="activeTab"
            :counts="profile.tabCounts"
            @change="activeTab = $event"
        />

        <!-- Treatment history tab content -->
        <div v-if="activeTab === 'treatments'">
            <!-- Stat cards -->
            <TreatmentsStatCards :profile="profile" />

            <!-- Main grid -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                <!-- Left: filters + list -->
                <div class="lg:col-span-8 space-y-0">
                    <TreatmentsFilterBar
                        v-model:view-mode="viewMode"
                        v-model:status-filter="statusFilter"
                        v-model:search-query="searchQuery"
                    />
                    <TreatmentsSessionList
                        :sessions="profile.sessions"
                        :status-filter="statusFilter"
                        :search-query="searchQuery"
                        @edit="handleEditSession"
                        @view-invoice="handleViewInvoice"
                    />
                </div>

                <!-- Right: panel -->
                <div class="lg:col-span-4 lg:sticky lg:top-24">
                    <TreatmentsRightPanel
                        :profile="profile"
                        @confirm-session="handleConfirmSession"
                        @reschedule="handleReschedule"
                    />
                </div>
            </div>
        </div>

        <!-- Placeholder for other tabs -->
        <div v-else class="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <UIcon name="i-lucide-construction" class="w-12 h-12 text-slate-300 mb-4" />
            <p class="text-sm font-bold text-slate-400">แท็บนี้กำลังพัฒนา</p>
            <p class="text-xs font-semibold text-slate-300 mt-1">{{ activeTab }}</p>
        </div>
    </div>
</template>
