<script setup lang="ts">
    import type { PermissionEntry, TeamRole } from '~/client/settings'

    defineProps<{
        permissions: PermissionEntry[]
        role: TeamRole
    }>()

    const colorMap: Record<string, string> = {
        green: 'text-emerald-600',
        orange: 'text-amber-600',
        blue: 'text-blue-600',
        gray: 'text-gray-400'
    }

    const dotMap: Record<string, string> = {
        green: 'bg-emerald-500',
        orange: 'bg-amber-500',
        blue: 'bg-blue-500',
        gray: 'bg-gray-300'
    }
</script>

<template>
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-50">
            <div class="flex items-center gap-3">
                <span class="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-black">03</span>
                <div>
                    <h2 class="font-black text-gray-900 text-base">สิทธิ์ที่จะมอบให้สมาชิกคนนี้</h2>
                    <p class="text-[11px] text-gray-400 font-medium mt-0.5">การเปลี่ยน permission ของบุคคลใดบุคคลหนึ่งจะไม่กระทบ template ของ role</p>
                </div>
            </div>
            <span class="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100">
                ใช้ template {{ role }} · default
            </span>
        </div>

        <div class="overflow-x-auto">
            <table class="w-full text-sm">
                <thead>
                    <tr class="bg-slate-50/80 text-left">
                        <th class="px-6 py-3 text-xs font-black text-gray-500 uppercase tracking-wider w-1/3">โมดูล</th>
                        <th class="px-4 py-3 text-xs font-black text-gray-500 uppercase tracking-wider">ดู</th>
                        <th class="px-4 py-3 text-xs font-black text-gray-500 uppercase tracking-wider">แก้ไข / เพิ่ม</th>
                        <th class="px-4 py-3 text-xs font-black text-gray-500 uppercase tracking-wider">ลบ / ส่งออก</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-50">
                    <tr
                        v-for="row in permissions"
                        :key="row.module"
                        class="hover:bg-slate-50/40 transition-colors"
                    >
                        <td class="px-6 py-3.5">
                            <div class="flex items-center gap-2">
                                <UIcon :name="row.icon" class="w-3.5 h-3.5 text-gray-400 shrink-0" />
                                <span class="font-bold text-gray-700 text-xs">{{ row.module }}</span>
                            </div>
                        </td>
                        <td class="px-4 py-3.5">
                            <span class="flex items-center gap-1.5 text-xs font-bold" :class="colorMap[row.viewColor]">
                                <span class="w-1.5 h-1.5 rounded-full shrink-0" :class="dotMap[row.viewColor]"></span>
                                {{ row.view }}
                            </span>
                        </td>
                        <td class="px-4 py-3.5">
                            <span class="flex items-center gap-1.5 text-xs font-bold" :class="colorMap[row.editColor]">
                                <span class="w-1.5 h-1.5 rounded-full shrink-0" :class="dotMap[row.editColor]"></span>
                                {{ row.edit }}
                            </span>
                        </td>
                        <td class="px-4 py-3.5">
                            <span class="flex items-center gap-1.5 text-xs font-bold" :class="colorMap[row.deleteColor]">
                                <span class="w-1.5 h-1.5 rounded-full shrink-0" :class="dotMap[row.deleteColor]"></span>
                                {{ row.delete }}
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
