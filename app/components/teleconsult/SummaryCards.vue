<script setup lang="ts">
    interface Summary {
        activeSessions: number
        totalSessions: number
        activeRooms: string
        waitingCount: number
        nextPatientIn: string
        completedToday: number
        completedTrend: string
        revenueToday: number
        revenueAvg: number
    }

    defineProps<{
        summary: Summary
    }>()

    const formatNumber = (num: number) => new Intl.NumberFormat('th-TH').format(num)
</script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Active Sessions -->
        <div
            class="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-5 text-white shadow-lg shadow-indigo-500/20 relative overflow-hidden"
        >
            <div
                class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"
            ></div>

            <div class="flex items-center gap-2 mb-3 relative z-10">
                <span class="w-2 h-2 rounded-full bg-rose-400 animate-pulse"></span>
                <span class="text-xs font-bold text-white/90">กำลังตรวจอยู่</span>
            </div>

            <div class="flex items-baseline gap-2 mb-4 relative z-10">
                <span class="text-4xl font-black">{{ summary.activeSessions }}</span>
                <span class="text-sm text-indigo-100 font-medium"
                    >/ {{ summary.totalSessions }} เซสชันวันนี้</span
                >
            </div>

            <div class="flex items-center gap-3 relative z-10">
                <div class="flex -space-x-2">
                    <div
                        class="w-6 h-6 rounded-full bg-white text-indigo-600 flex items-center justify-center text-[10px] font-bold ring-2 ring-indigo-500"
                    >
                        ปท
                    </div>
                    <div
                        class="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-[10px] font-bold ring-2 ring-indigo-500"
                    >
                        WS
                    </div>
                </div>
                <div class="text-[11px] font-medium text-indigo-100">{{ summary.activeRooms }}</div>
            </div>
        </div>

        <!-- Waiting Room -->
        <div
            class="bg-white rounded-2xl p-5 ring-1 ring-gray-100 shadow-sm flex flex-col justify-between"
        >
            <div class="flex justify-between items-start mb-2">
                <span class="text-xs font-bold text-gray-500">รอเข้าห้อง</span>
                <div
                    class="w-6 h-6 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center"
                >
                    <UIcon name="i-heroicons-clock" class="w-3.5 h-3.5" />
                </div>
            </div>
            <div>
                <div class="text-3xl font-black text-gray-900 mb-1">{{ summary.waitingCount }}</div>
                <div class="text-[11px] font-medium text-gray-400">{{ summary.nextPatientIn }}</div>
            </div>
        </div>

        <!-- Completed -->
        <div
            class="bg-white rounded-2xl p-5 ring-1 ring-gray-100 shadow-sm flex flex-col justify-between"
        >
            <div class="flex justify-between items-start mb-2">
                <span class="text-xs font-bold text-gray-500">เสร็จแล้ววันนี้</span>
                <div
                    class="w-6 h-6 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center"
                >
                    <UIcon name="i-heroicons-check" class="w-3.5 h-3.5" />
                </div>
            </div>
            <div>
                <div class="text-3xl font-black text-gray-900 mb-1">
                    {{ summary.completedToday }}
                </div>
                <div class="text-[11px] font-bold text-emerald-500">
                    {{ summary.completedTrend }}
                </div>
            </div>
        </div>

        <!-- Revenue -->
        <div
            class="bg-white rounded-2xl p-5 ring-1 ring-gray-100 shadow-sm flex flex-col justify-between"
        >
            <div class="flex justify-between items-start mb-2">
                <span class="text-xs font-bold text-gray-500">รายได้รวมวันนี้</span>
                <div
                    class="w-6 h-6 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center"
                >
                    <UIcon name="i-heroicons-currency-dollar" class="w-3.5 h-3.5" />
                </div>
            </div>
            <div>
                <div class="text-3xl font-black text-gray-900 mb-1">
                    ฿{{ formatNumber(summary.revenueToday) }}
                </div>
                <div class="text-[11px] font-medium text-gray-400">
                    เฉลี่ย ฿{{ formatNumber(summary.revenueAvg) }}/เซสชัน
                </div>
            </div>
        </div>
    </div>
</template>
