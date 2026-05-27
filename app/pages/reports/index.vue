<script setup lang="ts">
    import type { ReportData, ReportPeriod, ReportCompare } from '~/client/reports'

    definePageMeta({
        layout: 'main',
        middleware: ['auth']
    })

    const period = ref<ReportPeriod>('daily')
    const compare = ref<ReportCompare>('previous')

    const query = computed(() => ({
        period: period.value,
        compare: compare.value
    }))

    const { data, pending, refresh } = await useFetch<{ status: string; data: ReportData }>(
        '/api/reports',
        { query }
    )

    const reportsData = computed(() => data.value?.data ?? null)

    function onFilterChange(p: ReportPeriod, c: ReportCompare) {
        period.value = p
        compare.value = c
    }
</script>

<template>
    <div class="max-w-7xl mx-auto px-6 lg:px-8 py-6 pb-8">
        <div
            class="bg-white rounded-3xl shadow-xl shadow-blue-900/5 ring-1 ring-gray-100 flex flex-col min-h-[80vh] overflow-hidden relative"
        >
            <div
                v-if="pending"
                class="absolute inset-0 bg-white/50 backdrop-blur-sm z-50 flex items-center justify-center"
            >
                <UIcon
                    name="i-heroicons-arrow-path"
                    class="w-10 h-10 text-indigo-600 animate-spin"
                />
            </div>

            <div v-if="reportsData" class="flex flex-col flex-1">
                <ReportsHeader />

                <div class="p-8 bg-[#fcfcfd] flex flex-col gap-6 flex-1">
                    <ReportsFilter
                        :period="period"
                        :compare="compare"
                        :period-label="reportsData.period.label"
                        :period-days="reportsData.period.days"
                        @change="onFilterChange"
                    />

                    <ReportsMetrics :metrics="reportsData.metrics" />

                    <ReportsCharts
                        :daily-revenue="reportsData.dailyRevenue"
                        :payment-methods="reportsData.paymentMethods"
                        :period-label="reportsData.period.label"
                    />

                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <ReportsLeaderboard
                            title="บริการขายดี"
                            subtitle="เรียงตามยอดขาย 14 วัน"
                            :items="reportsData.topServices"
                            type="service"
                        />
                        <ReportsLeaderboard
                            title="รายได้ตามเจ้าหน้าที่"
                            subtitle="ยอดที่ออกใบเสร็จ"
                            :items="reportsData.staffRevenue"
                            type="staff"
                        />
                    </div>

                    <ReportsRecentBills
                        :bills="reportsData.recentBills"
                        :total="reportsData.totalBills"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
