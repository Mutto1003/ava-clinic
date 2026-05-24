<script setup lang="ts">
    import { ref, computed } from 'vue'
    import type { Appointment } from '~/client/dashboard/appointments'
    import { useAuthStore } from '~/stores/auth'

    const authStore = useAuthStore()
    const activeFilter = ref('ทั้งหมด')
    const filters = ['ทั้งหมด', 'รอดำเนินการ', 'เสร็จแล้ว']

    const dateLabel = computed(() => {
        const days = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์']
        const months = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.']
        const d = new Date()
        return `วันนี้ · ${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear() + 543}`
    })

    const badgeClass: Record<string, string> = {
        สำเร็จ: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
        กำลังรอ: 'bg-amber-50 text-amber-700 ring-amber-200',
        Consult: 'bg-blue-50 text-blue-700 ring-blue-200',
        นัดหมาย: 'bg-slate-50 text-slate-600 ring-slate-200',
        ยกเลิก: 'bg-red-50 text-red-600 ring-red-200'
    }

    const { data: raw, status } = await useFetch<{ data: Appointment[] }>('/api/dashboard/appointments', {
        headers: { Authorization: `Bearer ${authStore.token}` },
        default: () => ({ data: [] as Appointment[] })
    })

    const appointments = computed(() => raw.value?.data ?? [])

    const filtered = computed(() => {
        if (!appointments.value.length) return []
        if (activeFilter.value === 'รอดำเนินการ')
            return appointments.value.filter(a => ['กำลังรอ', 'นัดหมาย', 'Consult'].includes(a.status))
        if (activeFilter.value === 'เสร็จแล้ว')
            return appointments.value.filter(a => a.status === 'สำเร็จ')
        return appointments.value
    })
</script>

<template>
    <div class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden" data-testid="appointment-table">
        <!-- Card Header -->
        <div class="flex items-center justify-between px-5 pt-5 pb-3">
            <div class="flex items-center gap-2.5">
                <div class="w-1 h-5 rounded-full" style="background: linear-gradient(180deg, #4f46e5, #7c3aed)" />
                <h3 class="text-sm font-black text-slate-800">ตารางนัดหมายวันนี้</h3>
                <span class="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full ring-1 ring-indigo-100">
                    {{ appointments?.length ?? 0 }} รายการ
                </span>
            </div>
            <button class="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors" type="button">
                ดูทั้งหมด
                <UIcon name="i-lucide-arrow-right" class="w-3.5 h-3.5" />
            </button>
        </div>

        <!-- Date navigation -->
        <div class="flex items-center justify-between px-5 pb-3">
            <button
                class="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:border-indigo-300 hover:text-indigo-600 transition-all"
                type="button"
            >
                <UIcon name="i-lucide-chevron-left" class="w-4 h-4" />
            </button>
            <span class="text-xs font-bold text-slate-600">{{ dateLabel }}</span>
            <button
                class="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:border-indigo-300 hover:text-indigo-600 transition-all"
                type="button"
            >
                <UIcon name="i-lucide-chevron-right" class="w-4 h-4" />
            </button>
        </div>

        <!-- Filter tabs -->
        <div class="flex gap-1 px-5 pb-3">
            <button
                v-for="f in filters"
                :key="f"
                class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                :class="activeFilter === f
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-500 hover:bg-slate-100'"
                type="button"
                @click="activeFilter = f"
            >
                {{ f }}
            </button>
        </div>

        <!-- Loading -->
        <div v-if="status === 'pending'" class="flex justify-center py-10">
            <div class="loading-spin" />
        </div>

        <!-- Table -->
        <div v-else class="overflow-x-auto">
            <table class="w-full" style="border-collapse: collapse">
                <thead>
                    <tr style="background: #f8fafc; border-top: 1px solid #f1f5f9; border-bottom: 1px solid #f1f5f9">
                        <th class="th">เวลา</th>
                        <th class="th">ลูกค้า</th>
                        <th class="th">บริการ</th>
                        <th class="th">แพทย์</th>
                        <th class="th">สถานะ</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="row in filtered"
                        :key="row.id"
                        class="hover:bg-indigo-50/30 transition-colors"
                        style="border-bottom: 1px solid #f8fafc"
                        :style="row.isUpcoming ? { boxShadow: 'inset 3px 0 0 #4f46e5' } : {}"
                    >
                        <!-- เวลา -->
                        <td class="px-5 py-3 whitespace-nowrap">
                            <div class="flex flex-col">
                                <span
                                    class="text-sm font-black"
                                    :class="row.isUpcoming ? 'text-indigo-600' : 'text-slate-800'"
                                >{{ row.time }}</span>
                                <span class="text-[10px] font-medium text-slate-400 mt-0.5">{{ row.timeNote }}</span>
                            </div>
                        </td>
                        <!-- ลูกค้า -->
                        <td class="px-5 py-3">
                            <div class="flex items-center gap-2.5">
                                <div
                                    class="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-black shrink-0"
                                    :class="row.avatarColor"
                                >{{ row.initials }}</div>
                                <div class="min-w-0">
                                    <div class="flex items-center gap-1.5 flex-wrap mb-0.5">
                                        <span class="text-xs font-bold text-slate-800">{{ row.customer }}</span>
                                        <span
                                            v-if="row.isVip"
                                            class="text-[9px] font-black bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full ring-1 ring-amber-200"
                                        >VIP</span>
                                        <span
                                            v-if="row.isNew"
                                            class="text-[9px] font-black bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full ring-1 ring-emerald-200"
                                        >ใหม่</span>
                                    </div>
                                    <span class="text-[10px] text-slate-400 font-medium">{{ row.hn }}</span>
                                </div>
                            </div>
                        </td>
                        <!-- บริการ -->
                        <td class="px-5 py-3">
                            <div class="flex flex-col">
                                <span class="text-xs font-bold text-slate-700">{{ row.service }}</span>
                                <span class="text-[10px] text-slate-400 font-medium mt-0.5">{{ row.serviceDetail }}</span>
                            </div>
                        </td>
                        <!-- แพทย์ -->
                        <td class="px-5 py-3 whitespace-nowrap">
                            <span class="text-xs text-slate-600 font-medium">{{ row.doctor }}</span>
                        </td>
                        <!-- สถานะ + actions -->
                        <td class="px-5 py-3">
                            <div class="flex items-center gap-1.5">
                                <span
                                    class="text-[10px] font-bold px-2 py-0.5 rounded-full ring-1"
                                    :class="badgeClass[row.status] ?? 'bg-slate-50 text-slate-500 ring-slate-200'"
                                >{{ row.status }}</span>
                                <button
                                    v-if="row.status === 'Consult'"
                                    class="w-6 h-6 flex items-center justify-center rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                                    type="button"
                                    title="Consult"
                                >
                                    <UIcon name="i-lucide-check" class="w-3.5 h-3.5" />
                                </button>
                                <template v-else-if="row.isUpcoming">
                                    <button
                                        class="w-6 h-6 flex items-center justify-center rounded-md bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors"
                                        type="button"
                                        title="โทร"
                                    >
                                        <UIcon name="i-lucide-phone" class="w-3 h-3" />
                                    </button>
                                    <button
                                        class="w-6 h-6 flex items-center justify-center rounded-md bg-slate-50 text-slate-500 hover:bg-slate-100 transition-colors"
                                        type="button"
                                        title="เพิ่มเติม"
                                    >
                                        <UIcon name="i-lucide-more-horizontal" class="w-3.5 h-3.5" />
                                    </button>
                                </template>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="!filtered.length">
                        <td colspan="5" class="text-center text-slate-400 text-sm py-10">
                            ไม่มีข้อมูลนัดหมาย
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
    .th {
        padding: 10px 20px;
        text-align: left;
        font-size: 10px;
        font-weight: 700;
        color: #94a3b8;
        letter-spacing: 0.5px;
        text-transform: uppercase;
    }
    .loading-spin {
        width: 28px;
        height: 28px;
        border: 3px solid #e2e8f0;
        border-top-color: #4f46e5;
        border-radius: 50%;
        animation: spin 0.7s linear infinite;
    }
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
</style>
