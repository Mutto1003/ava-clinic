<script setup lang="ts">
    import type { InventoryExpiryItem } from '~/client/inventory'

    defineProps<{
        expiring: InventoryExpiryItem[]
    }>()

    function daysBadgeClass(days: number) {
        if (days <= 14) return 'bg-red-500 text-white'
        if (days <= 30) return 'bg-orange-400 text-white'
        return 'bg-gray-200 text-gray-600'
    }
</script>

<template>
    <div class="bg-white rounded-2xl ring-1 ring-gray-100 shadow-sm p-5">
        <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-2">
                <span class="w-1 h-4 rounded-full bg-orange-500 inline-block"></span>
                <h3 class="text-sm font-bold text-gray-900">ใกล้หมดอายุ</h3>
            </div>
            <button class="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-0.5">
                ดูทั้งหมด
                <UIcon name="i-lucide-chevron-right" class="w-3.5 h-3.5" />
            </button>
        </div>

        <div class="space-y-2">
            <div
                v-for="item in expiring"
                :key="item.id"
                class="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
            >
                <div
                    class="text-[10px] font-black px-2 py-1 rounded-lg flex-shrink-0 min-w-[48px] text-center"
                    :class="daysBadgeClass(item.daysLeft)"
                >
                    {{ item.daysLeft }} วัน
                </div>
                <div class="flex-1 min-w-0">
                    <div class="text-xs font-semibold text-gray-800 truncate">{{ item.name }}</div>
                    <div class="text-[10px] text-gray-400 mt-0.5">
                        Lot: {{ item.lot }} · คงเหลือ {{ item.stock }} {{ item.unit }}
                    </div>
                </div>
                <button class="text-[10px] font-bold text-indigo-600 hover:text-indigo-700 flex-shrink-0">
                    จัดการ
                </button>
            </div>
        </div>
    </div>
</template>
