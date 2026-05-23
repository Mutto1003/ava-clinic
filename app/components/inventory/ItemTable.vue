<script setup lang="ts">
    import type { InventoryItem } from '~/client/inventory'

    defineProps<{
        items: InventoryItem[]
    }>()

    const formatNumber = (num: number) => new Intl.NumberFormat('th-TH').format(num)

    function expiryBadgeClass(daysLeft: number) {
        if (daysLeft <= 14) return 'bg-red-100 text-red-700'
        if (daysLeft <= 30) return 'bg-orange-100 text-orange-700'
        return 'bg-gray-100 text-gray-500'
    }

    function stockBadgeClass(stock: number, maxStock: number) {
        const ratio = stock / maxStock
        if (ratio <= 0.2) return 'text-red-600 font-bold'
        if (ratio <= 0.4) return 'text-orange-500 font-semibold'
        return 'text-gray-700'
    }
</script>

<template>
    <div class="bg-white rounded-2xl ring-1 ring-gray-100 shadow-sm overflow-hidden">
        <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <div class="flex items-center gap-2">
                <span class="w-1 h-4 rounded-full bg-indigo-500 inline-block"></span>
                <h3 class="text-sm font-bold text-gray-900">รายการสินค้า</h3>
            </div>
            <button class="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-0.5">
                ดูทั้งหมด
                <UIcon name="i-lucide-chevron-right" class="w-3.5 h-3.5" />
            </button>
        </div>

        <div class="overflow-x-auto">
            <table class="w-full text-sm">
                <thead>
                    <tr class="border-b border-gray-100">
                        <th class="text-left px-5 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider">สินค้า</th>
                        <th class="text-left px-3 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider">หมวด</th>
                        <th class="text-left px-3 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Lot</th>
                        <th class="text-left px-3 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider">หมดอายุ</th>
                        <th class="text-right px-3 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider">สต็อก</th>
                        <th class="text-left px-3 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider">ตำแหน่ง</th>
                        <th class="text-right px-5 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider">ราคา/หน่วย</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-50">
                    <tr
                        v-for="item in items"
                        :key="item.id"
                        class="hover:bg-gray-50 transition-colors"
                    >
                        <td class="px-5 py-3">
                            <div class="flex items-center gap-2.5">
                                <div
                                    class="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold"
                                    :class="[item.iconBg, item.iconColor]"
                                >
                                    {{ item.name.substring(0, 2) }}
                                </div>
                                <div>
                                    <div class="font-semibold text-gray-800 text-xs">{{ item.name }}</div>
                                    <div class="text-[10px] text-gray-400">{{ item.brand }} · {{ item.type }}</div>
                                </div>
                            </div>
                        </td>
                        <td class="px-3 py-3">
                            <span class="text-xs text-gray-500">{{ item.category }}</span>
                        </td>
                        <td class="px-3 py-3">
                            <div class="text-xs font-mono text-gray-700">{{ item.lot }}</div>
                            <div class="text-[10px] text-gray-400">{{ item.lotType }}</div>
                        </td>
                        <td class="px-3 py-3">
                            <div class="text-xs text-gray-700">{{ item.expiryDate }}</div>
                            <span
                                class="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                                :class="expiryBadgeClass(item.daysLeft)"
                            >
                                {{ item.daysLeft }} วัน
                            </span>
                        </td>
                        <td class="px-3 py-3 text-right">
                            <span :class="stockBadgeClass(item.stock, item.maxStock)" class="text-xs">
                                {{ item.stock }}
                            </span>
                            <span class="text-[10px] text-gray-400">/{{ item.maxStock }} {{ item.unit }}</span>
                        </td>
                        <td class="px-3 py-3">
                            <span class="text-xs text-gray-500">{{ item.location }}</span>
                        </td>
                        <td class="px-5 py-3 text-right">
                            <span class="text-xs font-semibold text-gray-800">฿{{ formatNumber(item.price) }}</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
