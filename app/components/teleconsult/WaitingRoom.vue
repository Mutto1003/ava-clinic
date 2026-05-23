<script setup lang="ts">
    import type { TeleconsultWaitingRoomItem } from '~/client/teleconsult'

    defineProps<{
        waitingRoom: TeleconsultWaitingRoomItem[]
    }>()

    const toast = useAppToast()
    const isJoining = ref(false)

    // Action functions for the active LIVE consultation
    const handleChat = () => {
        toast.info('แชท', 'เปิดกล่องข้อความพูดคุยเรียบร้อย')
    }

    const handleRefer = () => {
        toast.success('ส่งต่อแพทย์', 'ส่งเคสไปยังห้องแพทย์เรียบร้อยแล้ว')
    }

    const handleJoin = () => {
        isJoining.value = true
        toast.success('เข้าร่วมวิดีโอคอล', 'กำลังเชื่อมต่อสายสนทนากับคนไข้...')
        setTimeout(() => {
            isJoining.value = false
        }, 1500)
    }
</script>

<template>
    <div class="space-y-6">
        <!-- ── Card 1: Active Consult Card (LIVE) ── -->
        <div class="bg-indigo-50/30 rounded-3xl p-6 border border-indigo-100/50 shadow-lg shadow-indigo-100/40 relative overflow-hidden group">
            <!-- Background light flare -->
            <div class="absolute -top-12 -right-12 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none"></div>

            <!-- Top Header Row -->
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-2 text-xs font-bold text-indigo-600">
                    <span class="relative flex h-2 w-2">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                    </span>
                    <span class="uppercase tracking-wider">LIVE · กำลังตรวจอยู่</span>
                </div>
            </div>

            <!-- Middle Consult Content Grid -->
            <div class="flex flex-col sm:flex-row gap-4 mb-5">
                <!-- Left Column: Video Preview Thumbnail Mock -->
                <div class="w-full sm:w-28 h-24 rounded-2xl bg-gradient-to-br from-[#1c142c] via-[#241a39] to-[#0f0a1b] flex items-center justify-center relative shadow-inner overflow-hidden border border-[#30234b]">
                    <!-- Ambient video call icon -->
                    <UIcon name="i-lucide-video" class="w-8 h-8 text-indigo-400/20" />
                    
                    <!-- Time overlay -->
                    <span class="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-[9px] text-white/90 font-bold px-1.5 py-0.5 rounded-md tracking-wider">
                        12:34
                    </span>

                    <!-- Pulsing Recording Status -->
                    <div class="absolute bottom-2 left-2 bg-rose-600/90 text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-lg flex items-center gap-1 shadow-sm">
                        <span class="w-1.5 h-1.5 rounded-full bg-white rec-pulse-dot"></span>
                        <span>REC</span>
                    </div>
                </div>

                <!-- Right Column: Patient Details -->
                <div class="flex-1 flex flex-col justify-between">
                    <div>
                        <h4 class="text-base font-black text-slate-800 tracking-tight leading-snug">ปทมา คำสิหา</h4>
                        <p class="text-[11px] font-semibold text-gray-400 mt-0.5">ผื่นแพ้ครีม · Follow-up</p>
                    </div>

                    <!-- Room Badge & Dr. Name -->
                    <div class="mt-2.5">
                        <div class="inline-flex items-center gap-1 bg-white border border-gray-100/90 rounded-xl px-2.5 py-1 text-[10px] md:text-xs text-slate-500 font-bold shadow-sm">
                            ห้อง #042 · Dr. สมศักดิ์
                        </div>
                    </div>
                </div>
            </div>

            <!-- Bottom Row: Buttons (Chat, Refer, Join) -->
            <div class="grid grid-cols-12 gap-2">
                <!-- Chat Button -->
                <button
                    class="col-span-4 border border-gray-100 hover:border-gray-200 bg-white hover:bg-gray-50 text-slate-600 font-bold text-xs py-2.5 rounded-2xl flex items-center justify-center gap-1.5 shadow-sm transition-all hover:scale-[1.02] cursor-pointer"
                    @click="handleChat"
                >
                    <UIcon name="i-lucide-message-square" class="w-4 h-4 text-slate-500" />
                    <span>แชท</span>
                </button>

                <!-- Refer Button -->
                <button
                    class="col-span-4 border border-gray-100 hover:border-gray-200 bg-white hover:bg-gray-50 text-slate-600 font-bold text-xs py-2.5 rounded-2xl flex items-center justify-center gap-1.5 shadow-sm transition-all hover:scale-[1.02] cursor-pointer"
                    @click="handleRefer"
                >
                    <UIcon name="i-lucide-phone-forwarded" class="w-4 h-4 text-slate-500" />
                    <span>ส่งแพทย์</span>
                </button>

                <!-- Join Button (Emerald Green Solid) -->
                <button
                    class="col-span-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 rounded-2xl flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/10 transition-all hover:scale-[1.02] cursor-pointer join-btn"
                    :disabled="isJoining"
                    @click="handleJoin"
                >
                    <UIcon
                        name="i-lucide-video"
                        class="w-4 h-4 camera-icon"
                        :class="{ 'animate-pulse': isJoining }"
                    />
                    <span>เข้าร่วม</span>
                </button>
            </div>
        </div>

        <!-- ── Card 2: Waiting Queue List (ห้องรอ) ── -->
        <div class="bg-white rounded-3xl p-6 border border-gray-100 shadow-xl shadow-slate-200/40 relative">
            <div class="flex justify-between items-start mb-5 pb-3 border-b border-gray-50">
                <div>
                    <h3 class="font-black text-slate-800 text-base md:text-lg tracking-tight leading-none">ห้องรอตรวจ</h3>
                    <p class="text-[11px] font-bold text-gray-400 mt-1.5">3 คนกำลังออนไลน์</p>
                </div>
                <div class="flex items-center gap-1.5 text-[9px] font-extrabold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100/50">
                    <span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                    <span>รอดำเนินการ</span>
                </div>
            </div>

            <!-- Wait Room Patients Grid -->
            <div class="divide-y divide-dashed divide-gray-100/90">
                <div
                    v-for="item in waitingRoom"
                    :key="item.id"
                    class="flex items-center justify-between py-3.5 group/item hover:bg-slate-50/40 px-2 -mx-2 rounded-2xl transition-all duration-300"
                >
                    <div class="flex items-center gap-3">
                        <div class="relative shrink-0">
                            <!-- Rounded smooth avatar circle -->
                            <div
                                class="w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-xs shadow-sm"
                                :class="item.color || 'bg-slate-100 text-slate-600'"
                            >
                                {{ item.initial }}
                            </div>
                            <span class="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full shadow-sm"></span>
                        </div>
                        <div>
                            <div class="font-bold text-slate-700 text-xs md:text-sm mb-0.5">{{ item.patient }}</div>
                            <div class="text-[10px] text-gray-400 font-semibold">{{ item.status }}</div>
                        </div>
                    </div>

                    <!-- Call/Greet Quick Action Button -->
                    <UButton
                        v-if="item.action"
                        :variant="item.action === 'รับ' ? 'solid' : 'ghost'"
                        size="xs"
                        class="rounded-xl font-bold px-3 py-1 text-[10px] shadow-sm transition-all active:scale-95"
                        :color="item.action === 'รับ' ? 'primary' : 'neutral'"
                        :class="item.action !== 'รับ' ? 'ring-1 ring-gray-200 text-slate-600 hover:bg-gray-50' : ''"
                        @click="toast.success('เรียกเข้ารับบริการ', `ส่งคำเชิญไปยัง ${item.patient} เรียบร้อย`)"
                    >
                        {{ item.action }}
                    </UButton>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    /* Recording Dot Pulsing Indicator */
    @keyframes pulse-opacity {
        0% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.3; transform: scale(0.85); }
        100% { opacity: 1; transform: scale(1); }
    }

    .rec-pulse-dot {
        animation: pulse-opacity 1.4s infinite ease-in-out;
    }

    /* Action buttons icon micro-interactions */
    .join-btn:hover .camera-icon {
        transform: scale(1.1) rotate(6deg);
        transition: transform 0.25s ease;
    }
</style>
