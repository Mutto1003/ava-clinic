<script setup lang="ts">
    import type { InventorySummary } from '~/client/inventory'

    defineProps<{
        summary: InventorySummary
    }>()

    const formatNumber = (num: number) => new Intl.NumberFormat('th-TH').format(num)
    const formatMillion = (num: number) => {
        if (num >= 1000000) return `฿${(num / 1000000).toFixed(2)}M`
        if (num >= 1000) return `฿${(num / 1000).toFixed(0)}K`
        return `฿${formatNumber(num)}`
    }
</script>

<template>
    <div
        class="rounded-3xl overflow-hidden relative"
        style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 60%, #9333ea 100%)"
    >
        <div class="absolute inset-0 pointer-events-none overflow-hidden">
            <div
                class="absolute w-80 h-80 rounded-full opacity-10"
                style="background: white; top: -100px; right: -80px"
            ></div>
            <div
                class="absolute w-48 h-48 rounded-full opacity-5"
                style="background: white; bottom: -60px; left: 40px"
            ></div>
        </div>

        <div class="relative z-10 px-8 pt-7 pb-5">
            <div class="flex flex-wrap items-start justify-between gap-4">
                <div class="flex items-start gap-4">
                    <div
                        class="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                        style="background: rgba(255,255,255,0.18)"
                    >
                        <UIcon name="i-lucide-package" class="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 class="text-2xl font-bold text-white tracking-tight">คลังยา & เวชภัณฑ์</h1>
                        <p class="text-sm mt-0.5" style="color: rgba(255,255,255,0.65)">
                            จัดการสต็อกยาฉีด, Filler, ยาชา และอุปกรณ์หัตถการ
                        </p>
                    </div>
                </div>

                <div class="flex items-center gap-3 flex-wrap">
                    <UButton
                        variant="ghost"
                        icon="i-lucide-download"
                        class="rounded-xl font-semibold text-white"
                        style="background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.2)"
                    >
                        Export
                    </UButton>
                    <UButton
                        variant="ghost"
                        icon="i-lucide-arrow-up-from-line"
                        class="rounded-xl font-semibold text-white"
                        style="background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.2)"
                    >
                        เบิกใช้
                    </UButton>
                    <UButton
                        icon="i-lucide-arrow-down-to-line"
                        class="rounded-xl font-bold px-5 shadow-lg"
                        style="background: white; color: #4f46e5"
                    >
                        รับเข้าสินค้า
                    </UButton>
                </div>
            </div>

            <div
                class="mt-5 pt-4 flex flex-wrap gap-6"
                style="border-top: 1px solid rgba(255,255,255,0.15)"
            >
                <div>
                    <div class="text-xs font-semibold" style="color: rgba(255,255,255,0.55)">สินค้าทั้งหมด</div>
                    <div class="text-2xl font-black text-white mt-0.5">
                        {{ formatNumber(summary.totalItems) }}
                        <span class="text-sm font-medium" style="color: rgba(255,255,255,0.65)">รายการ</span>
                    </div>
                </div>
                <div class="w-px" style="background: rgba(255,255,255,0.15)"></div>
                <div>
                    <div class="text-xs font-semibold" style="color: rgba(255,255,255,0.55)">มูลค่ารวม</div>
                    <div class="text-2xl font-black text-white mt-0.5">{{ formatMillion(summary.totalValue) }}</div>
                </div>
                <div class="w-px" style="background: rgba(255,255,255,0.15)"></div>
                <div>
                    <div class="text-xs font-semibold" style="color: rgba(255,255,255,0.55)">หมดอายุใน 30 วัน</div>
                    <div class="text-2xl font-black mt-0.5" style="color: #fbbf24">
                        {{ summary.expiringSoon }}
                        <span class="text-sm font-medium" style="color: rgba(255,255,255,0.65)">lot</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
