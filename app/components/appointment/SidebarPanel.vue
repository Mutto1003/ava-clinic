<script setup lang="ts">
    const props = defineProps<{
        selectedDay: number // e.g. 17
    }>()

    const emit = defineEmits<{
        (e: 'save-booking', payload: any): void
    }>()

    // 3 Mockup Doctors aligned with active database branches: เมืองทองธานี, เลย
    const doctors = ref([
        { id: 1, name: 'พิมลภา จันทร์เพ็ญ', branch: 'เมืองทองธานี', specialty: 'ความงาม', time: '10:00-19:00', initial: 'พม', color: 'bg-[#ec4899] text-white' },
        { id: 2, name: 'ธนดล สวัสดี', branch: 'เมืองทองธานี', specialty: 'ผิวหนัง', time: '13:00-20:00', initial: 'ธด', color: 'bg-[#3b82f6] text-white' },
        { id: 3, name: 'นันทกานต์ ภู่กัน', branch: 'เลย', specialty: 'จิตเวช', time: '10:00-18:00', initial: 'นก', color: 'bg-[#10b981] text-white' }
    ])

    const selectedDoctorId = ref(2) // Default active doctor is Dr. ธนดล สวัสดี (Id 2) as in mockup
    const selectedTimeSlot = ref('14:30')
    const selectedCustomer = ref('')

    const activeDoctor = computed(() => {
        const doc = doctors.value.find(d => d.id === selectedDoctorId.value)
        return doc || doctors.value[1]!
    })

    // Mock booked/free/closed slots mapping exactly to mockup illustration
    const getSlotState = (slot: string) => {
        // Mocked booked times from screenshot
        const bookedTimes = ['09:30', '11:00', '14:00', '15:30']
        // Mocked closed/blocked times from screenshot
        const closedTimes = ['12:00', '12:30', '17:30', '18:00', '18:30']

        if (bookedTimes.includes(slot)) return 'booked'
        if (closedTimes.includes(slot)) return 'closed'
        if (selectedTimeSlot.value === slot) return 'selected'
        return 'free'
    }

    const timeSlots = [
        '09:00', '09:30', '10:00', '10:30',
        '11:00', '11:30', '12:00', '12:30',
        '13:00', '13:30', '14:00', '14:30',
        '15:00', '15:30', '16:00', '16:30',
        '17:00', '17:30', '18:00', '18:30'
    ]

    const selectSlot = (slot: string) => {
        const state = getSlotState(slot)
        if (state !== 'booked' && state !== 'closed') {
            selectedTimeSlot.value = slot
        }
    }

    // Existing Appointments for Day 17 (Matches Mockup Image 2 exactly, aligned with database branches)
    const dayAppointments = ref([
        { id: 101, time: '09:30', customer: 'คุณรุ่งทอง', branch: 'เมืองทองธานี', colorClass: 'bg-[#6366f1]' },
        { id: 102, time: '11:00', customer: 'คุณภัทรา', branch: 'เมืองทองธานี', colorClass: 'bg-[#6366f1]' },
        { id: 103, time: '14:00', customer: 'คุณวารี', branch: 'เลย', colorClass: 'bg-[#10b981]' },
        { id: 104, time: '15:30', customer: 'คุณสมหญิง', branch: 'เมืองทองธานี', colorClass: 'bg-[#6366f1]' }
    ])

    const { getBranchTextColor, getBranchDotColor } = useBranchColor()

    const confirmBooking = () => {
        emit('save-booking', {
            day: props.selectedDay,
            time: selectedTimeSlot.value,
            doctor: `Dr. ${activeDoctor.value.name}`,
            branch: activeDoctor.value.branch,
            customer: selectedCustomer.value || 'คุณรุ่งเรือง เลิศล้ำ'
        })
    }
</script>

<template>
    <div class="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-slate-200/40 overflow-hidden flex flex-col h-full lg:h-[calc(100vh-140px)]">
        <!-- ── Date & Roster Header (Gradient matches top header exactly) ── -->
        <div class="bg-gradient-to-tr from-[#5b21b6] via-[#6d28d9] to-[#7c3aed] p-6 text-white relative shrink-0">
            <div class="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>

            <span class="text-[10px] font-black text-indigo-200/90 uppercase tracking-widest block mb-1">เลือกวัน • พฤษภาคม</span>
            <h3 class="text-2xl font-black tracking-tight flex items-baseline gap-1">
                อาทิตย์ ที่ {{ selectedDay }}
            </h3>
            <p class="text-[11px] text-indigo-100/90 font-bold mt-2 flex items-center gap-1.5">
                <span>3 แพทย์เข้าตรวจ</span>
                <span class="text-indigo-400">•</span>
                <span>4 นัดแล้ว</span>
                <span class="text-indigo-400">•</span>
                <span>ว่าง 14 ช่อง</span>
            </p>
        </div>

        <!-- ── Scrollable Sidebar Content (pb-12 to let scroll fit the card fully) ── -->
        <div class="p-5 space-y-6 flex-1 overflow-y-auto scrollbar-thin pb-12">

            <!-- 1. Doctors Duty Schedule -->
            <div class="space-y-3">
                <div class="flex items-center justify-between">
                    <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">แพทย์ที่เข้าตรวจ</span>
                    <span class="text-[#6366f1] hover:underline cursor-pointer font-black text-xs">ดูทั้งหมด</span>
                </div>

                <div class="space-y-3">
                    <button
                        v-for="doc in doctors"
                        :key="doc.id"
                        type="button"
                        class="w-full p-3 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer"
                        :class="[
                            selectedDoctorId === doc.id
                                ? 'border-2 border-[#6366f1] bg-white shadow-lg shadow-indigo-100/50'
                                : 'border-slate-100 bg-white hover:bg-slate-50'
                        ]"
                        @click="selectedDoctorId = doc.id"
                    >
                        <!-- Circle Avatar -->
                        <div class="w-10 h-10 rounded-full flex items-center justify-center font-black text-xs shrink-0 shadow-sm" :class="doc.color">
                            {{ doc.initial }}
                        </div>

                        <!-- Doctor Info -->
                        <div class="min-w-0 flex-1">
                            <span class="text-xs font-black text-slate-800 block truncate">{{ doc.name }}</span>
                            <div class="flex items-center gap-1.5 mt-1">
                                <span class="bg-purple-50 text-[#6366f1] rounded-full px-2 py-0.5 text-[9px] font-bold border border-purple-100 shrink-0">
                                    • {{ doc.branch }}
                                </span>
                                <span class="text-slate-400 font-bold text-[9px] truncate">{{ doc.specialty }}</span>
                            </div>
                        </div>

                        <!-- Shift Tag -->
                        <div class="bg-slate-50 border border-slate-100/80 rounded-lg px-2.5 py-1 shrink-0 text-right">
                            <span class="text-[10px] font-black text-slate-600 block">{{ doc.time }}</span>
                        </div>
                    </button>
                </div>
            </div>

            <!-- 2. Interactive Time Slot Grid -->
            <div class="space-y-3">
                <div class="flex items-center justify-between">
                    <span class="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center">
                        เลือกเวลานัด • <span class="text-slate-800 font-black ml-1.5">Dr. {{ activeDoctor.name }}</span>
                    </span>
                    <span class="text-[#6366f1] hover:underline cursor-pointer font-bold text-xs">เปลี่ยนแพทย์</span>
                </div>

                <!-- Legend Indicator Row -->
                <div class="flex items-center gap-3 text-[10px] text-slate-400 font-bold pb-1">
                    <div class="flex items-center gap-1.5">
                        <span class="w-2.5 h-2.5 rounded border border-slate-200 bg-white"></span>
                        <span>ว่าง</span>
                    </div>
                    <div class="flex items-center gap-1.5">
                        <span class="w-2.5 h-2.5 rounded border border-[#fee2e2] bg-[#fef2f2]"></span>
                        <span>ถูกจอง</span>
                    </div>
                    <div class="flex items-center gap-1.5">
                        <span class="w-2.5 h-2.5 rounded bg-[#f1f5f9]"></span>
                        <span>ปิด</span>
                    </div>
                    <span class="ml-auto text-slate-400/90 font-bold">15 นาที / ช่อง</span>
                </div>

                <!-- Grid Layout (4 Columns) -->
                <div class="grid grid-cols-4 gap-2 w-full">
                    <button
                        v-for="slot in timeSlots"
                        :key="slot"
                        type="button"
                        class="w-full py-2.5 rounded-xl border text-center font-black text-xs transition-all cursor-pointer"
                        :class="[
                            getSlotState(slot) === 'booked'
                                ? 'bg-[#fef2f2] border border-[#fee2e2] text-[#f87171] line-through pointer-events-none'
                                : getSlotState(slot) === 'closed'
                                    ? 'bg-[#f1f5f9] border border-transparent text-[#94a3b8] pointer-events-none'
                                    : getSlotState(slot) === 'selected'
                                        ? 'bg-[#6366f1] border-transparent text-white shadow-md shadow-indigo-200'
                                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        ]"
                        @click="selectSlot(slot)"
                    >
                        {{ slot }}
                    </button>
                </div>
            </div>

            <!-- Divider -->
            <div class="border-b border-gray-100/80"></div>

            <!-- 3. Confirmation Widget (Exact Lavender/Purple card mockup replica) -->
            <div class="space-y-3">
                <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">ยืนยันการนัด</span>

                <!-- Lavender Tint Card -->
                <div class="w-full bg-[#f5f3ff] border border-purple-100 rounded-3xl p-5 space-y-3.5 text-xs">
                    <div class="flex items-center justify-between">
                        <span class="font-bold text-[#7c3aed]/70">วันที่</span>
                        <span class="font-bold text-slate-800">อาทิตย์ ที่ {{ selectedDay }} พ.ค. 2569</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="font-bold text-[#7c3aed]/70">เวลา</span>
                        <span class="font-bold text-slate-800">{{ selectedTimeSlot }} น. • 30 นาที</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="font-bold text-[#7c3aed]/70">แพทย์</span>
                        <span class="font-bold text-slate-800">Dr. {{ activeDoctor.name }}</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="font-bold text-[#7c3aed]/70">สาขา</span>
                        <span class="font-bold flex items-center gap-1.5" :class="getBranchTextColor(activeDoctor.branch)">
                            <span class="w-1.5 h-1.5 rounded-full shrink-0" :class="getBranchDotColor(activeDoctor.branch)"></span>
                            • {{ activeDoctor.branch }}
                        </span>
                    </div>
                    <div class="flex items-center justify-between border-t border-purple-200/50 pt-2.5">
                        <span class="font-bold text-[#7c3aed]/70">ลูกค้า</span>
                        <div class="relative flex items-center">
                            <select
                                v-model="selectedCustomer"
                                class="bg-transparent border-0 font-bold outline-none cursor-pointer pr-1 text-xs text-right appearance-none"
                                :class="selectedCustomer ? 'text-slate-800' : 'text-slate-400'"
                            >
                                <option value="" disabled>— เลือกลูกค้า —</option>
                                <option>คุณรุ่งทอง</option>
                                <option>คุณภัทรา</option>
                                <option>คุณวารี</option>
                                <option>คุณสมหญิง</option>
                            </select>
                            <UIcon name="i-lucide-chevron-down" class="w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                        </div>
                    </div>
                </div>

                <!-- CTA Button Grid -->
                <div class="flex items-center gap-3 w-full pt-1">
                    <!-- Save Button -->
                    <button
                        type="button"
                        class="w-[38%] bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-black text-xs md:text-sm py-2.5 rounded-2xl flex items-center justify-center gap-1.5 cursor-pointer transition-all shadow-sm"
                        @click="selectedCustomer = ''"
                    >
                        <UIcon name="i-lucide-save" class="w-4 h-4 text-slate-500" />
                        <span>บันทึก</span>
                    </button>

                    <!-- Confirm Button -->
                    <button
                        type="button"
                        class="w-[62%] bg-[#6366f1] hover:bg-[#4f46e5] text-white font-black text-xs md:text-sm py-2.5 rounded-2xl flex items-center justify-center gap-1 cursor-pointer transition-all shadow-md shadow-indigo-200"
                        @click="confirmBooking"
                    >
                        <UIcon name="i-lucide-plus" class="w-4 h-4 text-white/90" />
                        <span>นัดให้ลูกค้า</span>
                    </button>
                </div>
            </div>

            <!-- Divider -->
            <div class="border-b border-gray-100/80"></div>

            <!-- 4. Existing Appointments List -->
            <div class="space-y-3">
                <div class="flex items-center">
                    <span class="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center">
                        นัดที่มีอยู่แล้ว • <span class="text-slate-800 font-black ml-1 mr-1">4</span> ราย
                    </span>
                </div>

                <div class="space-y-3 w-full">
                    <div
                        v-for="app in dayAppointments"
                        :key="app.id"
                        class="w-full bg-white border border-slate-100 rounded-2xl p-3.5 flex items-center justify-between shadow-sm hover:border-slate-200 transition-all"
                    >
                        <div class="flex items-center gap-3 min-w-0">
                            <!-- Left thick colored line indicator -->
                            <div class="w-1 rounded h-8 shrink-0" :class="app.colorClass"></div>

                            <!-- Time Slot -->
                            <span class="text-xs font-black text-slate-800 shrink-0">{{ app.time }}</span>

                            <!-- Customer & Branch details -->
                            <div class="min-w-0">
                                <span class="text-xs font-black text-slate-800 block truncate">{{ app.customer }}</span>
                                <span class="text-[9px] font-bold block flex items-center gap-1 mt-1" :class="getBranchTextColor(app.branch)">
                                    <span class="w-1 h-1 rounded-full shrink-0" :class="getBranchDotColor(app.branch)"></span>
                                    <span>• {{ app.branch }}</span>
                                </span>
                            </div>
                        </div>

                        <!-- Round phone call button -->
                        <button type="button" class="w-8 h-8 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 flex items-center justify-center shrink-0 cursor-pointer transition-all">
                            <UIcon name="i-lucide-phone" class="w-3.5 h-3.5 text-slate-500" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    /* Premium narrow scrollbar support */
    .scrollbar-thin::-webkit-scrollbar {
        width: 4px;
    }
    .scrollbar-thin::-webkit-scrollbar-track {
        background: transparent;
    }
    .scrollbar-thin::-webkit-scrollbar-thumb {
        background: #e2e8f0;
        border-radius: 9999px;
    }
    .scrollbar-thin::-webkit-scrollbar-thumb:hover {
        background: #cbd5e1;
    }
</style>
