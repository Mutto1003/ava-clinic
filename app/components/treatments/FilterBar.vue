<script setup lang="ts">
const props = defineProps<{
    viewMode: 'timeline' | 'cards'
    statusFilter: string
    searchQuery: string
}>()

const emit = defineEmits<{
    'update:viewMode': [v: 'timeline' | 'cards']
    'update:statusFilter': [v: string]
    'update:searchQuery': [v: string]
}>()

const timeRangeOptions = ['ทุกช่วงเวลา', 'ปีนี้', '6 เดือนล่าสุด', '3 เดือนล่าสุด']
const typeOptions = ['ทุกประเภท', 'Filler & Botox', 'Laser Treatment', 'IV Drip & Vitamin', 'Consultation']
const doctorOptions = ['ทุกท่าน', 'Dr. สนดล สวัสดิ', 'Dr. พิมลกา', 'Dr. สนวัฒน์']

const selectedTimeRange = ref('ทุกช่วงเวลา')
const selectedType = ref('ทุกประเภท')
const selectedDoctor = ref('ทุกท่าน')

const statusChips = [
    { key: '', label: 'ทั้งหมด' },
    { key: 'completed', label: 'เสร็จแล้ว' },
    { key: 'appointment', label: 'นัดหมาย' },
    { key: 'free', label: 'ฟรี' },
]
</script>

<template>
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 flex flex-wrap items-center gap-2 mb-4">
        <!-- Search -->
        <div class="flex-1 min-w-48 relative">
            <UIcon name="i-lucide-search" class="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
                :value="searchQuery"
                type="text"
                placeholder="ค้นหาในประวัติ (หัตถการ, lot, แพทย์...)"
                class="w-full pl-8 pr-3 py-2 text-xs font-semibold bg-slate-50 border border-gray-100 rounded-xl outline-none focus:border-indigo-300 focus:bg-white transition-all text-slate-700 placeholder:text-slate-400"
                @input="emit('update:searchQuery', ($event.target as HTMLInputElement).value)"
            />
        </div>

        <!-- Time range -->
        <select
            v-model="selectedTimeRange"
            class="text-xs font-bold text-slate-600 bg-slate-50 border border-gray-100 rounded-xl px-3 py-2 outline-none cursor-pointer hover:border-indigo-200 transition-all"
        >
            <option v-for="opt in timeRangeOptions" :key="opt">{{ opt }}</option>
        </select>

        <!-- Type -->
        <select
            v-model="selectedType"
            class="text-xs font-bold text-slate-600 bg-slate-50 border border-gray-100 rounded-xl px-3 py-2 outline-none cursor-pointer hover:border-indigo-200 transition-all"
        >
            <option v-for="opt in typeOptions" :key="opt">{{ opt }}</option>
        </select>

        <!-- Doctor -->
        <select
            v-model="selectedDoctor"
            class="text-xs font-bold text-slate-600 bg-slate-50 border border-gray-100 rounded-xl px-3 py-2 outline-none cursor-pointer hover:border-indigo-200 transition-all"
        >
            <option v-for="opt in doctorOptions" :key="opt">{{ opt }}</option>
        </select>

        <!-- Status chips -->
        <div class="flex items-center gap-1.5">
            <button
                v-for="chip in statusChips"
                :key="chip.key"
                type="button"
                class="text-xs font-bold px-3 py-1.5 rounded-full border transition-all cursor-pointer flex items-center gap-1"
                :class="
                    statusFilter === chip.key
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-white text-slate-500 border-gray-200 hover:border-indigo-200 hover:text-indigo-600'
                "
                @click="emit('update:statusFilter', statusFilter === chip.key ? '' : chip.key)"
            >
                {{ chip.label }}
                <UIcon v-if="statusFilter === chip.key && chip.key !== ''" name="i-lucide-x" class="w-3 h-3" />
            </button>
        </div>

        <!-- View toggle -->
        <div class="flex items-center gap-0.5 bg-slate-100 rounded-xl p-0.5 ml-auto">
            <button
                type="button"
                class="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer"
                :class="viewMode === 'timeline' ? 'bg-white text-slate-700 shadow-sm' : 'text-slate-400 hover:text-slate-600'"
                @click="emit('update:viewMode', 'timeline')"
            >
                <UIcon name="i-lucide-list" class="w-3.5 h-3.5" />
                Timeline
            </button>
            <button
                type="button"
                class="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer"
                :class="viewMode === 'cards' ? 'bg-white text-slate-700 shadow-sm' : 'text-slate-400 hover:text-slate-600'"
                @click="emit('update:viewMode', 'cards')"
            >
                <UIcon name="i-lucide-layout-grid" class="w-3.5 h-3.5" />
                Cards
            </button>
        </div>
    </div>
</template>
