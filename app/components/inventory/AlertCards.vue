<script setup lang="ts">
    import type { InventorySummary } from '~/client/inventory'

    defineProps<{
        summary: InventorySummary
    }>()

    const formatNumber = (num: number) => new Intl.NumberFormat('th-TH').format(num)
</script>

<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <!-- หมดอายุ / ใกล้หมด -->
        <div class="bg-white rounded-2xl p-5 ring-1 ring-orange-100 shadow-sm">
            <div class="flex items-start justify-between mb-3">
                <div>
                    <div class="text-xs font-bold text-gray-500">หมดอายุ / ใกล้หมด</div>
                </div>
                <div class="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
                    <UIcon name="i-lucide-triangle-alert" class="w-4 h-4 text-orange-500" />
                </div>
            </div>
            <div class="text-3xl font-black text-gray-900 mb-1">{{ summary.expiringSoon }}</div>
            <div class="text-xs text-gray-400 font-medium">lot</div>
            <div class="mt-3 pt-3 border-t border-gray-50 flex items-center justify-between">
                <div class="text-[11px] text-gray-400">
                    ภายใน 30 วัน · มูลค่าเสี่ยง
                    <span class="font-bold text-orange-500">฿{{ formatNumber(summary.expiringValue) }}</span>
                </div>
                <button class="text-[11px] font-bold text-orange-500 hover:text-orange-600 flex items-center gap-0.5">
                    ดูทั้งหมด
                    <UIcon name="i-lucide-chevron-right" class="w-3 h-3" />
                </button>
            </div>
        </div>

        <!-- สต็อกต่ำ -->
        <div class="bg-white rounded-2xl p-5 ring-1 ring-yellow-100 shadow-sm">
            <div class="flex items-start justify-between mb-3">
                <div>
                    <div class="text-xs font-bold text-gray-500">สต็อกต่ำ</div>
                </div>
                <div class="w-8 h-8 rounded-xl bg-yellow-50 flex items-center justify-center flex-shrink-0">
                    <UIcon name="i-lucide-triangle-alert" class="w-4 h-4 text-yellow-500" />
                </div>
            </div>
            <div class="text-3xl font-black text-gray-900 mb-1">{{ summary.lowStock }}</div>
            <div class="text-xs text-gray-400 font-medium">รายการ</div>
            <div class="mt-3 pt-3 border-t border-gray-50 flex items-center justify-between">
                <div class="text-[11px] text-gray-400">ต่ำกว่าจุดสั่งซื้อ</div>
                <button class="text-[11px] font-bold text-yellow-600 hover:text-yellow-700 flex items-center gap-0.5">
                    สั่งซื้อ
                    <UIcon name="i-lucide-chevron-right" class="w-3 h-3" />
                </button>
            </div>
        </div>

        <!-- รอสั่งซื้อ (PO) -->
        <div class="bg-white rounded-2xl p-5 ring-1 ring-blue-100 shadow-sm">
            <div class="flex items-start justify-between mb-3">
                <div>
                    <div class="text-xs font-bold text-gray-500">รอสั่งซื้อ (PO)</div>
                </div>
                <div class="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <UIcon name="i-lucide-shopping-cart" class="w-4 h-4 text-blue-500" />
                </div>
            </div>
            <div class="text-3xl font-black text-gray-900 mb-1">{{ summary.pendingOrders }}</div>
            <div class="text-xs text-gray-400 font-medium">ใบ</div>
            <div class="mt-3 pt-3 border-t border-gray-50">
                <div class="text-[11px] text-gray-400">
                    มูลค่า
                    <span class="font-bold text-blue-600">฿{{ formatNumber(summary.pendingValue) }}</span>
                    · เข้า {{ summary.pendingArrivalDays }} วัน
                </div>
            </div>
        </div>

        <!-- เบิกใช้สัปดาห์นี้ -->
        <div class="bg-white rounded-2xl p-5 ring-1 ring-emerald-100 shadow-sm">
            <div class="flex items-start justify-between mb-3">
                <div>
                    <div class="text-xs font-bold text-gray-500">เบิกใช้สัปดาห์นี้</div>
                </div>
                <div class="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                    <UIcon name="i-lucide-refresh-cw" class="w-4 h-4 text-emerald-500" />
                </div>
            </div>
            <div class="text-2xl font-black text-gray-900 mb-1">
                ฿{{ formatNumber(summary.weeklyUsage) }}
            </div>
            <div class="mt-3 pt-3 border-t border-gray-50">
                <div class="text-[11px] flex items-center gap-1">
                    <span class="font-bold text-emerald-500">{{ summary.weeklyTrend }}</span>
                    <span class="text-gray-400">vs สัปดาห์ก่อน</span>
                </div>
            </div>
        </div>
    </div>
</template>
