<script setup lang="ts">
    import type { BillItem } from '~/client/reports'

    defineProps<{
        bills: BillItem[]
        total: number
    }>()

    const fmt = (n: number) => new Intl.NumberFormat('th-TH').format(n)
</script>

<template>
    <div class="bg-white rounded-2xl shadow-sm ring-1 ring-gray-100 p-6 flex flex-col">
        <div class="flex justify-between items-start mb-5">
            <div>
                <h3 class="font-bold text-gray-900">รายการบิลล่าสุด</h3>
                <p class="text-xs text-gray-500 mt-1">
                    {{ bills.length }} รายการล่าสุดจาก {{ fmt(total) }}
                    <span class="text-gray-300 mx-1">·</span>
                    อัปเดตล่าสุดจากระบบ 30 วันที่
                </p>
            </div>
            <UButton
                variant="ghost"
                class="text-xs font-bold text-indigo-600 hover:bg-indigo-50"
                trailing-icon="i-heroicons-chevron-right"
            >
                ดูทั้งหมด
            </UButton>
        </div>

        <div class="overflow-x-auto">
            <table class="w-full text-left text-sm border-collapse">
                <thead>
                    <tr class="border-b border-gray-100 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                        <th class="pb-3 px-2">เลขที่</th>
                        <th class="pb-3 px-2">ลูกค้า</th>
                        <th class="pb-3 px-2">บริการ</th>
                        <th class="pb-3 px-2 text-right">ยอด</th>
                        <th class="pb-3 px-2 text-center">วิธีชำระ</th>
                        <th class="pb-3 px-2 text-right">เวลา</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-50">
                    <tr
                        v-for="bill in bills"
                        :key="bill.id"
                        class="hover:bg-slate-50/50 transition-colors"
                    >
                        <td class="py-3.5 px-2 font-semibold text-indigo-600 text-sm">
                            {{ bill.id }}
                        </td>
                        <td class="py-3.5 px-2">
                            <div class="flex items-center gap-2">
                                <div
                                    class="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                                    :class="bill.color"
                                >
                                    {{ bill.initial }}
                                </div>
                                <span class="font-medium text-gray-800">{{ bill.customer }}</span>
                            </div>
                        </td>
                        <td class="py-3.5 px-2">
                            <div class="font-medium text-gray-800 leading-tight">{{ bill.service }}</div>
                            <div class="text-[11px] text-gray-400 mt-0.5">
                                {{ bill.serviceCount }} {{ bill.serviceUnit }}
                            </div>
                        </td>
                        <td class="py-3.5 px-2 text-right font-bold text-gray-900">
                            ฿{{ fmt(bill.amount) }}
                        </td>
                        <td class="py-3.5 px-2 text-center">
                            <UBadge
                                :class="bill.paymentColor"
                                variant="subtle"
                                size="xs"
                                class="font-semibold"
                            >
                                {{ bill.payment }}
                            </UBadge>
                        </td>
                        <td class="py-3.5 px-2 text-right text-gray-500 text-xs font-medium tabular-nums">
                            {{ bill.time }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
