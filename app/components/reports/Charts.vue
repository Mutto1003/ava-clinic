<script setup lang="ts">
    import type { DailyRevenue, PaymentMethod } from '~/client/reports'

    const props = defineProps<{
        dailyRevenue: DailyRevenue
        paymentMethods: PaymentMethod[]
        periodLabel: string
    }>()

    const fmt = (n: number) =>
        n >= 1000 ? (n / 1000).toFixed(0) + 'K' : new Intl.NumberFormat('th-TH').format(n)

    const fmtFull = (n: number) => new Intl.NumberFormat('th-TH').format(n)

    const maxVal = computed(() =>
        Math.max(...props.dailyRevenue.current, ...props.dailyRevenue.previous, props.dailyRevenue.target)
    )

    function barHeight(val: number) {
        return Math.max(4, (val / maxVal.value) * 100)
    }

    function targetLineY(target: number) {
        return 100 - (target / maxVal.value) * 100
    }

    const tooltipIndex = ref<number | null>(null)

    const totalPayments = computed(() =>
        props.paymentMethods.reduce((s, p) => s + p.amount, 0)
    )

    const fmtM = (n: number) => {
        if (n >= 1000000) return '฿' + (n / 1000000).toFixed(2) + 'M'
        if (n >= 1000) return '฿' + (n / 1000).toFixed(0) + 'K'
        return '฿' + n
    }

    // SVG donut
    const R = 40
    const C = 2 * Math.PI * R

    const donutSegments = computed(() => {
        let offset = 0
        return props.paymentMethods.map(pm => {
            const dash = (pm.percent / 100) * C
            const seg = { ...pm, dash, offset }
            offset += C - dash
            return seg
        })
    })
</script>

<template>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Bar chart -->
        <div
            class="bg-white rounded-2xl shadow-sm ring-1 ring-gray-100 p-6 lg:col-span-2 flex flex-col h-80"
        >
            <div class="flex justify-between items-start mb-4">
                <div>
                    <h3 class="font-bold text-gray-900">รายได้รายวัน</h3>
                    <p class="text-xs text-gray-500 mt-0.5">{{ periodLabel }}</p>
                </div>
                <div class="flex items-center gap-4 text-xs font-semibold text-gray-500">
                    <div class="flex items-center gap-1.5">
                        <span class="w-2.5 h-2.5 rounded-sm bg-indigo-600"></span> ช่วงนี้
                    </div>
                    <div class="flex items-center gap-1.5">
                        <span class="w-2.5 h-2.5 rounded-sm bg-indigo-200"></span> ช่วงก่อน
                    </div>
                    <div class="flex items-center gap-1.5">
                        <span class="w-4 h-0.5 bg-emerald-400 block"></span> เป้า
                    </div>
                </div>
            </div>

            <div class="flex-1 relative flex items-end justify-between px-1">
                <!-- Target dashed line -->
                <div
                    class="absolute left-0 w-full border-t-2 border-dashed border-emerald-300 z-0 pointer-events-none"
                    :style="{ bottom: `${(dailyRevenue.target / maxVal) * 100}%` }"
                ></div>
                <span
                    class="absolute right-0 text-[9px] text-emerald-500 font-bold bg-white pl-1 z-10"
                    :style="{ bottom: `calc(${(dailyRevenue.target / maxVal) * 100}% + 4px)` }"
                >
                    เป้า {{ fmt(dailyRevenue.target) }}
                </span>

                <!-- Bars -->
                <div
                    v-for="(val, i) in dailyRevenue.current"
                    :key="i"
                    class="relative z-10 flex flex-col items-center gap-1 group cursor-pointer flex-1"
                    @mouseenter="tooltipIndex = i"
                    @mouseleave="tooltipIndex = null"
                >
                    <!-- Tooltip -->
                    <div
                        v-if="tooltipIndex === i"
                        class="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1.5 rounded-lg shadow-lg whitespace-nowrap z-20 text-center"
                    >
                        <div class="font-bold">{{ dailyRevenue.labels[i] }} พ.ค.</div>
                        <div class="text-emerald-300">฿{{ fmtFull(val) }}</div>
                    </div>

                    <div class="flex items-end gap-0.5 w-full justify-center h-full">
                        <div
                            class="w-2.5 bg-indigo-200 rounded-t-sm transition-all"
                            :style="{ height: `${barHeight(dailyRevenue.previous[i] ?? 0)}%` }"
                        ></div>
                        <div
                            class="w-2.5 rounded-t-sm transition-all"
                            :class="tooltipIndex === i ? 'bg-gray-800' : 'bg-indigo-600 group-hover:bg-indigo-500'"
                            :style="{ height: `${barHeight(val)}%` }"
                        ></div>
                    </div>
                    <div class="text-[9px] text-gray-400 font-medium">{{ dailyRevenue.labels[i] }}</div>
                </div>
            </div>
        </div>

        <!-- Donut chart -->
        <div class="bg-white rounded-2xl shadow-sm ring-1 ring-gray-100 p-6 flex flex-col h-80">
            <h3 class="font-bold text-gray-900">วิธีชำระเงิน</h3>
            <p class="text-xs text-gray-500 mt-0.5 mb-4">สัดส่วนยอดรวม 14 วัน · {{ fmtM(totalPayments) }}</p>

            <div class="flex items-center justify-center flex-1 gap-5">
                <!-- SVG donut -->
                <div class="relative w-32 h-32 shrink-0">
                    <svg viewBox="0 0 100 100" class="w-full h-full -rotate-90">
                        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f3f4f6" stroke-width="20" />
                        <circle
                            v-for="seg in donutSegments"
                            :key="seg.name"
                            cx="50"
                            cy="50"
                            r="40"
                            fill="transparent"
                            :stroke="seg.hex"
                            stroke-width="20"
                            :stroke-dasharray="`${seg.dash} ${C - seg.dash}`"
                            :stroke-dashoffset="-seg.offset"
                        />
                    </svg>
                    <div class="absolute inset-0 flex flex-col items-center justify-center">
                        <div class="text-sm font-extrabold text-gray-900">{{ fmtM(totalPayments) }}</div>
                        <div class="text-[9px] text-gray-400 font-bold">รวมทั้งหมด</div>
                    </div>
                </div>

                <!-- Legend -->
                <div class="flex flex-col justify-center gap-3 w-full">
                    <div
                        v-for="pm in paymentMethods"
                        :key="pm.name"
                        class="flex justify-between items-center text-xs"
                    >
                        <div class="flex items-center gap-2">
                            <span class="w-2.5 h-2.5 rounded-sm shrink-0" :style="{ background: pm.hex }"></span>
                            <div>
                                <div class="font-bold text-gray-700 leading-tight">{{ pm.name }}</div>
                                <div class="text-[10px] text-gray-400">{{ pm.percent }}%</div>
                            </div>
                        </div>
                        <div class="font-bold text-gray-900">{{ fmtM(pm.amount) }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
