<script setup lang="ts">
    import type { BillingData } from '~/client/settings/billing'

    defineProps<{ invoices: BillingData['invoices'] }>()

    const emit = defineEmits<{ exportCsv: [] }>()

    function statusLabel(status: BillingData['invoices'][0]['status']): string {
        return { paid: 'ชำระแล้ว', pending: 'รอชำระ', failed: 'ชำระไม่สำเร็จ' }[status]
    }

    function statusClass(status: BillingData['invoices'][0]['status']): string {
        return {
            paid: 'bg-emerald-50 text-emerald-700 border-emerald-100',
            pending: 'bg-amber-50 text-amber-700 border-amber-100',
            failed: 'bg-red-50 text-red-700 border-red-100'
        }[status]
    }
</script>

<template>
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div class="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-50">
            <div class="flex items-center gap-3">
                <span class="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-black">05</span>
                <div>
                    <h2 class="font-black text-gray-900 text-base">ประวัติการเรียกเก็บ (ที่คลินิกจ่ายให้ระบบ)</h2>
                    <p class="text-[11px] text-gray-400 font-medium mt-0.5">ใบแจ้งหนี้ที่ใช้งานในระบบและบริการเสริมย้อนหลัง 12 เดือน</p>
                </div>
            </div>
            <button
                class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
                @click="emit('exportCsv')"
            >
                <UIcon name="i-lucide-download" class="w-3.5 h-3.5" />
                Export CSV
            </button>
        </div>

        <table class="w-full text-sm">
            <thead>
                <tr class="bg-gray-50/60">
                    <th class="text-left text-[11px] font-black text-gray-500 px-6 py-3">เลขที่</th>
                    <th class="text-left text-[11px] font-black text-gray-500 px-4 py-3">รายการ</th>
                    <th class="text-left text-[11px] font-black text-gray-500 px-4 py-3">วันที่</th>
                    <th class="text-right text-[11px] font-black text-gray-500 px-4 py-3">ยอด</th>
                    <th class="text-center text-[11px] font-black text-gray-500 px-4 py-3">สถานะ</th>
                    <th class="px-4 py-3" />
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
                <tr
                    v-for="inv in invoices"
                    :key="inv.id"
                    class="hover:bg-gray-50/40 transition-colors group"
                >
                    <td class="px-6 py-3.5">
                        <span class="text-xs font-black text-indigo-600">{{ inv.id }}</span>
                    </td>
                    <td class="px-4 py-3.5">
                        <p class="text-xs font-bold text-gray-900">{{ inv.plan }}</p>
                        <p class="text-[10px] text-gray-400 font-medium">{{ inv.period }}</p>
                    </td>
                    <td class="px-4 py-3.5 text-xs text-gray-500 font-medium">{{ inv.date }}</td>
                    <td class="px-4 py-3.5 text-right text-xs font-black text-gray-900">
                        ฿{{ inv.amount.toLocaleString() }}
                    </td>
                    <td class="px-4 py-3.5 text-center">
                        <span
                            class="inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full border"
                            :class="statusClass(inv.status)"
                        >
                            <UIcon
                                :name="inv.status === 'paid' ? 'i-lucide-check' : inv.status === 'pending' ? 'i-lucide-clock' : 'i-lucide-x'"
                                class="w-2.5 h-2.5"
                            />
                            {{ statusLabel(inv.status) }}
                        </span>
                    </td>
                    <td class="px-4 py-3.5">
                        <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity justify-end">
                            <button class="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
                                <UIcon name="i-lucide-download" class="w-3.5 h-3.5" />
                            </button>
                            <button class="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
                                <UIcon name="i-lucide-more-vertical" class="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
