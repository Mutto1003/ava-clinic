<script setup lang="ts">
    import type { TeleconsultScheduleItem } from '~/client/teleconsult'

    const props = defineProps<{
        schedule: TeleconsultScheduleItem[]
    }>()

    type FilterKey = 'ทั้งหมด' | 'รอ' | 'เสร็จแล้ว'
    const filter = ref<FilterKey>('ทั้งหมด')

    const waitingCount = computed(() => props.schedule.filter(i => i.status !== 'COMPLETED').length)
    const completedCount = computed(() => props.schedule.filter(i => i.status === 'COMPLETED').length)
    const liveCount = computed(() => props.schedule.filter(i => i.status === 'LIVE').length)

    const filteredSchedule = computed(() => {
        if (filter.value === 'รอ') return props.schedule.filter(i => i.status !== 'COMPLETED')
        if (filter.value === 'เสร็จแล้ว') return props.schedule.filter(i => i.status === 'COMPLETED')
        return props.schedule
    })

    const avatarColors: Record<number, string> = {
        1: 'bg-rose-100 text-rose-600',
        2: 'bg-orange-100 text-orange-600',
        3: 'bg-blue-100 text-blue-600',
        4: 'bg-purple-100 text-purple-600',
        5: 'bg-emerald-100 text-emerald-600',
        6: 'bg-teal-100 text-teal-600'
    }

    const getAvatarClass = (item: TeleconsultScheduleItem) => {
        if (item.status === 'COMPLETED') return 'bg-emerald-50 text-emerald-600'
        return avatarColors[item.id] ?? 'bg-gray-100 text-gray-600'
    }
</script>

<template>
    <div class="bg-white rounded-2xl ring-1 ring-gray-100 shadow-sm p-5 flex flex-col h-full">
        <div class="flex justify-between items-center mb-6">
            <div>
                <h2 class="font-bold text-gray-900 text-lg">ตารางวันนี้</h2>
                <p class="text-xs text-gray-500 font-medium">
                    {{ schedule.length }} เซสชัน
                    <span class="text-gray-300 mx-1">·</span>
                    {{ waitingCount }} รออยู่
                    <span class="text-gray-300 mx-1">·</span>
                    <span class="text-rose-500 font-bold">{{ liveCount }} กำลังตรวจ</span>
                </p>
            </div>

            <div class="flex bg-slate-50 p-1 rounded-xl ring-1 ring-gray-100">
                <button
                    v-for="[key, label] in ([['ทั้งหมด', 'ทั้งหมด'], ['รอ', `รอ ${waitingCount}`], ['เสร็จแล้ว', `เสร็จแล้ว ${completedCount}`]] as [FilterKey, string][])"
                    :key="key"
                    @click="filter = key"
                    class="px-3 py-1.5 text-xs font-bold rounded-lg transition-all"
                    :class="filter === key ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'"
                >
                    {{ label }}
                </button>
            </div>
        </div>

        <div class="space-y-3 flex-1">
            <div
                v-for="item in filteredSchedule"
                :key="item.id"
                class="flex items-center justify-between p-3.5 rounded-2xl transition-all"
                :class="item.status === 'LIVE' ? 'bg-indigo-50/50 ring-1 ring-indigo-100' : 'hover:bg-slate-50'"
            >
                <div class="flex items-center gap-3">
                    <!-- Time & Duration -->
                    <div class="text-center w-11 shrink-0">
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
                        class="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
                        :class="getAvatarClass(item)"
                    >
                        {{ item.initial }}
                    </div>

                    <!-- Details -->
                    <div>
                        <div class="flex items-center gap-1.5 mb-0.5 flex-wrap">
                            <span
                                class="font-bold text-gray-900 text-sm"
                                :class="item.status === 'COMPLETED' ? 'line-through text-gray-400' : ''"
                            >
                                {{ item.patient }}
                            </span>
                            <UBadge
                                v-if="item.isVip"
                                size="xs"
                                variant="subtle"
                                color="warning"
                                class="text-[9px] px-1.5 py-0"
                            >
                                ★ VIP
                            </UBadge>
                            <UBadge
                                v-if="item.isNew"
                                size="xs"
                                variant="subtle"
                                color="success"
                                class="text-[9px] px-1.5 py-0"
                            >
                                เคสใหม่
                            </UBadge>
                            <span
                                v-if="item.status === 'LIVE'"
                                class="inline-flex items-center gap-1 text-[9px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded-md"
                            >
                                <span class="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                                LIVE
                            </span>
                            <span
                                v-if="item.status === 'WAITING'"
                                class="text-[9px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-md flex items-center gap-1"
                            >
                                <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                                รอเข้าห้อง
                            </span>
                            <span
                                v-if="item.status === 'COMPLETED'"
                                class="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md flex items-center gap-1"
                            >
                                <UIcon name="i-heroicons-check" class="w-3 h-3" />
                                เสร็จแล้ว
                            </span>
                        </div>
                        <div class="text-[11px] text-gray-500 font-medium">
                            {{ item.type }}<span v-if="item.hn"> · {{ item.hn }}</span>
                        </div>
                    </div>
                </div>

                <!-- Action -->
                <div class="flex items-center gap-2 shrink-0">
                    <!-- Phone icon for WAITING -->
                    <div
                        v-if="item.status === 'WAITING'"
                        class="w-7 h-7 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center"
                    >
                        <UIcon name="i-heroicons-phone" class="w-3.5 h-3.5" />
                    </div>

                    <!-- Download icon for COMPLETED -->
                    <div
                        v-if="item.status === 'COMPLETED'"
                        class="w-7 h-7 rounded-full bg-gray-50 text-gray-400 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                        <UIcon name="i-heroicons-arrow-down-tray" class="w-3.5 h-3.5" />
                    </div>

                    <UButton
                        v-if="item.status === 'LIVE'"
                        variant="solid"
                        size="sm"
                        class="rounded-lg font-bold shadow-sm"
                        trailing-icon="i-heroicons-chevron-right"
                    >
                        เข้าห้อง
                    </UButton>
                    <UButton
                        v-else-if="item.status === 'WAITING'"
                        variant="ghost"
                        size="sm"
                        class="rounded-lg font-bold ring-1 ring-gray-200 text-gray-600"
                        trailing-icon="i-heroicons-chevron-right"
                    >
                        เข้าห้อง
                    </UButton>
                    <UButton
                        v-else-if="item.status === 'UPCOMING'"
                        variant="ghost"
                        size="sm"
                        class="rounded-lg font-bold ring-1 ring-gray-200 text-gray-600"
                    >
                        เตรียมห้อง
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

            <div class="pt-1">
                <button
                    class="w-full py-3 rounded-xl border border-dashed border-indigo-200 text-indigo-600 text-xs font-bold hover:bg-indigo-50 transition-colors"
                >
                    + ดูเซสชันที่เหลืออีก 8 รายการ
                </button>
            </div>
        </div>
    </div>
</template>
