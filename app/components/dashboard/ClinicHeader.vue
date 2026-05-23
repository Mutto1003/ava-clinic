<script setup lang="ts">
    import { computed } from 'vue'
    import { useAuthStore } from '~/stores/auth'

    const authStore = useAuthStore()

    // Dynamic user name from authStore
    const userName = computed(() => authStore.user?.name || 'จิตราภรณ์')

    // Dynamic greeting based on time of day
    const greeting = computed(() => {
        const hour = new Date().getHours()
        if (hour < 12) return 'สวัสดีตอนเช้า'
        if (hour < 17) return 'สวัสดีตอนบ่าย'
        return 'สวัสดีตอนเย็น'
    })

    // Define model for search query
    const searchQuery = defineModel<string>('searchQuery', { default: '' })
</script>

<template>
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8 mt-10">
        <!-- ── Left Column: Welcome & Stats Card (Gradient) ── -->
        <div class="lg:col-span-3 gradient-card rounded-3xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden shadow-xl shadow-indigo-900/10 min-h-[220px]">
            <!-- Background lights -->
            <div class="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div class="absolute bottom-0 left-0 w-60 h-60 bg-pink-500/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>

            <div class="relative z-10 space-y-4">
                <!-- Status & Store Info -->
                <div class="flex items-center gap-2 text-[11px] md:text-xs font-semibold tracking-wide text-white/80 uppercase">
                    <span class="relative flex h-2 w-2 mr-1">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span>AVACLINIC · พระราม 9 · เปิดให้บริการ 09:00 — 20:00</span>
                </div>

                <!-- Welcome Text with Waving Hand Animation -->
                <h2 class="text-2xl md:text-3.5xl font-black text-white tracking-tight leading-tight flex items-center gap-2">
                    {{ greeting }}, {{ userName }}
                    <span class="wave-animation">👋</span>
                </h2>

                <!-- Schedule / Attention info -->
                <p class="text-xs md:text-sm text-indigo-100/90 font-medium leading-relaxed">
                    วันนี้คุณมีนัดหมาย <strong class="text-white font-black text-[13px] md:text-sm">8 ราย</strong> ·
                    <strong class="text-white font-black text-[13px] md:text-sm">3 รายการ</strong> ต้องการความสนใจ ·
                    <strong class="text-white font-black text-[13px] md:text-sm">5 สินค้า</strong> ใกล้หมดอายุ
                </p>
            </div>

            <!-- Bottom Stats Section -->
            <div class="relative z-10 grid grid-cols-3 gap-4 pt-6 border-t border-white/10 mt-8">
                <!-- Next appointment -->
                <div class="space-y-1">
                    <span class="text-[10px] md:text-xs text-indigo-200/60 font-semibold uppercase tracking-wider">นัดถัดไป</span>
                    <div class="flex items-baseline gap-1.5 flex-wrap">
                        <span class="text-lg md:text-2xl font-black text-white leading-none">14:00</span>
                        <span class="text-[9px] md:text-xs text-emerald-300 font-bold bg-emerald-500/20 px-2 py-0.5 rounded-full inline-block leading-normal">· อีก 1 ชม.</span>
                    </div>
                </div>

                <!-- Today revenue -->
                <div class="space-y-1">
                    <span class="text-[10px] md:text-xs text-indigo-200/60 font-semibold uppercase tracking-wider">รายได้วันนี้</span>
                    <div class="flex items-baseline gap-1.5 flex-wrap">
                        <span class="text-lg md:text-2xl font-black text-white leading-none">฿38,200</span>
                        <span class="text-[9px] md:text-xs text-emerald-300 font-bold bg-emerald-500/20 px-2 py-0.5 rounded-full inline-block leading-normal">+18%</span>
                    </div>
                </div>

                <!-- Today customers -->
                <div class="space-y-1">
                    <span class="text-[10px] md:text-xs text-indigo-200/60 font-semibold uppercase tracking-wider">ลูกค้าวันนี้</span>
                    <div class="flex items-baseline gap-1.5 flex-wrap">
                        <span class="text-lg md:text-2xl font-black text-white leading-none">12</span>
                        <span class="text-[9px] md:text-xs text-emerald-300 font-bold bg-emerald-500/20 px-2 py-0.5 rounded-full inline-block leading-normal">+2</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- ── Right Column: Search & Quick Filters Card (White) ── -->
        <div class="lg:col-span-2 bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-xl shadow-slate-200/40 flex flex-col justify-between gap-6 relative overflow-hidden group">
            <div class="space-y-4">
                <!-- Location Indicator -->
                <div>
                    <span class="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-wider">สาขาที่กำลังใช้งาน</span>
                    <h3 class="text-base md:text-lg font-black text-indigo-600 tracking-tight mt-1 flex items-center gap-1.5">
                        พระราม 9 · ศูนย์ความงามครบวงจร
                    </h3>
                </div>

                <!-- Search Input Container -->
                <div class="relative w-full">
                    <UIcon name="i-lucide-search" class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    <input
                        v-model="searchQuery"
                        type="text"
                        placeholder="ค้นหาลูกค้า · ชื่อ, เบอร์โทร, HN..."
                        class="w-full pl-11 pr-20 py-3 rounded-2xl bg-gray-50 border border-gray-200/60 focus:border-indigo-500 focus:bg-white text-xs md:text-sm text-gray-700 outline-none transition-all duration-300 shadow-sm focus:shadow-md focus:shadow-indigo-500/5 font-semibold placeholder-gray-400"
                    />
                    <div class="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-200/30 hover:bg-gray-200 text-gray-500 px-2.5 py-1 rounded-xl text-[9px] font-bold tracking-wider flex items-center gap-1 transition-colors cursor-pointer select-none border border-gray-300/10 shadow-sm">
                        <span>ค้นหา</span>
                        <span>↵</span>
                    </div>
                </div>
            </div>

            <!-- Bottom Row: Filter Badges / Chips -->
            <div class="flex flex-wrap gap-2 pt-2">
                <!-- Chip 1: VIP -->
                <div class="filter-chip">
                    <span class="text-gray-600">ลูกค้า VIP</span>
                    <span class="chip-number">86</span>
                </div>

                <!-- Chip 2: Queue -->
                <div class="filter-chip">
                    <span class="text-gray-600">รอเรียก</span>
                    <span class="chip-number">3</span>
                </div>

                <!-- Chip 3: Appointments -->
                <div class="filter-chip">
                    <span class="text-gray-600">นัดวันนี้</span>
                    <span class="chip-number">8</span>
                </div>

                <!-- Chip 4: Unpaid -->
                <div class="filter-chip">
                    <span class="text-gray-600">ค้างชำระ</span>
                    <span class="chip-number">2</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    /* Gradient Left Card Background */
    .gradient-card {
        background: linear-gradient(135deg, #3730a3 0%, #4f46e5 45%, #7c3aed 100%);
    }

    /* Waving Emoji Hand Keyframes Animation */
    @keyframes wave-hand {
        0% { transform: rotate(0deg); }
        10% { transform: rotate(14deg); }
        20% { transform: rotate(-8deg); }
        30% { transform: rotate(14deg); }
        40% { transform: rotate(-4deg); }
        50% { transform: rotate(10deg); }
        60% { transform: rotate(0deg); }
        100% { transform: rotate(0deg); }
    }

    .wave-animation {
        display: inline-block;
        animation: wave-hand 2.2s infinite;
        transform-origin: 70% 70%;
    }

    .wave-animation:hover {
        animation: wave-hand 0.8s infinite;
    }

    /* Premium Filter Chips styling */
    .filter-chip {
        display: flex;
        align-items: center;
        gap: 6px;
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        padding: 5px 10px;
        border-radius: 100px;
        font-size: 11px;
        font-weight: 700;
        color: #475569;
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        cursor: pointer;
        user-select: none;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
    }

    .filter-chip:hover {
        background: #f1f5f9;
        border-color: #cbd5e1;
        color: #1e293b;
        transform: translateY(-1.5px);
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    }

    .chip-number {
        font-size: 10px;
        font-weight: 700;
        color: #64748b;
        background: #ffffff;
        border: 1px solid #e2e8f0;
        min-width: 16px;
        height: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        padding: 0 3px;
        box-shadow: inset 0 1px 2px rgba(0,0,0,0.02);
    }
</style>
