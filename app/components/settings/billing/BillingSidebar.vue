<script setup lang="ts">
    import type { BillingData } from '~/client/settings/billing'

    const props = defineProps<{
        nextBillingAmount: number
        nextBillingDate: string
        storedPaymentMethods: BillingData['storedPaymentMethods']
        accountCredit: number
        currentCharges: BillingData['currentCharges']
        billingCycle: BillingData['billingCycle']
    }>()

    const emit = defineEmits<{
        deferCycle: []
        editPayment: []
        addPaymentMethod: []
    }>()

    const thMonths: Record<string, number> = {
        'ม.ค.': 0, 'ก.พ.': 1, 'มี.ค.': 2, 'เม.ย.': 3, 'พ.ค.': 4, 'มิ.ย.': 5,
        'ก.ค.': 6, 'ส.ค.': 7, 'ก.ย.': 8, 'ต.ค.': 9, 'พ.ย.': 10, 'ธ.ค.': 11
    }

    const now = ref(0)
    onMounted(() => { now.value = Date.now() })

    const daysUntilBilling = computed(() => {
        if (!now.value) return null
        const parts = props.nextBillingDate.split(' ')
        const day = parseInt(parts[0] ?? '1')
        const month = thMonths[parts[1] ?? ''] ?? 0
        const year = parseInt(parts[2] ?? '2099')
        const target = new Date(year, month, day)
        return Math.max(0, Math.ceil((target.getTime() - now.value) / (1000 * 60 * 60 * 24)))
    })

    const yearlySaving = computed(() => Math.round(props.nextBillingAmount * 12 * 0.15))

    const primaryMethodShortName = computed(() => {
        const method = props.storedPaymentMethods.find(m => m.detail.includes('บัตรหลัก')) ?? props.storedPaymentMethods[0]
        const label = method?.label ?? ''
        const withoutPrefix = label.replace(/^(บัตรเครดิต|บัตรเดบิต|โอนผ่านธนาคาร|ชำระผ่าน)\s*/i, '').trim()
        return (withoutPrefix.split('·')[0] ?? '').trim()
    })
</script>

<template>
    <div class="space-y-4">
        <!-- Next billing card -->
        <div class="bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 rounded-2xl p-5 text-white shadow-lg shadow-indigo-200">
            <p class="text-xs font-bold text-indigo-200 mb-1">บิลรอบถัดไป</p>
            <div class="flex items-end gap-1 mb-1">
                <span class="text-3xl font-black">฿{{ nextBillingAmount.toLocaleString() }}</span>
                <span class="text-xs text-indigo-200 pb-1">/เดือน</span>
            </div>
            <p class="text-xs text-indigo-100 font-medium mb-4">
                เรียกเก็บโดยอัตโนมัติวันที่ {{ nextBillingDate }}
                <br />
                ผ่าน {{ primaryMethodShortName }} · เหลืออีก {{ daysUntilBilling ?? '...' }} วัน
            </p>
            <div class="grid grid-cols-2 gap-2">
                <button
                    class="py-2 text-xs font-bold bg-white/15 hover:bg-white/25 border border-white/20 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    @click="emit('deferCycle')"
                >
                    <UIcon name="i-lucide-calendar" class="w-3.5 h-3.5" />
                    เลื่อนรอบ
                </button>
                <button
                    class="py-2 text-xs font-bold bg-white text-indigo-700 hover:bg-indigo-50 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    @click="emit('editPayment')"
                >
                    <UIcon name="i-lucide-pencil" class="w-3.5 h-3.5" />
                    แก้ไขวิธีชำระ
                </button>
            </div>
        </div>

        <!-- Payment methods card -->
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p class="text-[11px] font-black text-gray-400 uppercase tracking-wide mb-3">วิธีชำระ AVA → ระบบ</p>
            <div class="space-y-2.5">
                <div
                    v-for="method in storedPaymentMethods"
                    :key="method.id"
                    class="flex items-center gap-3"
                >
                    <div
                        class="w-8 h-8 rounded-lg flex items-center justify-center text-white text-[9px] font-black shrink-0"
                        :class="method.color"
                    >{{ method.initials }}</div>
                    <div class="flex-1 min-w-0">
                        <p class="text-xs font-bold text-gray-900 truncate">{{ method.label }}</p>
                        <p class="text-[10px] text-gray-400 font-medium truncate">{{ method.detail }}</p>
                    </div>
                    <button class="w-6 h-6 flex items-center justify-center text-gray-300 hover:text-gray-500 transition-colors cursor-pointer">
                        <UIcon name="i-lucide-more-vertical" class="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>
            <button
                class="mt-3 w-full py-2 text-xs font-bold text-indigo-600 border border-dashed border-indigo-200 rounded-xl hover:bg-indigo-50 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                @click="emit('addPaymentMethod')"
            >
                <UIcon name="i-lucide-plus" class="w-3.5 h-3.5" />
                เพิ่มวิธีชำระ
            </button>
        </div>

        <!-- Account credit -->
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 flex items-center justify-between">
            <p class="text-xs font-bold text-gray-700">เครดิตคงเหลือในบัญชี</p>
            <p class="text-sm font-black text-emerald-600">฿{{ accountCredit.toLocaleString(undefined, { minimumFractionDigits: 2 }) }}</p>
        </div>

        <!-- Current charges breakdown -->
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p class="text-[11px] font-black text-gray-400 uppercase tracking-wide mb-3">★ ค่าใช้จ่ายเดือนนี้</p>
            <div class="flex items-end gap-1 mb-3">
                <span class="text-2xl font-black text-gray-900">฿{{ currentCharges.plan.toLocaleString() }}</span>
                <span class="text-xs text-gray-400 pb-1">= ปกติ</span>
            </div>
            <div class="space-y-2 text-xs">
                <div class="flex justify-between">
                    <span class="text-gray-500">แผน Professional</span>
                    <span class="font-bold text-gray-900">฿{{ currentCharges.plan.toLocaleString() }}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-500">Add-on storage</span>
                    <span class="font-bold text-gray-400">฿{{ currentCharges.addOnStorage || 0 }}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-500">
                        SMS การยืนยันนัด (ใช้ {{ currentCharges.smsReminder.used }}/{{ currentCharges.smsReminder.limit }})
                    </span>
                    <span class="font-bold text-emerald-600">{{ currentCharges.smsReminder.free ? 'ฟรี' : `฿${currentCharges.smsReminder.used}` }}</span>
                </div>
            </div>
        </div>

        <!-- Yearly upsell tip -->
        <div class="bg-amber-50 border border-amber-100 rounded-2xl px-4 py-3 flex items-start gap-2">
            <UIcon name="i-lucide-info" class="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <p class="text-[11px] text-amber-700 font-medium leading-relaxed">
                <span class="font-black">เคล็ดลับ:</span>
                เปลี่ยนเป็นรายปีจะประหยัด ฿{{ yearlySaving.toLocaleString() }}/ปี (-15%) ยังมีสิทธิ์ยกเลิกได้ภายใน 30 วันแรก
            </p>
        </div>
    </div>
</template>
