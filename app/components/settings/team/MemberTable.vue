<script setup lang="ts">
    import type { TeamMember, TeamRole } from '~/client/settings'

    const props = defineProps<{
        members: TeamMember[]
        totalCount: number
    }>()

    const toast = useAppToast()
    const searchQuery = ref('')
    const roleFilter = ref<'ทุก role' | TeamRole>('ทุก role')
    const branchFilter = ref('ทั้งหมด')

    const roleFilters: Array<'ทุก role' | TeamRole> = ['ทุก role', 'หมอ', 'พนักงาน', 'Super Admin']

    const roleBadgeStyle: Record<TeamRole, string> = {
        'หมอ': 'bg-blue-50 text-blue-700 border border-blue-100',
        'พนักงาน': 'bg-emerald-50 text-emerald-700 border border-emerald-100',
        'Super Admin': 'bg-amber-50 text-amber-700 border border-amber-100'
    }

    const statusDot: Record<string, string> = {
        online: 'bg-emerald-400',
        away: 'bg-amber-400',
        offline: 'bg-gray-300'
    }

    const statusLabel: Record<string, string> = {
        online: 'กำลังใช้งาน',
        away: 'พักเที่ยง',
        offline: 'ออฟไลน์'
    }

    const filteredMembers = computed(() => {
        return props.members.filter((m) => {
            const matchRole = roleFilter.value === 'ทุก role' || m.role === roleFilter.value
            const q = searchQuery.value.toLowerCase()
            const matchSearch = !q || m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q)
            return matchRole && matchSearch
        })
    })
</script>

<template>
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <!-- Header -->
        <div class="flex items-start justify-between px-6 py-4 border-b border-gray-50">
            <div class="flex items-center gap-3">
                <span class="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-black">04</span>
                <div>
                    <h2 class="font-black text-gray-900 text-base">สมาชิกทีม</h2>
                    <p class="text-[11px] text-gray-400 font-medium mt-0.5">
                        {{ totalCount }} คน · เรียงตามเวลาเข้าใช้งานล่าสุด · คลิกชื่อเพื่อจัดการสิทธิ์รายคน
                    </p>
                </div>
            </div>
            <span class="text-[11px] text-gray-400 font-bold">แสดง 1–{{ filteredMembers.length }} จาก {{ totalCount }}</span>
        </div>

        <!-- Filter bar -->
        <div class="flex items-center gap-3 px-6 py-3.5 border-b border-gray-50 flex-wrap">
            <!-- Search -->
            <div class="relative flex-1 min-w-48">
                <UIcon
                    name="i-lucide-search"
                    class="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400"
                />
                <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="ค้นหาสมาชิก, อีเมล, เลขใบประกอบฯ..."
                    class="w-full pl-8 pr-4 py-2 text-xs border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all font-medium"
                >
            </div>

            <!-- Role filter pills -->
            <div class="flex items-center gap-1">
                <button
                    v-for="f in roleFilters"
                    :key="f"
                    class="px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer"
                    :class="roleFilter === f
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-gray-50 text-gray-500 hover:bg-gray-100 border border-gray-200'"
                    @click="roleFilter = f"
                >
                    {{ f }}
                </button>
            </div>

            <!-- Branch dropdown -->
            <select
                v-model="branchFilter"
                class="text-xs font-bold border border-gray-200 rounded-lg px-3 py-1.5 bg-gray-50 text-gray-600 focus:outline-none focus:border-indigo-300 cursor-pointer"
            >
                <option>ทั้งหมด</option>
                <option>มวกเหล็ก</option>
                <option>โคราช ซิตี้พลาซ่า</option>
                <option>สระบุรี โรบินสัน</option>
                <option>ปากช่อง</option>
            </select>

            <button class="text-xs font-bold text-gray-500 border border-gray-200 rounded-lg px-3 py-1.5 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center gap-1.5 cursor-pointer">
                <UIcon
                    name="i-lucide-columns-3"
                    class="w-3.5 h-3.5"
                />
                คอลัมน์
            </button>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto">
            <table class="w-full">
                <thead>
                    <tr class="text-left bg-slate-50/60 border-b border-gray-50">
                        <th class="px-6 py-3 text-xs font-black text-gray-500 uppercase tracking-wider">สมาชิก</th>
                        <th class="px-4 py-3 text-xs font-black text-gray-500 uppercase tracking-wider">ROLE</th>
                        <th class="px-4 py-3 text-xs font-black text-gray-500 uppercase tracking-wider">สาขา</th>
                        <th class="px-4 py-3 text-xs font-black text-gray-500 uppercase tracking-wider">เข้าใช้งานล่าสุด</th>
                        <th class="px-4 py-3 text-xs font-black text-gray-500 uppercase tracking-wider">สถานะ</th>
                        <th class="px-4 py-3 text-xs font-black text-gray-500 uppercase tracking-wider">การจัดการ</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-50/80">
                    <tr
                        v-for="member in filteredMembers"
                        :key="member.id"
                        class="hover:bg-slate-50/40 transition-colors group"
                    >
                        <!-- Member info -->
                        <td class="px-6 py-4">
                            <div class="flex items-center gap-3">
                                <div
                                    class="w-9 h-9 rounded-full flex items-center justify-center font-black text-xs shrink-0"
                                    :class="member.avatarColor"
                                >
                                    {{ member.initial }}
                                </div>
                                <div>
                                    <div class="font-bold text-gray-900 text-sm">
                                        {{ member.title }} {{ member.name }}
                                    </div>
                                    <div class="text-[11px] text-gray-400 font-medium">
                                        {{ member.email }}<span v-if="member.licenseNumber"> · {{ member.licenseNumber }}</span>
                                    </div>
                                </div>
                            </div>
                        </td>

                        <!-- Role badge -->
                        <td class="px-4 py-4">
                            <span
                                class="text-[10px] font-bold px-2.5 py-1 rounded-md"
                                :class="roleBadgeStyle[member.role]"
                            >
                                {{ member.role }}
                            </span>
                        </td>

                        <!-- Branches -->
                        <td class="px-4 py-4">
                            <div class="flex flex-wrap gap-1">
                                <span
                                    v-for="branch in member.branches"
                                    :key="branch"
                                    class="text-[10px] font-bold text-gray-600 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-md"
                                >
                                    {{ branch }}
                                </span>
                            </div>
                        </td>

                        <!-- Last active -->
                        <td class="px-4 py-4">
                            <span class="text-xs text-gray-500 font-medium">{{ member.lastActive }}</span>
                        </td>

                        <!-- Status -->
                        <td class="px-4 py-4">
                            <div class="flex items-center gap-1.5">
                                <span
                                    class="w-2 h-2 rounded-full"
                                    :class="statusDot[member.status]"
                                />
                                <span class="text-xs font-bold text-gray-600">{{ statusLabel[member.status] }}</span>
                            </div>
                        </td>

                        <!-- Actions -->
                        <td class="px-4 py-4">
                            <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    class="w-7 h-7 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center cursor-pointer transition-colors"
                                    @click="toast.info('แก้ไขสมาชิก', `กำลังเปิดการแก้ไขข้อมูล ${member.name}`)"
                                >
                                    <UIcon
                                        name="i-lucide-pencil"
                                        class="w-3.5 h-3.5 text-gray-500"
                                    />
                                </button>
                                <button
                                    class="w-7 h-7 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center cursor-pointer transition-colors"
                                    @click="toast.info('รีเซ็ตรหัสผ่าน', `ส่งลิงก์รีเซ็ตไปยัง ${member.email}`)"
                                >
                                    <UIcon
                                        name="i-lucide-lock"
                                        class="w-3.5 h-3.5 text-gray-500"
                                    />
                                </button>
                                <button class="w-7 h-7 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center cursor-pointer transition-colors">
                                    <UIcon
                                        name="i-lucide-more-horizontal"
                                        class="w-3.5 h-3.5 text-gray-500"
                                    />
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Footer pagination hint -->
        <div class="px-6 py-3 border-t border-gray-50 text-center">
            <button
                class="text-xs font-bold text-indigo-600 hover:underline cursor-pointer"
                @click="toast.info('โหลดสมาชิกเพิ่มเติม', 'กำลังโหลดรายชื่อสมาชิกเพิ่มเติม...')"
            >
                ดูสมาชิกที่เหลืออีก {{ totalCount - filteredMembers.length }} คน →
            </button>
        </div>
    </div>
</template>
