<script setup lang="ts">
import type { PatientTreatmentProfile } from '~/client/treatments'

defineProps<{
    profile: PatientTreatmentProfile
}>()

function formatCurrency(value: number): string {
    if (value >= 1000000) return `฿${(value / 1000000).toFixed(1)}M`
    if (value >= 1000) return `฿${(value / 1000).toFixed(0)}K`
    return `฿${value.toLocaleString()}`
}
</script>

<template>
    <div class="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-4">
        <!-- Total sessions -->
        <div class="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-4 text-white shadow-lg shadow-indigo-200/40 col-span-1">
            <div class="flex items-center gap-2 mb-2">
                <div class="w-7 h-7 bg-white/20 rounded-xl flex items-center justify-center">
                    <UIcon name="i-lucide-calendar-check" class="w-3.5 h-3.5 text-white" />
                </div>
                <span class="text-[10px] font-black text-indigo-200 uppercase tracking-wider">จำนวนครั้งทั้งหมด</span>
            </div>
            <div class="text-2xl font-black">{{ profile.totalSessions }} <span class="text-sm font-bold text-indigo-200">ครั้ง</span></div>
            <div class="text-[10px] font-semibold text-indigo-300 mt-1">{{ profile.yearsOfService }} ปีที่ใช้บริการ</div>
        </div>

        <!-- Total spending -->
        <div class="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm col-span-1">
            <div class="flex items-center gap-2 mb-2">
                <div class="w-7 h-7 bg-amber-50 rounded-xl flex items-center justify-center">
                    <UIcon name="i-lucide-coins" class="w-3.5 h-3.5 text-amber-500" />
                </div>
                <span class="text-[10px] font-black text-slate-400 uppercase tracking-wider">ยอดใช้จ่ายสะสม</span>
            </div>
            <div class="text-xl font-black text-slate-800">฿{{ profile.totalSpent.toLocaleString() }}</div>
            <div class="flex items-center gap-1.5 mt-1">
                <span class="text-[10px] font-semibold text-slate-400">เฉลี่ย ฿{{ profile.averagePerSession.toLocaleString() }}/ครั้ง</span>
                <span class="text-[10px] font-black text-emerald-500 flex items-center gap-0.5">
                    <UIcon name="i-lucide-trending-up" class="w-2.5 h-2.5" />+{{ profile.spendingGrowth }}%
                </span>
            </div>
        </div>

        <!-- Primary doctor -->
        <div class="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm col-span-1">
            <div class="flex items-center gap-2 mb-2">
                <div class="w-7 h-7 bg-blue-50 rounded-xl flex items-center justify-center">
                    <UIcon name="i-lucide-user-check" class="w-3.5 h-3.5 text-blue-500" />
                </div>
                <span class="text-[10px] font-black text-slate-400 uppercase tracking-wider">แพทย์หลัก</span>
            </div>
            <div class="text-sm font-black text-slate-800">{{ profile.primaryDoctor.name }}</div>
            <div class="text-[10px] font-semibold text-slate-400 mt-1">
                {{ profile.primaryDoctor.sessions }} ครั้ง · {{ profile.primaryDoctor.specialty }}
            </div>
        </div>

        <!-- Overall outcome -->
        <div class="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm col-span-1">
            <div class="flex items-center gap-2 mb-2">
                <div class="w-7 h-7 bg-emerald-50 rounded-xl flex items-center justify-center">
                    <UIcon name="i-lucide-chart-bar" class="w-3.5 h-3.5 text-emerald-500" />
                </div>
                <span class="text-[10px] font-black text-slate-400 uppercase tracking-wider">ผลลัพธ์รวม</span>
            </div>
            <div class="text-sm font-black text-emerald-600">{{ profile.overallOutcome.label }}</div>
            <div class="text-[10px] font-semibold text-slate-400 mt-1">
                {{ profile.overallOutcome.goodCount }}/{{ profile.overallOutcome.totalCount }} ครั้ง ประเมินดี
            </div>
        </div>

        <!-- Next appointment -->
        <div class="bg-white rounded-2xl p-4 border border-indigo-100 shadow-sm col-span-2 lg:col-span-1" v-if="profile.upcomingSession">
            <div class="flex items-center gap-2 mb-2">
                <div class="w-7 h-7 bg-indigo-50 rounded-xl flex items-center justify-center">
                    <UIcon name="i-lucide-calendar-clock" class="w-3.5 h-3.5 text-indigo-500" />
                </div>
                <span class="text-[10px] font-black text-slate-400 uppercase tracking-wider">นัดหมายถัดไป</span>
            </div>
            <div class="text-sm font-black text-slate-800">
                {{ profile.upcomingSession.date.split(' ').slice(0, 2).join(' ') }} · {{ profile.upcomingSession.time }}
            </div>
            <div class="text-[10px] font-semibold text-slate-400 mt-1 truncate">
                {{ profile.upcomingSession.treatmentName }} · อีก {{ profile.upcomingSession.daysUntil }} วัน
            </div>
        </div>
    </div>
</template>
