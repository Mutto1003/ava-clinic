<script setup lang="ts">
    import type { BillingData, BillingPlan, BillingCycle } from '~/client/settings/billing'

    const props = defineProps<{
        plans: BillingData['plans']
        currentPlan: BillingPlan
        billingCycle: BillingCycle
    }>()
    const emit = defineEmits<{
        'update:billingCycle': [v: BillingCycle]
        'changePlan': [plan: BillingPlan]
    }>()

    const cycle = computed({
        get: () => props.billingCycle,
        set: (v) => emit('update:billingCycle', v)
    })

    function displayPrice(plan: BillingData['plans'][0]) {
        if (plan.key === 'enterprise') return 'กำหนดเอง'
        return cycle.value === 'yearly' ? plan.priceYearly.toLocaleString() : plan.priceMonthly.toLocaleString()
    }
</script>

<template>
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div class="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-50">
            <div class="flex items-center gap-3">
                <span class="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-black">01</span>
                <div>
                    <h2 class="font-black text-gray-900 text-base">แผนการใช้งาน</h2>
                    <p class="text-[11px] text-gray-400 font-medium mt-0.5">
                        ปัจจุบันอยู่ในแผน Professional · ต่ออายุอัตโนมัติทุกวันที่ 1 ของเดือน
                    </p>
                </div>
            </div>
            <!-- Billing cycle toggle -->
            <div class="flex items-center bg-gray-100 rounded-xl p-1 gap-1">
                <button
                    class="px-4 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                    :class="cycle === 'monthly' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'"
                    @click="cycle = 'monthly'"
                >รายเดือน</button>
                <button
                    class="px-4 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                    :class="cycle === 'yearly' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'"
                    @click="cycle = 'yearly'"
                >
                    รายปี
                    <span class="text-[10px] font-black text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">-15%</span>
                </button>
            </div>
        </div>

        <div class="p-6 grid grid-cols-3 gap-4">
            <div
                v-for="plan in plans"
                :key="plan.key"
                class="relative rounded-2xl border-2 p-5 flex flex-col transition-all"
                :class="plan.isCurrent
                    ? 'border-indigo-500 bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 text-white shadow-lg shadow-indigo-200'
                    : 'border-gray-200 bg-white hover:border-gray-300'"
            >
                <!-- Tags -->
                <div class="flex items-center gap-2 mb-3">
                    <span
                        v-if="plan.isCurrent"
                        class="text-[10px] font-black px-2 py-0.5 rounded-full bg-white/20 text-white"
                    >ปัจจุบัน</span>
                    <span
                        v-if="plan.isPopular && !plan.isCurrent"
                        class="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-100 text-amber-700"
                    >POPULAR</span>
                </div>

                <p
                    class="text-xs font-black tracking-widest mb-1"
                    :class="plan.isCurrent ? 'text-indigo-200' : 'text-gray-500'"
                >{{ plan.name }}</p>
                <div class="flex items-end gap-1 mb-1">
                    <span
                        v-if="plan.key !== 'enterprise'"
                        class="text-3xl font-black"
                        :class="plan.isCurrent ? 'text-white' : 'text-gray-900'"
                    >฿{{ displayPrice(plan) }}</span>
                    <span
                        v-else
                        class="text-3xl font-black"
                        :class="plan.isCurrent ? 'text-white' : 'text-gray-900'"
                    >กำหนดเอง</span>
                    <span
                        v-if="plan.key !== 'enterprise'"
                        class="text-xs font-bold pb-1"
                        :class="plan.isCurrent ? 'text-indigo-200' : 'text-gray-400'"
                    >/เดือน</span>
                </div>
                <p
                    class="text-[11px] font-medium mb-4 leading-relaxed"
                    :class="plan.isCurrent ? 'text-indigo-100' : 'text-gray-500'"
                >{{ plan.tagline }}</p>

                <ul class="space-y-2 mb-5 flex-1">
                    <li
                        v-for="f in plan.features"
                        :key="f"
                        class="flex items-start gap-2 text-[11px] font-medium"
                        :class="plan.isCurrent ? 'text-indigo-100' : 'text-gray-600'"
                    >
                        <UIcon
                            name="i-lucide-check"
                            class="w-3.5 h-3.5 shrink-0 mt-0.5"
                            :class="plan.isCurrent ? 'text-indigo-300' : 'text-indigo-500'"
                        />
                        {{ f }}
                    </li>
                </ul>

                <button
                    class="w-full py-2 text-xs font-black rounded-xl transition-colors cursor-pointer"
                    :class="plan.isCurrent
                        ? 'bg-white/20 text-white hover:bg-white/30 border border-white/30'
                        : plan.key === 'enterprise'
                            ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
                    @click="plan.key !== currentPlan && emit('changePlan', plan.key)"
                >
                    <span v-if="plan.isCurrent">แผนปัจจุบัน</span>
                    <span v-else-if="plan.key === 'enterprise'">ติดต่อทีมขาย</span>
                    <span v-else-if="plan.key === 'starter'">ลดดาวน์เกรด</span>
                    <span v-else>อัปเกรด</span>
                </button>
            </div>
        </div>
    </div>
</template>
