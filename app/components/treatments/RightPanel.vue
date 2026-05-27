<script setup lang="ts">
import type { PatientTreatmentProfile } from '~/client/treatments'

defineProps<{
    profile: PatientTreatmentProfile
}>()

const emit = defineEmits<{
    confirmSession: []
    reschedule: []
}>()

const toast = useAppToast()
</script>

<template>
    <div class="space-y-4">
        <!-- Upcoming session -->
        <div v-if="profile.upcomingSession" class="bg-white rounded-2xl border border-indigo-100 shadow-sm overflow-hidden">
            <div class="bg-indigo-50 px-4 py-3 border-b border-indigo-100 flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                <span class="text-xs font-black text-indigo-700">เซสชันถัดไป</span>
            </div>
            <div class="p-4 space-y-2.5">
                <div class="text-sm font-black text-slate-800">{{ profile.upcomingSession.treatmentName }}</div>
                <div class="space-y-1.5 text-xs font-semibold text-slate-500">
                    <div class="flex items-center gap-2">
                        <UIcon name="i-lucide-calendar" class="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{{ profile.upcomingSession.date }} · {{ profile.upcomingSession.time }}</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <UIcon name="i-lucide-user" class="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{{ profile.upcomingSession.doctorName }}</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <UIcon name="i-lucide-door-open" class="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{{ profile.upcomingSession.room }}</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <UIcon name="i-lucide-clock" class="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>~{{ profile.upcomingSession.duration }} นาที</span>
                    </div>
                </div>
                <div class="flex gap-2 pt-1">
                    <button
                        type="button"
                        class="flex-1 text-xs font-bold text-slate-600 border border-gray-200 bg-white hover:bg-slate-50 py-2 rounded-xl transition-all cursor-pointer"
                        @click="emit('reschedule')"
                    >เลื่อนนัด</button>
                    <button
                        type="button"
                        class="flex-1 text-xs font-black text-white bg-indigo-600 hover:bg-indigo-700 py-2 rounded-xl transition-all shadow-sm cursor-pointer"
                        @click="emit('confirmSession')"
                    >ยืนยัน</button>
                </div>
            </div>
        </div>

        <!-- Warnings -->
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <h4 class="text-xs font-black text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <UIcon name="i-lucide-triangle-alert" class="w-3.5 h-3.5 text-amber-500" />
                ข้อควรระวังการรักษา
            </h4>
            <div class="flex flex-wrap gap-1.5">
                <span
                    v-for="warning in profile.warnings"
                    :key="warning.label"
                    class="text-[11px] font-bold px-2.5 py-1 rounded-full"
                    :class="warning.colorClass"
                >{{ warning.label }}</span>
            </div>
        </div>

        <!-- Category breakdown -->
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <h4 class="text-xs font-black text-slate-500 uppercase tracking-wider mb-3">สัดส่วนตามประเภท</h4>
            <div class="space-y-3">
                <div v-for="cat in profile.categorySummary" :key="cat.name">
                    <div class="flex items-center justify-between mb-1">
                        <span class="text-xs font-bold text-slate-600">{{ cat.name }}</span>
                        <span class="text-xs font-black text-slate-700">
                            {{ cat.amount >= 1000 ? `฿${Math.round(cat.amount / 1000)}K` : `฿${cat.amount}` }}
                        </span>
                    </div>
                    <div class="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                            class="h-full rounded-full transition-all"
                            :class="cat.color"
                            :style="{
                                width: profile.categorySummary[0]?.amount
                                    ? `${(cat.amount / profile.categorySummary[0].amount) * 100}%`
                                    : '0%'
                            }"
                        ></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Treating doctors -->
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <h4 class="text-xs font-black text-slate-500 uppercase tracking-wider mb-3">แพทย์ที่ดูแล</h4>
            <div class="space-y-3">
                <div v-for="doctor in profile.doctorsSummary" :key="doctor.id" class="flex items-center gap-3">
                    <div
                        class="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-xs shrink-0 shadow-sm"
                        :class="doctor.color"
                    >{{ doctor.initials }}</div>
                    <div class="flex-1 min-w-0">
                        <div class="text-xs font-black text-slate-700 truncate">{{ doctor.name }}</div>
                        <div class="text-[10px] font-semibold text-slate-400">{{ doctor.specialty }}</div>
                    </div>
                    <div class="text-right shrink-0">
                        <div class="text-sm font-black text-slate-700">{{ doctor.sessionCount }}</div>
                        <div class="text-[10px] font-semibold text-slate-400">ครั้ง</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
