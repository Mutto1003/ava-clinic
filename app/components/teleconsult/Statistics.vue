<script setup lang="ts">
    import type { TeleconsultStatistics } from '~/client/teleconsult'

    const props = defineProps<{
        statistics: TeleconsultStatistics
    }>()

    const filter = ref<'7 วัน' | '30 วัน' | '90 วัน'>('7 วัน')

    const maxTotal = computed(() =>
        Math.max(...props.statistics.chart.map(d => d.completed + d.cancelled))
    )

    const barHeightPercent = (item: { completed: number; cancelled: number }) => {
        const total = item.completed + item.cancelled
        return (total / maxTotal.value) * 100
    }

    const completedHeightPercent = (item: { completed: number; cancelled: number }) => {
        const total = item.completed + item.cancelled
        return (item.completed / total) * 100
    }

    const cancelledHeightPercent = (item: { completed: number; cancelled: number }) => {
        const total = item.completed + item.cancelled
        return (item.cancelled / total) * 100
    }
</script>

<template>
    <div class="bg-white rounded-2xl ring-1 ring-gray-100 shadow-sm p-5 h-full flex flex-col">
        <!-- Header row -->
        <div class="flex justify-between items-start mb-3">
            <div>
                <h2 class="font-bold text-gray-900 text-lg">สถิติ 7 วันย้อนหลัง</h2>
                <p class="text-xs text-gray-500 font-medium">
                    จำนวนเซสชัน · เฉลี่ย {{ statistics.avgPerDay }} / วัน
                    <span class="text-gray-400 mx-1">·</span>
                    <span class="text-indigo-600 font-bold">{{ statistics.peakDay }}</span>
                </p>
            </div>

            <div class="flex bg-slate-50 p-0.5 rounded-xl ring-1 ring-gray-100">
                <button
                    v-for="f in (['7 วัน', '30 วัน', '90 วัน'] as const)"
                    :key="f"
                    @click="filter = f"
                    class="px-3 py-1.5 text-xs font-bold rounded-lg transition-all"
                    :class="filter === f ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'"
                >
                    {{ f }}
                </button>
            </div>
        </div>

        <!-- Total count + trend -->
        <div class="flex items-center gap-3 mb-4">
            <span class="text-4xl font-black text-gray-900">{{ statistics.totalCount }}</span>
            <span
                class="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full ring-1 ring-emerald-100"
            >
                <span>▲</span>
                {{ statistics.trendPercent }} vs สัปดาห์ก่อน
            </span>
        </div>

        <!-- Legend -->
        <div class="flex items-center gap-4 mb-3">
            <div class="flex items-center gap-1.5">
                <span class="w-2.5 h-2.5 rounded-sm bg-indigo-500"></span>
                <span class="text-[10px] font-bold text-gray-500">สำเร็จ</span>
            </div>
            <div class="flex items-center gap-1.5">
                <span class="w-2.5 h-2.5 rounded-sm bg-indigo-200"></span>
                <span class="text-[10px] font-bold text-gray-500">ยกเลิก</span>
            </div>
            <div class="flex items-center gap-1.5">
                <span class="w-2.5 h-2.5 rounded-sm bg-emerald-400"></span>
                <span class="text-[10px] font-bold text-gray-500">วันนี้</span>
            </div>
        </div>

        <!-- Chart -->
        <div class="flex-1 relative">
            <!-- Y Axis Labels -->
            <div
                class="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-[10px] text-gray-400 font-medium w-5"
            >
                <span>15</span>
                <span>10</span>
                <span>5</span>
                <span>0</span>
            </div>

            <!-- Grid Lines -->
            <div class="absolute left-7 right-0 top-0 bottom-6 flex flex-col justify-between pointer-events-none">
                <div class="w-full border-t border-gray-100"></div>
                <div class="w-full border-t border-gray-100"></div>
                <div class="w-full border-t border-gray-100"></div>
                <div class="w-full border-t border-gray-100"></div>
            </div>

            <!-- Bars -->
            <div class="absolute left-7 right-0 top-0 bottom-6 flex justify-around items-end px-1">
                <div
                    v-for="(item, index) in statistics.chart"
                    :key="index"
                    class="flex flex-col items-center group"
                    style="width: 28px"
                >
                    <!-- Value label on hover (or always for today) -->
                    <span
                        class="text-[10px] font-bold mb-0.5 transition-opacity"
                        :class="item.isToday ? 'text-emerald-600 opacity-100' : 'text-indigo-500 opacity-0 group-hover:opacity-100'"
                    >
                        {{ item.completed + item.cancelled }}
                    </span>

                    <!-- Stacked bar -->
                    <div
                        class="w-full flex flex-col-reverse rounded-t-sm overflow-hidden"
                        :style="{ height: barHeightPercent(item) + '%' }"
                    >
                        <!-- Today: single emerald bar -->
                        <template v-if="item.isToday">
                            <div class="w-full flex-1 bg-emerald-400"></div>
                        </template>
                        <!-- Regular: completed (bottom) + cancelled (top) -->
                        <template v-else>
                            <div
                                class="w-full bg-indigo-500 flex-shrink-0"
                                :style="{ height: completedHeightPercent(item) + '%' }"
                            ></div>
                            <div
                                class="w-full bg-indigo-200 flex-shrink-0"
                                :style="{ height: cancelledHeightPercent(item) + '%' }"
                            ></div>
                        </template>
                    </div>
                </div>
            </div>

            <!-- X Axis Labels -->
            <div class="absolute left-7 right-0 bottom-0 flex justify-around px-1">
                <div
                    v-for="(item, index) in statistics.chart"
                    :key="index"
                    class="text-center text-[10px] font-medium"
                    style="width: 28px"
                    :class="item.isToday ? 'text-emerald-600 font-bold' : 'text-gray-500'"
                >
                    {{ item.label }}
                </div>
            </div>
        </div>
    </div>
</template>
