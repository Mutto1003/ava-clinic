<script setup lang="ts">
    const props = defineProps<{
        selectedBranch: string
        selectedDoctor: string
        searchQuery: string
        selectedDay: number // e.g. 17
    }>()

    const emit = defineEmits<{
        (e: 'select-day', day: number): void
    }>()

    // Fully comprehensive Mock Appointments database for May 2569 (3 สาขา: เลย, เมืองทองธานี, อมตะชลบุรี)
    const appointments = ref([
        { id: 1, day: 4, time: '10:38', name: 'คุณวิไลพร', branch: 'เมืองทองธานี', doctor: 'Dr. พิมลภา จันทร์เพ็ญ' },
        { id: 2, day: 4, time: '14:00', name: 'คุณธนภูมิ', branch: 'อมตะชลบุรี', doctor: 'Dr. ธนดล สวัสดี' },

        { id: 3, day: 5, time: '09:00', name: 'คุณอลิศ', branch: 'เลย', doctor: 'Dr. นันทกานต์ ภู่กัน' },
        { id: 4, day: 5, time: '15:30', name: 'คุณสมศักดิ์', branch: 'เมืองทองธานี', doctor: 'Dr. เจลิม คงสกุล' },

        { id: 5, day: 7, time: '11:00', name: 'คุณนภา', branch: 'เลย', doctor: 'Dr. นันทกานต์ ภู่กัน' },
        { id: 6, day: 7, time: '14:00', name: 'คุณกนก', branch: 'เมืองทองธานี', doctor: 'Dr. พิมลภา จันทร์เพ็ญ' },
        { id: 7, day: 7, time: '15:30', name: 'คุณวารี', branch: 'อมตะชลบุรี', doctor: 'Dr. ธนดล สวัสดี' },

        { id: 8, day: 11, time: '10:00', name: 'คุณดารา', branch: 'เลย', doctor: 'Dr. นันทกานต์ ภู่กัน' },
        { id: 9, day: 11, time: '13:30', name: 'คุณประเสริฐ', branch: 'อมตะชลบุรี', doctor: 'Dr. ธนดล สวัสดี' },

        { id: 10, day: 12, time: '09:00', name: 'คุณพิมลภา', branch: 'เมืองทองธานี', doctor: 'Dr. เจลิม คงสกุล' },

        { id: 11, day: 14, time: '10:00', name: 'คุณวิภา', branch: 'เลย', doctor: 'Dr. นันทกานต์ ภู่กัน' },
        { id: 12, day: 14, time: '14:30', name: 'คุณศิริ', branch: 'เมืองทองธานี', doctor: 'Dr. เจลิม คงสกุล' },

        { id: 13, day: 17, time: '09:30', name: 'คุณรุ่งเรือง', branch: 'อมตะชลบุรี', doctor: 'Dr. สมศักดิ์ พัฒนกุล' },
        { id: 14, day: 17, time: '11:00', name: 'คุณอัจฉรา', branch: 'เมืองทองธานี', doctor: 'Dr. พิมลภา จันทร์เพ็ญ' },
        { id: 15, day: 17, time: '14:00', name: 'คุณวารี', branch: 'เลย', doctor: 'Dr. นันทกานต์ ภู่กัน' },
        { id: 16, day: 17, time: '16:30', name: 'คุณมนัส', branch: 'เมืองทองธานี', doctor: 'Dr. เจลิม คงสกุล' },

        { id: 17, day: 18, time: '10:30', name: 'คุณนพ', branch: 'เลย', doctor: 'Dr. นันทกานต์ ภู่กัน' },
        { id: 18, day: 18, time: '14:00', name: 'คุณกัลยา', branch: 'อมตะชลบุรี', doctor: 'Dr. ธนดล สวัสดี' },

        { id: 19, day: 20, time: '09:00', name: 'คุณเสริมศักดิ์', branch: 'เลย', doctor: 'Dr. สมศักดิ์ พัฒนกุล' },

        { id: 20, day: 21, time: '10:00', name: 'คุณภาวินี', branch: 'เมืองทองธานี', doctor: 'Dr. พิมลภา จันทร์เพ็ญ' },
        { id: 21, day: 21, time: '13:00', name: 'คุณอนันต์', branch: 'เลย', doctor: 'Dr. นันทกานต์ ภู่กัน' },
        { id: 22, day: 21, time: '15:00', name: 'คุณทศพร', branch: 'อมตะชลบุรี', doctor: 'Dr. ธนดล สวัสดี' },

        { id: 23, day: 24, time: '14:00', name: 'คุณพิมลภา', branch: 'เมืองทองธานี', doctor: 'Dr. เจลิม คงสกุล' },

        { id: 24, day: 25, time: '10:00', name: 'คุณธิติ', branch: 'เลย', doctor: 'Dr. นันทกานต์ ภู่กัน' },
        { id: 25, day: 25, time: '15:00', name: 'คุณวิมล', branch: 'อมตะชลบุรี', doctor: 'Dr. ธนดล สวัสดี' }
    ])

    const weekdayHeaders = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์']

    // Define 6 weeks grid layout for May 2569
    // Starts Friday 1st May 2569, meaning Apr 26 - 30 are blank/faint from previous month
    const calendarDays = [
        { day: 26, isCurrentMonth: false },
        { day: 27, isCurrentMonth: false },
        { day: 28, isCurrentMonth: false },
        { day: 29, isCurrentMonth: false },
        { day: 30, isCurrentMonth: false },
        { day: 1, isCurrentMonth: true },
        { day: 2, isCurrentMonth: true },

        { day: 3, isCurrentMonth: true },
        { day: 4, isCurrentMonth: true },
        { day: 5, isCurrentMonth: true },
        { day: 6, isCurrentMonth: true },
        { day: 7, isCurrentMonth: true },
        { day: 8, isCurrentMonth: true },
        { day: 9, isCurrentMonth: true },

        { day: 10, isCurrentMonth: true },
        { day: 11, isCurrentMonth: true },
        { day: 12, isCurrentMonth: true },
        { day: 13, isCurrentMonth: true },
        { day: 14, isCurrentMonth: true },
        { day: 15, isCurrentMonth: true },
        { day: 16, isCurrentMonth: true },

        { day: 17, isCurrentMonth: true },
        { day: 18, isCurrentMonth: true },
        { day: 19, isCurrentMonth: true },
        { day: 20, isCurrentMonth: true },
        { day: 21, isCurrentMonth: true },
        { day: 22, isCurrentMonth: true },
        { day: 23, isCurrentMonth: true },

        { day: 24, isCurrentMonth: true },
        { day: 25, isCurrentMonth: true },
        { day: 26, isCurrentMonth: true },
        { day: 27, isCurrentMonth: true },
        { day: 28, isCurrentMonth: true },
        { day: 29, isCurrentMonth: true },
        { day: 30, isCurrentMonth: true },

        { day: 31, isCurrentMonth: true },
        { day: 1, isCurrentMonth: false },
        { day: 2, isCurrentMonth: false },
        { day: 3, isCurrentMonth: false },
        { day: 4, isCurrentMonth: false },
        { day: 5, isCurrentMonth: false },
        { day: 6, isCurrentMonth: false }
    ]

    const { getBranchPillColor, getBranchDotColor } = useBranchColor()

    // Filter appointments inside each day
    const getFilteredAppointments = (day: number, isCurrent: boolean) => {
        if (!isCurrent) return []
        return appointments.value.filter(app => {
            if (app.day !== day) return false
            if (props.selectedBranch !== 'ทั้งหมด' && app.branch !== props.selectedBranch) return false
            if (props.selectedDoctor !== 'ทั้งหมด' && !app.doctor.toLowerCase().includes(props.selectedDoctor.toLowerCase())) return false
            if (props.searchQuery) {
                const q = props.searchQuery.toLowerCase()
                return (
                    app.name.toLowerCase().includes(q) ||
                    app.doctor.toLowerCase().includes(q) ||
                    app.branch.toLowerCase().includes(q)
                )
            }
            return true
        })
    }

    const onDayClick = (day: { day: number, isCurrentMonth: boolean }) => {
        if (day.isCurrentMonth) {
            emit('select-day', day.day)
        }
    }
</script>

<template>
    <div class="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex-1">
        <!-- ── Weekday Headers ── -->
        <div class="grid grid-cols-7 bg-slate-50 border-b border-gray-100">
            <div
                v-for="weekday in weekdayHeaders"
                :key="weekday"
                class="py-3 text-center text-xs font-black text-slate-500 uppercase tracking-widest"
            >
                {{ weekday }}
            </div>
        </div>

        <!-- ── Calendar Grid Cell Items ── -->
        <div class="grid grid-cols-7 grid-rows-6 divide-x divide-y divide-gray-100/70 border-t border-gray-100/70">
            <div
                v-for="(dayObj, index) in calendarDays"
                :key="index"
                class="min-h-[110px] md:min-h-[140px] p-2 flex flex-col justify-between transition-all relative select-none cursor-pointer"
                :class="[
                    !dayObj.isCurrentMonth ? 'bg-slate-50/40 text-slate-300' : 'bg-white text-slate-700 hover:bg-slate-50/60',
                    dayObj.isCurrentMonth && selectedDay === dayObj.day ? 'ring-2 ring-indigo-600 ring-inset bg-indigo-50/20' : ''
                ]"
                @click="onDayClick(dayObj)"
            >
                <!-- Day Number -->
                <div class="flex items-center justify-between">
                    <span
                        class="text-xs md:text-sm font-black w-6 h-6 rounded-lg flex items-center justify-center"
                        :class="[
                            dayObj.isCurrentMonth && selectedDay === dayObj.day ? 'bg-indigo-600 text-white' : '',
                            !dayObj.isCurrentMonth ? 'text-slate-300' : 'text-slate-700'
                        ]"
                    >
                        {{ dayObj.day }}
                    </span>

                    <!-- Doctor count or dot indicator -->
                    <span v-if="dayObj.isCurrentMonth && getFilteredAppointments(dayObj.day, true).length > 0" class="text-[9px] font-bold text-slate-400">
                        {{ new Set(getFilteredAppointments(dayObj.day, true).map(a => a.doctor)).size }} หมอ
                    </span>
                </div>

                <!-- Day Appointments Pills -->
                <div class="mt-1 flex-1 space-y-1 overflow-hidden flex flex-col justify-end">
                    <!-- Display top 2 pills -->
                    <div
                        v-for="app in getFilteredAppointments(dayObj.day, dayObj.isCurrentMonth).slice(0, 2)"
                        :key="app.id"
                        class="text-[9px] md:text-[10px] px-2 py-1 rounded-lg font-black truncate shadow-sm flex items-center justify-between gap-1"
                        :class="getBranchPillColor(app.branch)"
                    >
                        <span class="truncate">{{ app.time }} {{ app.name }}</span>
                    </div>

                    <!-- More indicator -->
                    <div v-if="getFilteredAppointments(dayObj.day, dayObj.isCurrentMonth).length > 2" class="text-[9px] font-bold text-indigo-500 pl-1">
                        + อีก {{ getFilteredAppointments(dayObj.day, dayObj.isCurrentMonth).length - 2 }} ราย
                    </div>
                </div>

                <!-- Bottom color code dots indicating branches of appointments of the day -->
                <div class="flex gap-1 mt-1 justify-center shrink-0">
                    <span
                        v-for="app in getFilteredAppointments(dayObj.day, dayObj.isCurrentMonth).slice(0, 4)"
                        :key="'dot-' + app.id"
                        class="w-1.5 h-1.5 rounded-full"
                        :class="getBranchDotColor(app.branch)"
                    ></span>
                </div>
            </div>
        </div>
    </div>
</template>
