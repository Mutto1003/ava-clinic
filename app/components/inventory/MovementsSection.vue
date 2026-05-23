<script setup lang="ts">
    import type { InventoryMovement } from '~/client/inventory'

    defineProps<{
        movements: InventoryMovement[]
    }>()

    function movementIcon(type: string) {
        if (type === 'in') return 'i-lucide-arrow-down-to-line'
        if (type === 'out') return 'i-lucide-arrow-up-from-line'
        return 'i-lucide-arrow-left-right'
    }

    function movementColor(type: string) {
        if (type === 'in') return 'bg-emerald-50 text-emerald-600'
        if (type === 'out') return 'bg-orange-50 text-orange-600'
        return 'bg-blue-50 text-blue-600'
    }

    function movementLabel(type: string) {
        if (type === 'in') return 'รับเข้า'
        if (type === 'out') return 'เบิกออก'
        return 'ปรับสต็อก'
    }
</script>

<template>
    <div class="bg-white rounded-2xl ring-1 ring-gray-100 shadow-sm p-5">
        <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-2">
                <span class="w-1 h-4 rounded-full bg-blue-500 inline-block"></span>
                <h3 class="text-sm font-bold text-gray-900">ความเคลื่อนไหวสต็อก</h3>
            </div>
            <button class="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-0.5">
                ดูทั้งหมด
                <UIcon name="i-lucide-chevron-right" class="w-3.5 h-3.5" />
            </button>
        </div>

        <div class="space-y-2">
            <div
                v-for="mov in movements"
                :key="mov.id"
                class="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
            >
                <div
                    class="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                    :class="movementColor(mov.type)"
                >
                    <UIcon :name="movementIcon(mov.type)" class="w-4 h-4" />
                </div>
                <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between gap-2">
                        <span class="text-xs font-semibold text-gray-800 truncate">{{ mov.itemName }}</span>
                        <span class="text-xs font-bold flex-shrink-0" :class="mov.type === 'out' ? 'text-orange-600' : 'text-emerald-600'">
                            {{ mov.type === 'out' ? '-' : '+' }}{{ mov.amount }} {{ mov.unit }}
                        </span>
                    </div>
                    <div class="flex items-center gap-2 mt-0.5 text-[10px] text-gray-400">
                        <span class="font-semibold px-1.5 py-0.5 rounded-full text-[9px]" :class="movementColor(mov.type)">
                            {{ movementLabel(mov.type) }}
                        </span>
                        <span>{{ mov.by }}</span>
                        <span v-if="mov.room">· {{ mov.room }}</span>
                        <span>· {{ mov.time }} {{ mov.date }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
