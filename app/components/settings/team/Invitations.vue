<script setup lang="ts">
    import type { PendingInvitation, TeamRole } from '~/client/settings'

    defineProps<{
        invitations: PendingInvitation[]
    }>()

    const toast = useAppToast()

    const roleBadgeColor: Record<TeamRole, string> = {
        'หมอ': 'bg-blue-50 text-blue-700 border border-blue-100',
        'พนักงาน': 'bg-emerald-50 text-emerald-700 border border-emerald-100',
        'Super Admin': 'bg-amber-50 text-amber-700 border border-amber-100'
    }

    const resend = (inv: PendingInvitation) => {
        toast.success('ส่งคำเชิญซ้ำ', `ส่งลิงก์ใหม่ไปยัง ${inv.email} เรียบร้อยแล้ว`, { icon: 'i-lucide-send' })
    }

    const cancel = (inv: PendingInvitation) => {
        toast.info('ยกเลิกคำเชิญ', `ยกเลิกคำเชิญของ ${inv.email} แล้ว`, { icon: 'i-lucide-x-circle' })
    }
</script>

<template>
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-50">
            <div class="flex items-center gap-3">
                <span class="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-black">05</span>
                <div>
                    <h2 class="font-black text-gray-900 text-base">คำเชิญที่รอตอบรับ</h2>
                    <p class="text-[11px] text-gray-400 font-medium mt-0.5">3 คำเชิญรอตอบรับ · ลิงก์หมดอายุภายใน 7 วันนับจากวันส่ง</p>
                </div>
            </div>
            <div class="flex items-center gap-2">
                <span class="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-100">รอ {{ invitations.filter(i => !i.expired).length }}</span>
                <span class="text-xs font-bold text-gray-500 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100">หมดอายุ {{ invitations.filter(i => i.expired).length }}</span>
            </div>
        </div>

        <div class="divide-y divide-gray-50/80 px-6">
            <div
                v-for="inv in invitations"
                :key="inv.id"
                class="py-4 flex items-center justify-between gap-4"
            >
                <div class="flex items-center gap-3 min-w-0">
                    <!-- Avatar -->
                    <div
                        class="w-9 h-9 rounded-full flex items-center justify-center font-black text-xs shrink-0"
                        :class="inv.expired ? 'bg-gray-100 text-gray-400' : 'bg-indigo-100 text-indigo-600'"
                    >
                        {{ inv.email.slice(0, 2).toUpperCase() }}
                    </div>

                    <!-- Info -->
                    <div class="min-w-0">
                        <div class="flex items-center gap-2 flex-wrap">
                            <span class="text-sm font-bold text-gray-800 truncate">{{ inv.email }}</span>
                            <span
                                class="text-[10px] font-bold px-2 py-0.5 rounded-md"
                                :class="roleBadgeColor[inv.role]"
                            >
                                {{ inv.role }}
                            </span>
                        </div>
                        <div class="text-[11px] text-gray-400 font-medium mt-0.5">
                            สาขา: {{ inv.branches.join(', ') }} · ส่งโดย {{ inv.sentBy }} · {{ inv.sentAt }}
                        </div>
                    </div>
                </div>

                <div class="flex items-center gap-2 shrink-0">
                    <!-- Expiry badge -->
                    <span
                        class="text-[10px] font-bold px-2.5 py-1 rounded-lg border"
                        :class="inv.expired
                            ? 'text-gray-400 bg-gray-50 border-gray-100'
                            : 'text-amber-600 bg-amber-50 border-amber-100'"
                    >
                        {{ inv.expiresIn }}
                    </span>

                    <!-- Actions -->
                    <template v-if="!inv.expired">
                        <button
                            class="text-xs font-bold px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 transition-colors cursor-pointer"
                            @click="resend(inv)"
                        >
                            ส่งซ้ำ
                        </button>
                        <button
                            class="text-xs font-bold px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-gray-600 transition-colors cursor-pointer"
                            @click="cancel(inv)"
                        >
                            ยกเลิก
                        </button>
                    </template>
                    <template v-else>
                        <button
                            class="text-xs font-bold px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors cursor-pointer shadow-sm"
                            @click="resend(inv)"
                        >
                            ส่งใหม่
                        </button>
                        <button
                            class="text-xs font-bold px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-gray-600 transition-colors cursor-pointer"
                            @click="cancel(inv)"
                        >
                            ลบ
                        </button>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
