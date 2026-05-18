<script setup lang="ts">
    const props = defineProps<{
        selectedBranch: string
        searchQuery: string
        totalAppointments: number
    }>()

    const emit = defineEmits<{
        (e: 'update:selectedBranch', value: string): void
        (e: 'update:searchQuery', value: string): void
        (e: 'add-appointment'): void
        (e: 'sync-google'): void
    }>()

    const activeView = ref('เดือน') // วัน, สัปดาห์, เดือน, ปี

    // Count badges for each branch (mock counts)
    const branchCounts = {
        'ทั้งหมด': 42,
        'เลย': 16,
        'เมืองทองธานี': 19,
        'อมตะชลบุรี': 7
    }

    const branchColors = {
        'ทั้งหมด': 'bg-slate-100 hover:bg-slate-200/80 text-slate-700 border-slate-200 active-ring-slate-500',
        'เลย': 'bg-emerald-50 hover:bg-emerald-100/70 text-emerald-700 border-emerald-200 active-ring-emerald-500',
        'เมืองทองธานี': 'bg-indigo-50 hover:bg-indigo-100/70 text-indigo-700 border-indigo-200 active-ring-indigo-500',
        'อมตะชลบุรี': 'bg-rose-50 hover:bg-rose-100/70 text-rose-700 border-rose-200 active-ring-rose-500'
    }

    const selectBranch = (branch: string) => {
        emit('update:selectedBranch', branch)
    }

    const updateSearch = (event: Event) =>
        emit('update:searchQuery', (event.target as HTMLInputElement).value)
</script>

<template>
    <div class="space-y-6">
        <!-- ── Top Calendar Control Row (Transparent / borderless) ── -->
        <div class="flex flex-col xl:flex-row xl:items-center justify-between gap-6 py-2 px-1">
            <div class="flex items-center gap-4">
                <div class="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 shadow-md shadow-indigo-100">
                    <UIcon name="i-lucide-calendar" class="w-7 h-7" />
                </div>
                <div>
                    <h1 class="text-xl md:text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                        ปฏิทินนัดหมาย
                    </h1>
                    <p class="text-xs md:text-sm text-slate-400 font-semibold mt-1">พฤษภาคม 2569 • {{ totalAppointments }} นัดเดือนนี้ • 3 สาขาบริการ</p>
                </div>
            </div>

            <!-- View Toggles & Month Pickers -->
            <div class="flex flex-wrap items-center gap-3">
                <!-- View tabs: วัน, สัปดาห์, เดือน, ปี -->
                <div class="bg-slate-100/80 p-1 rounded-2xl flex items-center gap-0.5 border border-slate-200/50">
                    <button
                        v-for="view in ['วัน', 'สัปดาห์', 'เดือน', 'ปี']"
                        :key="view"
                        type="button"
                        class="px-4 py-1.5 rounded-xl font-bold text-xs md:text-sm transition-all cursor-pointer"
                        :class="activeView === view ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'"
                        @click="activeView = view"
                    >
                        {{ view }}
                    </button>
                </div>

                <!-- Month navigation -->
                <div class="flex items-center bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                    <button type="button" class="p-2.5 hover:bg-slate-50 text-slate-400 hover:text-slate-600 border-r border-gray-100 cursor-pointer">
                        <UIcon name="i-lucide-chevron-left" class="w-4 h-4" />
                    </button>
                    <span class="px-5 font-black text-xs md:text-sm text-slate-700">พ.ค. 2569</span>
                    <button type="button" class="p-2.5 hover:bg-slate-50 text-slate-400 hover:text-slate-600 border-l border-gray-100 cursor-pointer">
                        <UIcon name="i-lucide-chevron-right" class="w-4 h-4" />
                    </button>
                </div>

                <button type="button" class="bg-white hover:bg-slate-50 border border-gray-200 text-slate-700 font-bold text-xs md:text-sm px-4 py-2.5 rounded-2xl shadow-sm transition-all cursor-pointer">
                    วันนี้
                </button>

                <button
                    type="button"
                    class="bg-white hover:bg-slate-50 border border-gray-200 text-slate-700 font-bold text-xs md:text-sm px-4 py-2.5 rounded-2xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                    @click="emit('sync-google')"
                >
                    <UIcon name="i-lucide-refresh-cw" class="w-3.5 h-3.5 text-slate-400" />
                    <span>ซิงค์ Google</span>
                </button>

                <button
                    type="button"
                    class="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-extrabold text-xs md:text-sm px-5 py-2.5 rounded-2xl shadow-lg shadow-indigo-500/20 flex items-center gap-1.5 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 transition-all"
                    @click="emit('add-appointment')"
                >
                    <UIcon name="i-lucide-plus" class="w-4 h-4" />
                    <span>นัดหมายใหม่</span>
                </button>
            </div>
        </div>

        <!-- ── Filter & Search Row ── -->
        <div class="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <!-- Branch Filter Pills -->
            <div class="flex flex-wrap items-center gap-2.5">
                <span class="text-xs font-black text-slate-400 uppercase tracking-widest mr-1.5">สาขา:</span>
                <button
                    v-for="branch in ['ทั้งหมด', 'เลย', 'เมืองทองธานี', 'อมตะชลบุรี']"
                    :key="branch"
                    type="button"
                    class="px-4 py-2 rounded-2xl border font-bold text-xs md:text-sm transition-all cursor-pointer flex items-center gap-2 shadow-sm"
                    :class="[
                        selectedBranch === branch
                            ? 'ring-2 ring-indigo-500 ring-offset-1 font-black bg-indigo-600 text-white border-transparent'
                            : branchColors[branch as keyof typeof branchColors]
                    ]"
                    @click="selectBranch(branch)"
                >
                    <span
                        v-if="branch !== 'ทั้งหมด'"
                        class="w-2 h-2 rounded-full inline-block"
                        :class="[
                            branch === 'เลย' ? 'bg-emerald-500' :
                            branch === 'เมืองทองธานี' ? 'bg-indigo-500' : 'bg-rose-500'
                        ]"
                    ></span>
                    <span>สาขา{{ branch }}</span>
                    <span
                        class="text-[10px] px-1.5 py-0.5 rounded-full font-black"
                        :class="selectedBranch === branch ? 'bg-white/20 text-white' : 'bg-slate-200/60 text-slate-600'"
                    >
                        {{ branchCounts[branch as keyof typeof branchCounts] }}
                    </span>
                </button>
            </div>

            <!-- Service & Search Inputs -->
            <div class="flex items-center gap-3">
                <!-- Search Customer -->
                <div class="relative flex-1 sm:w-64">
                    <span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <UIcon name="i-lucide-search" class="w-4 h-4 text-slate-400" />
                    </span>
                    <input
                        :value="searchQuery"
                        type="text"
                        placeholder="ค้นหาลูกค้า, HN, นัดหมาย..."
                        class="w-full bg-slate-50 border border-gray-200 rounded-2xl pl-9 pr-4 py-2 text-xs md:text-sm font-semibold text-slate-700 focus:bg-white focus:border-indigo-500 outline-none transition-all"
                        @input="updateSearch"
                    />
                </div>

                <button type="button" class="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs md:text-sm px-4 py-2 rounded-2xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer">
                    <UIcon name="i-lucide-sliders-horizontal" class="w-3.5 h-3.5" />
                    <span>ประเภทบริการ</span>
                </button>
            </div>
        </div>
    </div>
</template>
