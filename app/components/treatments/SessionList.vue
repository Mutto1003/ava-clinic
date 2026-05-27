<script setup lang="ts">
import type { TreatmentSession } from '~/client/treatments'
import { groupSessionsByYear } from '~/client/treatments'

const props = defineProps<{
    sessions: TreatmentSession[]
    statusFilter: string
    searchQuery: string
}>()

const emit = defineEmits<{
    edit: [id: string]
    viewInvoice: [id: string]
}>()

const filteredSessions = computed(() => {
    return props.sessions.filter(s => {
        if (props.statusFilter && s.status !== props.statusFilter) return false
        if (props.searchQuery) {
            const q = props.searchQuery.toLowerCase()
            return (
                s.treatmentName.toLowerCase().includes(q) ||
                s.doctorName.toLowerCase().includes(q) ||
                s.invoiceId?.toLowerCase().includes(q) ||
                s.items?.some(i => i.name.toLowerCase().includes(q) || i.lotNumber?.toLowerCase().includes(q))
            )
        }
        return true
    })
})

const grouped = computed(() => groupSessionsByYear(filteredSessions.value))
</script>

<template>
    <div class="space-y-6">
        <div v-if="grouped.length === 0" class="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <UIcon name="i-lucide-search-x" class="w-10 h-10 text-slate-300 mb-3" />
            <p class="text-sm font-bold text-slate-400">ไม่พบประวัติการรักษาที่ตรงกับเงื่อนไข</p>
            <p class="text-xs font-semibold text-slate-300 mt-1">ลองเปลี่ยนตัวกรองหรือคำค้นหา</p>
        </div>

        <div v-for="group in grouped" :key="group.year" class="space-y-2.5">
            <!-- Year header -->
            <div class="flex items-center gap-3">
                <span class="text-sm font-black text-slate-700">{{ group.year }}</span>
                <span class="text-xs font-bold text-slate-400">{{ group.sessions.length }} ครั้ง</span>
                <div class="flex-1 h-px bg-gray-100"></div>
            </div>

            <!-- Sessions -->
            <div class="space-y-2">
                <TreatmentsSessionCard
                    v-for="session in group.sessions"
                    :key="session.id"
                    :session="session"
                    :default-expanded="session.id === 'S002'"
                    @edit="emit('edit', $event)"
                    @view-invoice="emit('viewInvoice', $event)"
                />
            </div>
        </div>
    </div>
</template>
