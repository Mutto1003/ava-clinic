<script setup lang="ts">
    import type { TeamOverview } from '~/client/settings'

    defineProps<{
        overview: TeamOverview
    }>()

    const statCards = (overview: TeamOverview) => [
        {
            label: 'หมอ (Doctor)',
            dot: 'bg-blue-500',
            value: `${overview.doctors.used}`,
            total: overview.doctors.total,
            sub: `+${overview.doctors.addedThisMonth} เดือนนี้`,
            subColor: 'text-blue-500',
            bar: 'bg-blue-500',
            pct: (overview.doctors.used / overview.doctors.total) * 100
        },
        {
            label: 'พนักงาน (Staff)',
            dot: 'bg-emerald-500',
            value: `${overview.staff.used}`,
            total: overview.staff.total,
            sub: `+${overview.staff.addedThisMonth} เดือนนี้`,
            subColor: 'text-emerald-500',
            bar: 'bg-emerald-500',
            pct: (overview.staff.used / overview.staff.total) * 100
        },
        {
            label: 'Super Admin',
            dot: 'bg-amber-500',
            value: `${overview.superAdmins.used}`,
            total: overview.superAdmins.total,
            sub: `เหลือสิทธิ์ ${overview.superAdmins.remaining} ที่นั่ง`,
            subColor: 'text-amber-600',
            bar: 'bg-amber-500',
            pct: (overview.superAdmins.used / overview.superAdmins.total) * 100
        },
        {
            label: 'กำลังใช้งานตอนนี้',
            dot: 'bg-violet-500',
            value: `${overview.activeNow}`,
            total: null,
            sub: 'ออนไลน์ใน 5 นาทีล่าสุด',
            subColor: 'text-violet-500',
            bar: 'bg-violet-500',
            pct: 100
        }
    ]
</script>

<template>
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div class="flex items-start justify-between px-6 pt-5 pb-4 border-b border-gray-50">
            <div class="flex items-center gap-3">
                <span class="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-black">01</span>
                <div>
                    <h2 class="font-black text-gray-900 text-base">ภาพรวมทีม</h2>
                    <p class="text-[11px] text-gray-400 font-medium mt-0.5">สรุปจำนวนสมาชิกแต่ละ role · สถานะการใช้งานล่าสุด · ที่นั่ง license ที่เหลือ</p>
                </div>
            </div>
            <span class="text-xs text-gray-400 font-bold shrink-0">ที่นั่งทั้งหมด {{ overview.totalSeats }} · ใช้ไป {{ overview.usedSeats }}</span>
        </div>

        <div class="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-gray-50/80 px-0">
            <div
                v-for="card in statCards(overview)"
                :key="card.label"
                class="px-6 py-5"
            >
                <div class="flex items-center gap-2 mb-3">
                    <span class="w-2 h-2 rounded-full shrink-0" :class="card.dot"></span>
                    <span class="text-[11px] font-bold text-gray-500">{{ card.label }}</span>
                </div>
                <div class="flex items-baseline gap-1.5 mb-2">
                    <span class="text-3xl font-black text-gray-900">{{ card.value }}</span>
                    <span v-if="card.total" class="text-sm text-gray-400 font-medium">/ {{ card.total }}</span>
                </div>
                <div class="w-full bg-gray-100 rounded-full h-1.5 mb-2">
                    <div
                        class="h-1.5 rounded-full transition-all"
                        :class="card.bar"
                        :style="{ width: `${Math.min(card.pct, 100)}%` }"
                    ></div>
                </div>
                <p class="text-[11px] font-bold" :class="card.subColor">{{ card.sub }}</p>
            </div>
        </div>
    </div>
</template>
