<script setup lang="ts">
const props = defineProps<{
    activeTab: string
    counts: {
        overview: number
        treatments: number
        appointments: number
        billing: number
        courses: number
        documents: number
        notes: number
    }
}>()

const emit = defineEmits<{ change: [tab: string] }>()

const tabs = computed(() => [
    { key: 'overview', label: 'ภาพรวม', count: 0 },
    { key: 'treatments', label: 'ประวัติการรักษา', count: props.counts.treatments },
    { key: 'appointments', label: 'นัดหมาย', count: props.counts.appointments },
    { key: 'billing', label: 'การชำระเงิน', count: props.counts.billing },
    { key: 'courses', label: 'คอร์ส & แพ็คเกจ', count: props.counts.courses },
    { key: 'documents', label: 'เอกสาร & รูปภาพ', count: props.counts.documents },
    { key: 'notes', label: 'บันทึก', count: props.counts.notes },
])
</script>

<template>
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm mb-4 overflow-hidden">
        <div class="flex overflow-x-auto scrollbar-none">
            <button
                v-for="tab in tabs"
                :key="tab.key"
                type="button"
                class="flex items-center gap-1.5 px-5 py-3.5 text-sm font-bold whitespace-nowrap border-b-2 transition-all cursor-pointer shrink-0"
                :class="
                    activeTab === tab.key
                        ? 'border-indigo-600 text-indigo-600'
                        : 'border-transparent text-slate-500 hover:text-slate-700'
                "
                @click="emit('change', tab.key)"
            >
                {{ tab.label }}
                <span
                    v-if="tab.count > 0"
                    class="text-[10px] font-black px-1.5 py-0.5 rounded-full min-w-[20px] text-center"
                    :class="activeTab === tab.key ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'"
                >{{ tab.count }}</span>
            </button>
        </div>
    </div>
</template>
