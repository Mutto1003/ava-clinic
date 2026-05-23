<script setup lang="ts">
    import type { MemberFormData, TeamRole } from '~/client/settings'

    const props = defineProps<{
        modelValue: MemberFormData
        teamSeats: { doctors: { remaining: number }; staff: { remaining: number }; superAdmins: { remaining: number } }
    }>()

    const emit = defineEmits<{
        (e: 'update:modelValue', value: MemberFormData): void
    }>()

    const form = computed({
        get: () => props.modelValue,
        set: (val) => emit('update:modelValue', val)
    })

    const update = (key: keyof MemberFormData, value: unknown) => {
        emit('update:modelValue', { ...props.modelValue, [key]: value })
    }

    const allBranches = ['มวกเหล็ก (สำนักงานใหญ่)', 'โคราช ซิตี้พลาซ่า', 'สระบุรี โรบินสัน', 'ปากช่อง', 'ลพบุรี (กำลังเปิด)']
    const workDayOptions = ['จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส', 'อา']

    const toggleBranch = (branch: string) => {
        const next = form.value.branches.includes(branch)
            ? form.value.branches.filter(b => b !== branch)
            : [...form.value.branches, branch]
        update('branches', next)
    }

    const toggleDay = (day: string) => {
        const next = form.value.workDays.includes(day)
            ? form.value.workDays.filter(d => d !== day)
            : [...form.value.workDays, day]
        update('workDays', next)
    }

    const roleCards: Array<{
        role: TeamRole
        subtitle: string
        badge: string
        badgeColor: string
        desc: string
        tags: string[]
        seatInfo: string
        seatColor: string
    }> = [
        {
            role: 'หมอ',
            subtitle: 'Doctor / แพทย์ผู้ทำหัตถการ',
            badge: '',
            badgeColor: '',
            desc: 'เข้าถึงประวัติคนไข้, สั่งการรักษา, ดูรูปก่อน-หลัง, จดบันทึก SOAP ได้เต็มที่ · จัดการได้เฉพาะคนไข้ในเคสของตัวเอง',
            tags: ['เวชระเบียน', 'Teleconsult', 'รูปก่อน-หลัง', 'ราคาทุน'],
            seatInfo: `ที่นั่งคงเหลือ ${props.teamSeats.doctors.remaining} · เหมาะกับ แพทย์ประจำ`,
            seatColor: 'text-gray-500'
        },
        {
            role: 'พนักงาน',
            subtitle: 'Staff / เคาน์เตอร์ & พยาบาล',
            badge: 'ทั่วไป',
            badgeColor: 'bg-gray-100 text-gray-600',
            desc: 'ลงทะเบียนลูกค้าใหม่, นัดหมาย, รับชำระเงิน, ส่งรูปและรายงานเข้าระบบ · ดูข้อมูลทั่วไปได้ แต่แก้สั่งยาไม่ได้',
            tags: ['นัดหมาย', 'คิว / เคาน์เตอร์', 'อัปโหลดรูป', 'รายงานรายได้'],
            seatInfo: `ที่นั่งคง ${props.teamSeats.staff.remaining} · เหมาะกับ หน้าเคาน์เตอร์, พยาบาล`,
            seatColor: 'text-gray-500'
        },
        {
            role: 'Super Admin',
            subtitle: 'เจ้าของ / ผู้จัดการระบบ',
            badge: 'สิทธิ์เต็ม',
            badgeColor: 'bg-amber-100 text-amber-700',
            desc: 'เข้าถึงทุกอย่าง: ตั้งค่าระบบ, จัดการ user, ดูรายงานรายได้, ตั้งราคา, ผูก LINE / ปริ้นเตอร์ · ควรจำกัดให้น้อยที่สุด',
            tags: ['ทุกโมดูล', 'ตั้งค่าระบบ', 'การเงิน', 'Audit log'],
            seatInfo: `ที่นั่งคงเหลือ ${props.teamSeats.superAdmins.remaining} · ต้องใช้ 2FA เสมอ`,
            seatColor: 'text-amber-600'
        }
    ]

    const toast = useAppToast()

    const toggleItems = computed(() => [
        {
            key: 'sendInviteEmail' as keyof MemberFormData,
            label: 'ส่งอีเมลคำเชิญทันทีเมื่อบันทึก',
            desc: `ส่งลิงก์ตั้งรหัสผ่านไปที่ ${form.value.email || 'อีเมลที่ระบุ'} · หมดอายุใน 7 วัน`,
            icon: 'i-lucide-mail'
        },
        {
            key: 'require2FA' as keyof MemberFormData,
            label: 'บังคับใช้ 2-Factor Authentication',
            desc: 'สมาชิกต้องตั้ง 2FA ก่อนเข้าใช้งานครั้งแรก · แนะนำสำหรับ Super Admin และหมอ',
            icon: 'i-lucide-shield-check'
        },
        {
            key: 'allowExternalIP' as keyof MemberFormData,
            label: 'อนุญาตให้เข้าใช้งานนอก IP คลินิก',
            desc: 'ปิดไว้เพื่อความปลอดภัย · เปิดเฉพาะกรณีหมอต้อง Teleconsult จากนอกสถานที่',
            icon: 'i-lucide-wifi'
        }
    ])
</script>

<template>
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <!-- Section header -->
        <div class="flex items-start justify-between px-6 py-4 border-b border-gray-50">
            <div class="flex items-center gap-3">
                <span class="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-black">02</span>
                <div>
                    <h2 class="font-black text-gray-900 text-base">เพิ่มสมาชิกใหม่</h2>
                    <p class="text-[11px] text-gray-400 font-medium mt-0.5">ระบบจะส่งลิงก์ตั้งรหัสผ่านไปที่อีเมล · สมาชิกจะเข้าใช้งานได้หลังตอบรับคำเชิญ · หมดอายุใน 7 วัน</p>
                </div>
            </div>
            <span class="text-[11px] font-bold text-gray-400">ฟิลด์บังคับ 5 ช่อง</span>
        </div>

        <div class="p-6 space-y-7">
            <!-- Profile picture -->
            <div class="border border-dashed border-gray-200 rounded-2xl p-5 flex items-center gap-5">
                <div class="w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 font-black text-xl flex items-center justify-center shrink-0">
                    {{ form.title.slice(0, 1) || 'น' }}{{ form.firstName.slice(0, 1) || 'ว' }}
                </div>
                <div>
                    <p class="text-sm font-bold text-gray-700 mb-1">รูปโปรไฟล์</p>
                    <p class="text-[11px] text-gray-400 font-medium mb-3">PNG / JPG ขนาดไม่เกิน 4 MB · แนะนำสี่เหลี่ยมจัตุรัส 400×400 px</p>
                    <div class="flex items-center gap-2">
                        <button class="flex items-center gap-1.5 text-xs font-bold border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50 cursor-pointer transition-colors">
                            <UIcon name="i-lucide-upload" class="w-3.5 h-3.5" />
                            เลือกไฟล์
                        </button>
                        <button class="flex items-center gap-1.5 text-xs font-bold border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50 cursor-pointer transition-colors">
                            <UIcon name="i-lucide-camera" class="w-3.5 h-3.5" />
                            ถ่ายภาพ
                        </button>
                    </div>
                </div>
            </div>

            <!-- Name fields -->
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                    <label class="text-xs font-bold text-gray-600 block mb-1.5">คำนำหน้า <span class="text-red-400">*</span></label>
                    <select
                        :value="form.title"
                        class="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 bg-white font-medium"
                        @change="update('title', ($event.target as HTMLSelectElement).value)"
                    >
                        <option>นพ.</option>
                        <option>พญ.</option>
                        <option>นาย</option>
                        <option>นาง</option>
                        <option>น.ส.</option>
                    </select>
                </div>
                <div>
                    <label class="text-xs font-bold text-gray-600 block mb-1.5">ชื่อจริง <span class="text-red-400">*</span></label>
                    <input
                        :value="form.firstName"
                        type="text"
                        placeholder="กฤษฎา"
                        class="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 font-medium"
                        @input="update('firstName', ($event.target as HTMLInputElement).value)"
                    />
                </div>
                <div>
                    <label class="text-xs font-bold text-gray-600 block mb-1.5">นามสกุล <span class="text-red-400">*</span></label>
                    <input
                        :value="form.lastName"
                        type="text"
                        placeholder="ผองเพ็ญ"
                        class="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 font-medium"
                        @input="update('lastName', ($event.target as HTMLInputElement).value)"
                    />
                </div>
                <div>
                    <label class="text-xs font-bold text-gray-600 block mb-1.5">ชื่อเล่น <span class="text-gray-400 font-normal">(ไม่บังคับ)</span></label>
                    <input
                        :value="form.nickname"
                        type="text"
                        placeholder="หมอกฤษ"
                        class="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 font-medium"
                        @input="update('nickname', ($event.target as HTMLInputElement).value)"
                    />
                </div>
            </div>

            <!-- Contact fields -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div>
                    <label class="text-xs font-bold text-gray-600 block mb-1.5">อีเมล <span class="text-red-400">*</span></label>
                    <div class="relative">
                        <UIcon name="i-lucide-mail" class="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                        <input
                            :value="form.email"
                            type="email"
                            placeholder="krit.p@avaclinic.co.th"
                            class="w-full border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 font-medium"
                            @input="update('email', ($event.target as HTMLInputElement).value)"
                        />
                    </div>
                    <p v-if="form.email && form.email.includes('@avaclinic')" class="text-[10px] text-emerald-600 font-bold mt-1 flex items-center gap-1">
                        <UIcon name="i-lucide-check-circle" class="w-3 h-3" />
                        โดเมนคลินิกตรวจสอบแล้ว · จะใช้เป็น username เข้าระบบ
                    </p>
                </div>
                <div>
                    <label class="text-xs font-bold text-gray-600 block mb-1.5">เบอร์โทร <span class="text-red-400">*</span></label>
                    <div class="relative">
                        <UIcon name="i-lucide-phone" class="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                        <input
                            :value="form.phone"
                            type="tel"
                            placeholder="081-489-2207"
                            class="w-full border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 font-medium"
                            @input="update('phone', ($event.target as HTMLInputElement).value)"
                        />
                    </div>
                </div>
                <div>
                    <label class="text-xs font-bold text-gray-600 block mb-1.5">
                        เลขใบประกอบฯ
                        <span class="text-gray-400 font-normal">(เฉพาะหมอ)</span>
                    </label>
                    <input
                        :value="form.licenseNumber"
                        type="text"
                        placeholder="ว.42091"
                        :disabled="form.role !== 'หมอ'"
                        class="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 font-medium disabled:bg-gray-50 disabled:text-gray-400"
                        @input="update('licenseNumber', ($event.target as HTMLInputElement).value)"
                    />
                </div>
            </div>

            <!-- Role selection -->
            <div>
                <div class="flex items-center justify-between mb-3">
                    <label class="text-xs font-bold text-gray-600">เลือก Role <span class="text-red-400">*</span></label>
                    <button class="text-xs font-bold text-indigo-600 hover:underline cursor-pointer">เทียบสิทธิ์ทั้งหมด →</button>
                </div>
                <p class="text-[11px] text-gray-400 font-medium mb-4">กำหนดได้ 1 role หลัก · ภายในแต่ละ role จะ tune permission แยกได้ในส่วนที่ 03</p>

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-3">
                    <button
                        v-for="card in roleCards"
                        :key="card.role"
                        type="button"
                        class="border rounded-2xl p-4 text-left transition-all cursor-pointer"
                        :class="form.role === card.role
                            ? 'border-2 border-indigo-600 bg-white shadow-lg shadow-indigo-100/50'
                            : 'border-gray-100 bg-gray-50/50 hover:bg-white hover:border-gray-200'"
                        @click="update('role', card.role)"
                    >
                        <div class="flex items-start justify-between mb-2">
                            <div>
                                <p class="font-black text-gray-900 text-sm">{{ card.role }}</p>
                                <p class="text-[10px] text-gray-500 font-medium mt-0.5">{{ card.subtitle }}</p>
                            </div>
                            <div class="flex items-center gap-2">
                                <span v-if="card.badge" class="text-[9px] font-black px-2 py-0.5 rounded-md" :class="card.badgeColor">
                                    {{ card.badge }}
                                </span>
                                <div
                                    class="w-4 h-4 rounded-full border-2 flex items-center justify-center"
                                    :class="form.role === card.role ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300'"
                                >
                                    <div v-if="form.role === card.role" class="w-2 h-2 rounded-full bg-white"></div>
                                </div>
                            </div>
                        </div>
                        <p class="text-[10px] text-gray-500 font-medium mb-3 leading-relaxed">{{ card.desc }}</p>
                        <div class="flex flex-wrap gap-1 mb-3">
                            <span
                                v-for="tag in card.tags"
                                :key="tag"
                                class="text-[9px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-md"
                            >
                                ✓ {{ tag }}
                            </span>
                        </div>
                        <p class="text-[10px] font-bold" :class="card.seatColor">{{ card.seatInfo }}</p>
                    </button>
                </div>
            </div>

            <!-- Branch selection -->
            <div>
                <label class="text-xs font-bold text-gray-600 block mb-3">สาขาที่เข้าถึงได้ <span class="text-red-400">*</span> <span class="text-gray-400 font-normal">(เลือกได้หลายสาขา)</span></label>
                <div class="flex flex-wrap gap-2">
                    <button
                        v-for="branch in allBranches"
                        :key="branch"
                        type="button"
                        class="text-xs font-bold px-3 py-1.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5"
                        :class="form.branches.includes(branch)
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'"
                        @click="toggleBranch(branch)"
                    >
                        <UIcon v-if="form.branches.includes(branch)" name="i-lucide-check" class="w-3 h-3" />
                        {{ branch }}
                    </button>
                    <button
                        type="button"
                        class="text-xs font-bold px-3 py-1.5 rounded-xl border border-dashed border-gray-300 text-gray-500 hover:border-indigo-400 hover:text-indigo-600 cursor-pointer transition-colors"
                        @click="toast.info('เพิ่มสาขา', 'กำลังเปิดตัวจัดการสาขา...')"
                    >
                        + เพิ่มสาขา
                    </button>
                </div>
            </div>

            <!-- Work schedule -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                    <label class="text-xs font-bold text-gray-600 block mb-3">วันทำงาน</label>
                    <div class="flex items-center gap-2">
                        <button
                            v-for="day in workDayOptions"
                            :key="day"
                            type="button"
                            class="w-9 h-9 rounded-xl text-xs font-black transition-all cursor-pointer"
                            :class="form.workDays.includes(day)
                                ? 'bg-indigo-600 text-white shadow-sm'
                                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'"
                            @click="toggleDay(day)"
                        >
                            {{ day }}
                        </button>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="text-xs font-bold text-gray-600 block mb-1.5">เริ่มงาน</label>
                        <input
                            :value="form.startTime"
                            type="time"
                            class="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 font-medium"
                            @input="update('startTime', ($event.target as HTMLInputElement).value)"
                        />
                    </div>
                    <div>
                        <label class="text-xs font-bold text-gray-600 block mb-1.5">เลิกงาน</label>
                        <input
                            :value="form.endTime"
                            type="time"
                            class="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 font-medium"
                            @input="update('endTime', ($event.target as HTMLInputElement).value)"
                        />
                    </div>
                </div>
            </div>

            <!-- Security toggles -->
            <div class="space-y-2 pt-2">
                <div
                    v-for="toggle in toggleItems"
                    :key="toggle.key"
                    class="flex items-center justify-between gap-4 px-4 py-3.5 rounded-xl border transition-all duration-150 cursor-pointer"
                    :class="form[toggle.key]
                        ? 'border-indigo-100 bg-indigo-50/50'
                        : 'border-gray-100 bg-gray-50/40 hover:bg-gray-50'"
                    @click="update(toggle.key, !form[toggle.key])"
                >
                    <div class="flex items-start gap-3 min-w-0">
                        <div
                            class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors"
                            :class="form[toggle.key] ? 'bg-indigo-100' : 'bg-white border border-gray-100'"
                        >
                            <UIcon
                                :name="toggle.icon"
                                class="w-4 h-4 transition-colors"
                                :class="form[toggle.key] ? 'text-indigo-600' : 'text-gray-400'"
                            />
                        </div>
                        <div class="min-w-0">
                            <p class="text-sm font-bold text-gray-800">{{ toggle.label }}</p>
                            <p class="text-[11px] text-gray-400 font-medium mt-0.5 leading-relaxed">{{ toggle.desc }}</p>
                        </div>
                    </div>
                    <button
                        type="button"
                        class="relative w-12 h-6 rounded-full transition-all duration-200 cursor-pointer shrink-0 focus:outline-none"
                        :class="form[toggle.key] ? 'bg-indigo-600 shadow-sm shadow-indigo-200' : 'bg-gray-200'"
                        @click.stop="update(toggle.key, !form[toggle.key])"
                    >
                        <span
                            class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200"
                            :class="form[toggle.key] ? 'translate-x-6' : 'translate-x-0'"
                        ></span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
