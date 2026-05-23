<script setup lang="ts">
    type Status = 'LIVE' | 'UPCOMING' | 'WAITING' | 'COMPLETED'

    interface ScheduleItem {
        id: number
        time: string
        duration: string
        patient: string
        initial: string
        type: string
        hn?: string
        status: Status
        isVip?: boolean
    }

    const props = defineProps<{
        schedule: ScheduleItem[]
    }>()

    const filter = ref<'ทั้งหมด' | 'รอ' | 'เสร็จแล้ว'>('ทั้งหมด')

    const filteredSchedule = computed(() => {
        if (filter.value === 'รอ') return props.schedule.filter(i => i.status === 'WAITING' || i.status === 'UPCOMING')
        if (filter.value === 'เสร็จแล้ว') return props.schedule.filter(i => i.status === 'COMPLETED')
        return props.schedule
    })
</script>

<template>
    <div class="bg-white rounded-2xl ring-1 ring-gray-100 shadow-sm p-5 flex flex-col h-full">
        <div class="flex justify-between items-center mb-6">
            <div>
                <h2 class="font-bold text-gray-900 text-lg">ตารางวันนี้</h2>
                <p class="text-xs text-gray-500 font-medium">14 เซสชัน · 6 รออยู่</p>
            </div>

            <div class="flex bg-slate-50 p-1 rounded-xl ring-1 ring-gray-100">
                <button
                    v-for="f in ['ทั้งหมด', 'รอ', 'เสร็จแล้ว']"
                    :key="f"
                    @click="filter = f"
                    class="px-4 py-1.5 text-xs font-bold rounded-lg transition-all"
                    :class="
                        filter === f
                            ? 'bg-white text-indigo-600 shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                    "
                >
                    {{ f }}
                </button>
            </div>
        </div>

        <div class="space-y-4 flex-1">
            <div
                v-for="item in filteredSchedule"
                :key="item.id"
                class="flex items-center justify-between p-4 rounded-2xl transition-all"
                :class="
                    item.status === 'LIVE'
                        ? 'bg-indigo-50/50 ring-1 ring-indigo-100'
                        : 'hover:bg-slate-50'
                "
            >
                <div class="flex items-center gap-4">
                    <!-- Time & Duration -->
                    <div class="text-center w-12 shrink-0">
                        <div
                            class="text-sm font-bold"
                            :class="item.status === 'LIVE' ? 'text-indigo-600' : 'text-gray-700'"
                        >
                            {{ item.time }}
                        </div>
                        <div class="text-[10px] text-gray-400 font-medium mt-0.5">
                            {{ item.duration }}
                        </div>
                    </div>

                    <!-- Avatar -->
                    <div
                        class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
                        :class="
                            item.status === 'COMPLETED'
                                ? 'bg-emerald-50 text-emerald-600'
                                : item.id % 2 === 0
                                  ? 'bg-orange-50 text-orange-600'
                                  : 'bg-blue-50 text-blue-600'
                        "
                    >
                        {{ item.initial }}
                    </div>

                    <!-- Details -->
                    <div>
                        <div class="flex items-center gap-2 mb-0.5">
                            <span
                                class="font-bold text-gray-900 text-sm"
                                :class="
                                    item.status === 'COMPLETED' ? 'line-through text-gray-400' : ''
                                "
                                >{{ item.patient }}</span
                            >
                            <UBadge
                                v-if="item.isVip"
                                size="xs"
                                variant="subtle"
                                class="text-[9px] px-1.5 py-0"
                                >VIP</UBadge
                            >
                            <UBadge
                                v-if="item.status === 'LIVE'"
                                size="xs"
                                variant="subtle"
                                class="text-[9px] px-1.5 py-0 font-bold"
                            >
                                <span
                                    class="w-1.5 h-1.5 rounded-full bg-rose-500 mr-1 animate-pulse"
                                ></span>
                                LIVE
                            </UBadge>
                            <span
                                v-if="item.status === 'WAITING'"
                                class="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md flex items-center gap-1"
                            >
                                <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                                รอเข้าห้อง
                            </span>
                            <span
                                v-if="item.status === 'COMPLETED'"
                                class="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1"
                            >
                                <UIcon name="i-heroicons-check" class="w-3 h-3" />
                                เสร็จแล้ว
                            </span>
                        </div>
                        <div class="text-[11px] text-gray-500 font-medium">
                            {{ item.type }} <span v-if="item.hn">· {{ item.hn }}</span>
                        </div>
                    </div>
                </div>

                <!-- Action Button -->
                <div>
                    <UButton
                        v-if="
                            item.status === 'LIVE' ||
                            item.status === 'UPCOMING' ||
                            item.status === 'WAITING'
                        "
                        :variant="item.status === 'LIVE' ? 'solid' : 'ghost'"
                        size="sm"
                        class="rounded-lg font-bold"
                        :class="item.status === 'LIVE' ? 'shadow-sm' : 'ring-1 ring-gray-200'"
                        trailing-icon="i-heroicons-chevron-right"
                    >
                        เข้าห้อง
                    </UButton>
                    <UButton
                        v-else-if="item.status === 'COMPLETED'"
                        variant="ghost"
                        size="sm"
                        class="rounded-lg font-bold ring-1 ring-gray-200 text-gray-600"
                    >
                        ดูสรุป
                    </UButton>
                </div>
            </div>

            <div class="pt-2">
                <button
                    class="w-full py-3 rounded-xl border border-dashed border-indigo-200 text-indigo-600 text-xs font-bold hover:bg-indigo-50 transition-colors"
                >
                    + ดูเซสชันที่เหลืออีก 9 รายการ
                </button>
            </div>
        </div>
    </div>
</template>
