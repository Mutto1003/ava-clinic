<script setup lang="ts">
import type { PatientTreatmentProfile } from '~/client/treatments'

defineProps<{
    profile: PatientTreatmentProfile
}>()

const emit = defineEmits<{
    back: []
    newSession: []
    print: []
    exportPdf: []
}>()
</script>

<template>
    <div class="bg-white rounded-3xl border border-gray-100 shadow-sm px-6 py-4 mb-4">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <!-- Left: back + patient info -->
            <div class="flex items-center gap-4">
                <button
                    type="button"
                    class="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors cursor-pointer shrink-0"
                    @click="emit('back')"
                >
                    <UIcon name="i-lucide-chevron-left" class="w-4 h-4" />
                    <span>กลับ</span>
                </button>

                <div class="flex items-center gap-3">
                    <!-- Avatar -->
                    <div class="relative shrink-0">
                        <div
                            class="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-white text-base shadow-lg"
                            :class="profile.avatarColorClass"
                        >
                            {{ profile.avatarInitials }}
                        </div>
                        <span class="absolute -top-1 -right-1 w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center shadow">
                            <UIcon name="i-lucide-star" class="w-2.5 h-2.5 text-white" />
                        </span>
                    </div>

                    <!-- Name + badges + meta -->
                    <div>
                        <div class="flex items-center gap-2 flex-wrap">
                            <h1 class="text-base font-black text-slate-800">
                                {{ profile.firstName }} {{ profile.lastName }}
                                <span class="font-medium text-slate-400 text-sm">({{ profile.nickname }})</span>
                            </h1>
                            <span v-if="profile.isVip" class="inline-flex items-center gap-1 bg-amber-50 text-amber-600 border border-amber-200 text-[10px] font-black px-2 py-0.5 rounded-full">
                                <UIcon name="i-lucide-star" class="w-2.5 h-2.5" />VIP
                            </span>
                            <span
                                class="text-[10px] font-black px-2.5 py-0.5 rounded-full"
                                :class="{
                                    'bg-slate-800 text-white': profile.tier === 'PLATINUM',
                                    'bg-amber-100 text-amber-700': profile.tier === 'GOLD',
                                    'bg-slate-200 text-slate-600': profile.tier === 'SILVER',
                                }"
                            >{{ profile.tier }}</span>
                        </div>
                        <div class="flex items-center gap-2 mt-0.5 flex-wrap">
                            <span class="text-xs font-semibold text-slate-400">HN {{ profile.hn }}</span>
                            <span class="text-slate-200">·</span>
                            <span class="text-xs font-semibold text-slate-400">{{ profile.age }} ปี · {{ profile.gender }}</span>
                            <span class="text-slate-200">·</span>
                            <span class="text-xs font-semibold text-slate-400">เป็นสมาชิกตั้งแต่ {{ profile.memberSince }}</span>
                            <span v-if="profile.allergies.length" class="text-slate-200">·</span>
                            <span v-if="profile.allergies.length" class="inline-flex items-center gap-1 text-xs font-bold text-amber-600">
                                <UIcon name="i-lucide-triangle-alert" class="w-3 h-3" />
                                แพ้ {{ profile.allergies.join(', ') }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right: action buttons -->
            <div class="flex items-center gap-2 shrink-0">
                <button
                    type="button"
                    class="flex items-center gap-1.5 text-xs font-bold text-slate-600 border border-gray-200 bg-white hover:bg-slate-50 px-3.5 py-2 rounded-xl transition-all cursor-pointer"
                    @click="emit('print')"
                >
                    <UIcon name="i-lucide-printer" class="w-3.5 h-3.5" />
                    <span class="hidden sm:inline">พิมพ์ประวัติ</span>
                </button>
                <button
                    type="button"
                    class="flex items-center gap-1.5 text-xs font-bold text-slate-600 border border-gray-200 bg-white hover:bg-slate-50 px-3.5 py-2 rounded-xl transition-all cursor-pointer"
                    @click="emit('exportPdf')"
                >
                    <UIcon name="i-lucide-download" class="w-3.5 h-3.5" />
                    <span class="hidden sm:inline">Export PDF</span>
                </button>
                <button
                    type="button"
                    class="flex items-center gap-1.5 text-xs font-black text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-xl transition-all shadow-md shadow-indigo-200 cursor-pointer"
                    @click="emit('newSession')"
                >
                    <UIcon name="i-lucide-plus" class="w-3.5 h-3.5" />
                    บันทึกเซสชันใหม่
                </button>
            </div>
        </div>
    </div>
</template>
