<script setup lang="ts">
    import type { InventoryCategoryValue, InventorySummary } from '~/client/inventory'

    const props = defineProps<{
        categoryValues: InventoryCategoryValue[]
        summary: InventorySummary
    }>()

    const formatK = (num: number) => {
        if (num >= 1000000) return `฿${(num / 1000000).toFixed(2)}M`
        if (num >= 1000) return `฿${Math.round(num / 1000)}K`
        return `฿${num}`
    }

    const total = computed(() => props.categoryValues.reduce((sum, c) => sum + c.value, 0))

    const segments = computed(() => {
        let offset = 0
        const circumference = 2 * Math.PI * 54
        return props.categoryValues.map(cat => {
            const pct = cat.value / total.value
            const dash = pct * circumference
            const segment = { color: cat.color, offset, dash, gap: circumference - dash }
            offset += dash
            return segment
        })
    })
</script>

<template>
    <div class="bg-white rounded-2xl ring-1 ring-gray-100 shadow-sm p-5">
        <div class="flex items-center gap-2 mb-4">
            <span class="w-1 h-4 rounded-full bg-purple-500 inline-block"></span>
            <div>
                <h3 class="text-sm font-bold text-gray-900">มูลค่าตามหมวด</h3>
                <div class="text-[11px] text-gray-400">รวม {{ formatK(summary.totalValue) }} · {{ categoryValues.length }} หมวด</div>
            </div>
        </div>

        <div class="flex items-center gap-6">
            <!-- Donut chart SVG -->
            <div class="relative flex-shrink-0 w-28 h-28">
                <svg viewBox="0 0 120 120" class="w-full h-full -rotate-90">
                    <circle cx="60" cy="60" r="54" fill="none" stroke="#f3f4f6" stroke-width="12" />
                    <circle
                        v-for="(seg, i) in segments"
                        :key="i"
                        cx="60"
                        cy="60"
                        r="54"
                        fill="none"
                        :stroke="seg.color"
                        stroke-width="12"
                        stroke-linecap="round"
                        :stroke-dasharray="`${seg.dash - 2} ${seg.gap + 2}`"
                        :stroke-dashoffset="-seg.offset"
                    />
                </svg>
                <div class="absolute inset-0 flex flex-col items-center justify-center">
                    <div class="text-base font-black text-gray-900">{{ formatK(summary.totalValue) }}</div>
                    <div class="text-[10px] text-gray-400 font-medium">มูลค่ารวม</div>
                </div>
            </div>

            <!-- Legend -->
            <div class="flex-1 flex flex-col gap-2">
                <div
                    v-for="cat in categoryValues"
                    :key="cat.name"
                    class="flex items-center justify-between"
                >
                    <div class="flex items-center gap-2">
                        <span class="w-2.5 h-2.5 rounded-full flex-shrink-0" :style="{ background: cat.color }"></span>
                        <span class="text-[12px] text-gray-600 font-medium">{{ cat.name }}</span>
                    </div>
                    <span class="text-[12px] font-bold text-gray-800">{{ formatK(cat.value) }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
