<script setup lang="ts">
    import type { BillingData } from '~/client/settings/billing'

    defineProps<{
        usage: BillingData['usage']
        dataAsOf: string
        nextBillingDate: string
    }>()

    function usagePercent(metric: BillingData['usage'][0]): number {
        if (metric.unlimited || metric.total === null) return 0
        return Math.min(100, Math.round((metric.used / metric.total) * 100))
    }

    function barColor(metric: BillingData['usage'][0]): string {
        const pct = usagePercent(metric)
        if (pct >= metric.warningThreshold && pct < 100) return 'bg-amber-400'
        if (pct >= 100) return 'bg-red-500'
        return 'bg-emerald-500'
    }

    function usageLabel(metric: BillingData['usage'][0]): string {
        if (metric.unlimited || metric.total === null) return `${metric.used} / ∞ ${metric.unit}`
        return `${metric.used}/${metric.total} ${metric.unit}`
    }

    function sublabel(metric: BillingData['usage'][0]): string {
        if (metric.unlimited || metric.total === null) return 'ไม่จำกัดใน Pro'
        const pct = usagePercent(metric)
        if (pct >= 100) return 'ใช้งานเต็มโควต้า · อัปเกรดเพื่อเพิ่ม'
        return `${pct}% ของโควต้า`
    }
</script>

<template>
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div class="px-6 pt-5 pb-4 border-b border-gray-50">
            <div class="flex items-center gap-3">
                <span class="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-black">02</span>
                <div>
                    <h2 class="font-black text-gray-900 text-base">การใช้งานในรอบนี้</h2>
                    <p class="text-[11px] text-gray-400 font-medium mt-0.5">
                        ข้อมูลถึง {{ dataAsOf }} · รอบบิลถัดไป {{ nextBillingDate }}
                    </p>
                </div>
                <span class="ml-auto text-[10px] text-gray-400 font-medium">อัปเดตทุก 1 ชั่วโมง</span>
            </div>
        </div>

        <div class="p-6 grid grid-cols-2 gap-5">
            <div
                v-for="metric in usage"
                :key="metric.label"
            >
                <div class="flex items-center justify-between mb-1.5">
                    <span class="text-xs font-black text-gray-700">{{ metric.label }}</span>
                    <span class="text-xs font-bold text-gray-500">{{ usageLabel(metric) }}</span>
                </div>
                <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                        class="h-full rounded-full transition-all duration-500"
                        :class="[barColor(metric), metric.unlimited ? 'w-1/4 opacity-30' : '']"
                        :style="metric.unlimited ? {} : { width: `${usagePercent(metric)}%` }"
                    />
                </div>
                <p
                    class="text-[10px] font-medium mt-1"
                    :class="usagePercent(metric) >= 100 ? 'text-red-500' : 'text-gray-400'"
                >{{ sublabel(metric) }}</p>
            </div>
        </div>

        <!-- Warning banner when branch quota full -->
        <div
            v-if="usage.some(m => !m.unlimited && m.total !== null && m.used >= (m.total ?? 0))"
            class="mx-6 mb-5 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5"
        >
            <UIcon name="i-lucide-alert-triangle" class="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <p class="text-xs font-bold text-amber-700">
                สาขาเต็มโควต้าแล้ว — หากต้องการเปิดสาขาเพิ่มเติม โปรดอัปเกรดเป็น Enterprise หรือซื้อ Add-on รายสาขา ฿990/เดือน
            </p>
        </div>
    </div>
</template>
