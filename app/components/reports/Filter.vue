<script setup lang="ts">
    import type { ReportPeriod, ReportCompare } from '~/client/reports'

    const props = defineProps<{
        period: ReportPeriod
        compare: ReportCompare
        periodLabel: string
        periodDays: number
    }>()

    const emit = defineEmits<{
        change: [period: ReportPeriod, compare: ReportCompare]
    }>()

    const tabs: { label: string; value: ReportPeriod }[] = [
        { label: 'รายวัน', value: 'daily' },
        { label: 'รายสัปดาห์', value: 'weekly' },
        { label: 'รายเดือน', value: 'monthly' },
        { label: 'รายปี', value: 'yearly' },
        { label: 'กำหนดเอง', value: 'custom' }
    ]

    const compareOptions = [
        { label: 'ช่วงก่อนหน้า', value: 'previous' },
        { label: 'ปีที่แล้ว', value: 'last_year' }
    ]

    const compareLabel = computed(
        () => compareOptions.find(o => o.value === props.compare)?.label ?? 'ช่วงก่อนหน้า'
    )

    function setTab(value: ReportPeriod) {
        emit('change', value, props.compare)
    }

    function setCompare(value: ReportCompare) {
        emit('change', props.period, value)
    }
</script>

<template>
    <div
        class="bg-white rounded-2xl shadow-sm ring-1 ring-gray-100 p-2 flex flex-wrap gap-3 justify-between items-center"
    >
        <!-- Period Tabs -->
        <div class="flex items-center gap-1 bg-slate-50/80 p-1 rounded-xl">
            <button
                v-for="tab in tabs"
                :key="tab.value"
                class="px-4 py-1.5 rounded-lg text-sm font-medium transition-all"
                :class="
                    period === tab.value
                        ? 'font-bold text-indigo-600 bg-white shadow-sm ring-1 ring-gray-200/50'
                        : 'text-gray-500 hover:text-gray-900 hover:bg-white/60'
                "
                @click="setTab(tab.value)"
            >
                {{ tab.label }}
            </button>
        </div>

        <!-- Date nav + compare + filter -->
        <div class="flex items-center gap-2">
            <UButton
                variant="ghost"
                icon="i-heroicons-chevron-left"
                class="rounded-lg shadow-sm ring-1 ring-gray-200 hover:bg-gray-50 bg-white"
            />

            <UButton
                variant="ghost"
                icon="i-heroicons-calendar-days"
                class="rounded-lg shadow-sm ring-1 ring-gray-200 hover:bg-gray-50 bg-white px-4 font-bold text-gray-800"
            >
                {{ periodLabel }}
                <span class="text-gray-400 font-normal ml-1">({{ periodDays }} วัน)</span>
            </UButton>

            <UButton
                variant="ghost"
                icon="i-heroicons-chevron-right"
                class="rounded-lg shadow-sm ring-1 ring-gray-200 hover:bg-gray-50 bg-white"
            />

            <div class="flex items-center gap-2 ml-1">
                <span class="text-sm font-medium text-gray-500">เทียบกับ</span>
                <USelectMenu
                    :options="compareOptions"
                    :model-value="compareOptions.find(o => o.value === compare)"
                    value-attribute="value"
                    option-attribute="label"
                    class="w-36"
                    @update:model-value="(v: any) => setCompare(v.value)"
                />
            </div>

            <UButton
                variant="ghost"
                icon="i-heroicons-funnel"
                class="rounded-lg shadow-sm ring-1 ring-gray-200 hover:bg-gray-50 bg-white px-3"
            >
                ตัวกรอง
                <UBadge size="xs" class="ml-1 bg-gray-100 text-gray-500 rounded-full">0</UBadge>
            </UButton>
        </div>
    </div>
</template>
