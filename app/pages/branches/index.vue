<script setup lang="ts">
    import type { BranchItem, BranchesData } from '~/client/branches'
    import { useAppToast } from '~/composables/useAppToast'

    definePageMeta({
        layout: 'main',
        middleware: ['auth']
    })

    const { data: resp, pending } = useFetch<{ status: string; data: BranchesData }>('/api/branches')

    const selectedBranchId = ref(1)

    const branches = computed(() => resp.value?.data?.branches ?? [])
    const team = computed(() => resp.value?.data?.team ?? [])
    const queue = computed(() => resp.value?.data?.queue ?? [])
    const selected = computed<BranchItem | undefined>(() => branches.value.find((b) => b.id === selectedBranchId.value))

    // Section 02 form state
    const form = reactive({
        prefix: 'นางสาว',
        firstName: 'ชนิกานต์',
        lastName: 'กูริกัต',
        nickname: 'เนย',
        email: 'chanikan.p@avaclinic.co.th',
        phone: '089-441-7728',
        employeeId: 'LOEI-S-0042',
        role: 'staff' as 'doctor' | 'staff' | 'admin',
        branchAccess: [1] as number[],
        position: 'พยาบาลวิชาชีพ',
        shift: 'กะเช้า (09:00-18:00)',
        startDate: '2026-06-01',
        permissions: {
            uploadPhotos: true,
            forwardToDoctor: true,
            viewOtherCases: false,
            exportPhotos: false,
            watermark: true
        }
    })

    const teamFilter = ref<'all' | 'doctor' | 'staff' | 'active'>('all')

    const filteredTeam = computed(() => {
        if (teamFilter.value === 'all') return team.value
        if (teamFilter.value === 'doctor') return team.value.filter((m) => m.role === 'doctor')
        if (teamFilter.value === 'staff') return team.value.filter((m) => m.role === 'staff')
        if (teamFilter.value === 'active') return team.value.filter((m) => m.status === 'uploading' || m.status === 'checking' || m.status === 'online')
        return team.value
    })

    const statusLabel = (status: string) => {
        const map: Record<string, string> = {
            uploading: 'กำลังส่งรูป',
            checking: 'กำลังตรวจ',
            online: 'ออนไลน์',
            offline: 'ออฟไลน์',
            break: 'พักเที่ยง',
            'pending-invite': 'รอตอบรับเชิญ'
        }
        return map[status] ?? status
    }

    const statusDotClass = (status: string) => {
        const map: Record<string, string> = {
            uploading: 'bg-green-500',
            checking: 'bg-green-500',
            online: 'bg-green-500',
            offline: 'bg-gray-300',
            break: 'bg-amber-400',
            'pending-invite': 'bg-amber-400'
        }
        return map[status] ?? 'bg-gray-300'
    }

    const uploadProgressColor = (pct: number) => {
        if (pct === 100) return 'bg-emerald-500'
        if (pct >= 60) return 'bg-indigo-500'
        return 'bg-indigo-400'
    }

    const showAddForm = ref(false)

    const openAddForm = () => {
        form.branchAccess = [selectedBranchId.value]
        showAddForm.value = true
    }

    const closeAddForm = () => {
        showAddForm.value = false
    }

    const toggleBranchAccess = (id: number) => {
        const idx = form.branchAccess.indexOf(id)
        if (idx >= 0) {
            if (form.branchAccess.length > 1) form.branchAccess.splice(idx, 1)
        } else {
            form.branchAccess.push(id)
        }
    }

    const toast = useAppToast()

    const handleCancel = () => {
        form.firstName = ''
        form.lastName = ''
        form.email = ''
        form.phone = ''
        form.branchAccess = [selectedBranchId.value]
        closeAddForm()
    }

    const handleSaveDraft = () => {
        toast.success('บันทึกแบบร่างแล้ว', `ข้อมูลของ ${form.firstName} ${form.lastName} ถูกบันทึกไว้`)
    }

    const handleSubmit = () => {
        if (!form.firstName || !form.email) {
            toast.error('กรุณากรอกข้อมูลให้ครบ', 'ชื่อและอีเมลจำเป็นต้องกรอก')
            return
        }
        toast.success(
            'ส่งคำเชิญสำเร็จ!',
            `ผูก ${form.firstName} ${form.lastName} เข้า ${selected.value?.name ?? ''} แล้ว · รอการตอบรับทาง ${form.email}`
        )
    }
</script>

<template>
    <div class="max-w-7xl mx-auto px-6 lg:px-8 py-6 pb-8">
        <!-- Loading overlay -->
        <div
            v-if="pending"
            class="fixed inset-0 bg-white/60 backdrop-blur-sm z-50 flex items-center justify-center"
        >
            <UIcon name="i-heroicons-arrow-path" class="w-10 h-10 text-indigo-600 animate-spin" />
        </div>

        <div v-if="resp?.data">
            <!-- ── Header banner ── -->
            <div class="rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 p-6 mb-6 flex items-center justify-between shadow-lg">
                <div class="flex items-center gap-4">
                    <div class="w-14 h-14 rounded-xl bg-white/15 flex items-center justify-center">
                        <UIcon name="i-lucide-map-pin" class="w-7 h-7 text-white" />
                    </div>
                    <div>
                        <h1 class="text-2xl font-black text-white">จุดบริการ — {{ branches.length }} สาขา</h1>
                        <p class="text-sm text-white/70 mt-0.5">
                            เลือกสาขาเพื่อจัดการทีมงาน · ดูตำแหน่งบนแผนที่ · กำหนดสิทธิ์ใครส่งรูป ใครรับรูป · เห็นคิวรูปก่อน-หลังที่กำลังอัปโหลดสด ๆ
                        </p>
                    </div>
                </div>
                <div class="flex items-center gap-2 shrink-0">
                    <button class="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/30 text-white text-sm font-semibold hover:bg-white/10 transition-colors cursor-pointer">
                        <UIcon name="i-lucide-globe" class="w-4 h-4" />
                        ดูแผนที่รวม
                    </button>
                    <button
                        v-if="!showAddForm"
                        class="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-indigo-700 text-sm font-bold hover:bg-white/90 transition-colors cursor-pointer"
                        @click="openAddForm"
                    >
                        <UIcon name="i-lucide-plus" class="w-4 h-4" />
                        เพิ่มสมาชิก
                    </button>
                    <button
                        v-else
                        class="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/20 text-white text-sm font-semibold hover:bg-white/30 transition-colors cursor-pointer border border-white/40"
                        @click="closeAddForm"
                    >
                        <UIcon name="i-lucide-x" class="w-4 h-4" />
                        ยกเลิก
                    </button>
                </div>
            </div>

            <!-- ── Branch selector cards ── -->
            <div class="grid grid-cols-3 gap-4 mb-6">
                <button
                    v-for="branch in branches"
                    :key="branch.id"
                    class="relative bg-white rounded-2xl border-2 p-4 text-left transition-all cursor-pointer"
                    :class="selectedBranchId === branch.id
                        ? 'border-indigo-500 shadow-md shadow-indigo-100'
                        : 'border-gray-100 hover:border-gray-200 shadow-sm'"
                    @click="selectedBranchId = branch.id"
                >
                    <!-- Selected checkmark -->
                    <div
                        v-if="selectedBranchId === branch.id"
                        class="absolute top-3 right-3 w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center"
                    >
                        <UIcon name="i-lucide-check" class="w-3 h-3 text-white" />
                    </div>
                    <!-- Status dot -->
                    <div
                        v-else
                        class="absolute top-3.5 right-3.5 w-2.5 h-2.5 rounded-full"
                        :class="branch.isPending ? 'bg-amber-400' : 'bg-green-500'"
                    />

                    <div class="flex items-center gap-3 mb-3">
                        <div
                            class="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-black shrink-0"
                            :class="branch.colorClass"
                        >
                            <UIcon name="i-lucide-map-pin" class="w-5 h-5" />
                        </div>
                        <div>
                            <p class="font-black text-gray-900 text-sm">{{ branch.name }}</p>
                            <p class="text-[11px] text-gray-400 font-medium">
                                {{ branch.district }} · เปิดปี {{ branch.yearOpen }} · <span class="text-gray-500">{{ branch.tagLabel }}</span>
                            </p>
                        </div>
                    </div>
                    <div class="grid grid-cols-3 gap-2">
                        <div>
                            <p class="text-lg font-black text-gray-900">{{ branch.teamCount }}</p>
                            <p class="text-[10px] text-gray-400 font-medium">ทีมงาน</p>
                        </div>
                        <div>
                            <p class="text-lg font-black text-gray-900">{{ branch.queueToday }}</p>
                            <p class="text-[10px] text-gray-400 font-medium">คิววันนี้</p>
                        </div>
                        <div>
                            <p class="text-lg font-black text-gray-900">{{ branch.photoThisMonth }}</p>
                            <p class="text-[10px] text-gray-400 font-medium">รูปเดือนนี้</p>
                        </div>
                    </div>
                </button>
            </div>

            <!-- ── Main two-column layout ── -->
            <div v-if="selected" class="grid grid-cols-[1fr_340px] gap-6 items-start">
                <!-- ════ Left column: sections ════ -->
                <div class="space-y-5">
                    <!-- ─ Section 01: Branch detail ─ -->
                    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <!-- Section header -->
                        <div class="flex items-start justify-between px-6 pt-5 pb-4 border-b border-gray-50">
                            <div class="flex items-start gap-3">
                                <span class="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">01</span>
                                <div>
                                    <h2 class="font-black text-gray-900 text-base">{{ selected.fullTitle }}</h2>
                                    <p class="text-[11px] text-gray-400 font-medium mt-0.5">{{ selected.address }} · เปิดบริการตั้งแต่ {{ selected.yearOpen }}</p>
                                </div>
                            </div>
                            <div class="text-right shrink-0 ml-4">
                                <p class="text-xs font-bold text-gray-700">พิกัด {{ selected.coordinates.lat }}, {{ selected.coordinates.lng }}</p>
                                <p class="text-[10px] text-gray-400 mt-0.5">ตรวจสอบล่าสุด 2 ชม. ที่แล้ว</p>
                            </div>
                        </div>

                        <!-- Map placeholder -->
                        <div class="mx-6 mt-5 rounded-xl overflow-hidden relative h-52 bg-slate-100">
                            <!-- Map grid lines -->
                            <div class="absolute inset-0 opacity-20" style="background-image: linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px); background-size: 40px 40px;" />
                            <div class="absolute inset-0 bg-gradient-to-br from-slate-200 via-blue-50/60 to-green-50/40" />
                            <!-- Fake road 1 -->
                            <div class="absolute top-1/2 left-0 right-0 h-3 bg-white/80 -translate-y-1/2 shadow-sm" />
                            <!-- Fake road 2 -->
                            <div class="absolute left-1/2 top-0 bottom-0 w-2.5 bg-white/80 -translate-x-1/2 shadow-sm" />
                            <!-- Green area -->
                            <div class="absolute top-6 left-8 w-28 h-20 rounded-xl bg-green-200/70" />
                            <div class="absolute bottom-10 right-12 w-20 h-14 rounded-lg bg-green-200/50" />
                            <!-- Building blocks -->
                            <div class="absolute top-4 right-8 w-16 h-12 rounded-lg bg-slate-300/60" />
                            <div class="absolute bottom-8 left-16 w-12 h-10 rounded-md bg-slate-300/50" />
                            <!-- Map label -->
                            <div class="absolute top-3 left-3 bg-white rounded-lg px-2.5 py-1.5 shadow-sm flex items-center gap-1.5">
                                <div class="w-5 h-5 rounded-md flex items-center justify-center" :class="selected.colorClass">
                                    <UIcon name="i-lucide-map-pin" class="w-3 h-3 text-white" />
                                </div>
                                <span class="text-[11px] font-bold text-gray-700">AVACLINIC {{ selected.name }} · 88/3 ถ.เจริญรัฐ</span>
                            </div>
                            <!-- Pin marker -->
                            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full flex flex-col items-center">
                                <div class="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center shadow-lg border-2 border-white">
                                    <span class="text-white font-black text-sm">A</span>
                                </div>
                                <div class="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-indigo-600" />
                            </div>
                            <!-- Info popup -->
                            <div class="absolute top-1/2 left-1/2 translate-x-4 -translate-y-12 bg-white rounded-xl shadow-lg p-3 w-44 text-left">
                                <p class="font-black text-gray-900 text-xs">AVACLINIC · สาขาเลย</p>
                                <p class="text-[10px] text-gray-500 mt-0.5">88/3 ถ.เจริญรัฐ ต.กุดป่อง</p>
                                <p class="text-[10px] text-gray-500">อ.เมืองเลย จ.เลย 42000</p>
                                <div class="flex items-center gap-1 mt-1.5">
                                    <span class="w-1.5 h-1.5 rounded-full bg-green-500" />
                                    <span class="text-[10px] font-semibold text-green-600">เปิดทำการอยู่ · ปิด 20:00</span>
                                </div>
                            </div>
                            <!-- Map style toggle -->
                            <div class="absolute bottom-3 left-3 flex gap-1.5">
                                <button class="bg-gray-800 text-white text-[11px] font-bold px-3 py-1 rounded-lg">ถนน</button>
                                <button class="bg-white text-gray-600 text-[11px] font-semibold px-3 py-1 rounded-lg shadow-sm">ดาวเทียม</button>
                            </div>
                            <!-- Zoom controls -->
                            <div class="absolute bottom-3 right-3 flex flex-col gap-1">
                                <button class="w-7 h-7 bg-white rounded-lg shadow-sm flex items-center justify-center text-gray-600 hover:bg-gray-50">
                                    <UIcon name="i-lucide-plus" class="w-3.5 h-3.5" />
                                </button>
                                <button class="w-7 h-7 bg-white rounded-lg shadow-sm flex items-center justify-center text-gray-600 hover:bg-gray-50">
                                    <UIcon name="i-lucide-minus" class="w-3.5 h-3.5" />
                                </button>
                                <button class="w-7 h-7 bg-white rounded-lg shadow-sm flex items-center justify-center text-gray-600 hover:bg-gray-50">
                                    <UIcon name="i-lucide-crosshair" class="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>

                        <!-- Facility cards -->
                        <div v-if="selected.facilities" class="grid grid-cols-4 gap-3 px-6 py-5">
                            <div class="bg-slate-50 rounded-xl p-3">
                                <p class="text-2xl font-black text-gray-900">{{ selected.facilities.examRooms.count }}</p>
                                <p class="text-xs font-bold text-gray-600 mt-0.5">ห้องตรวจ</p>
                                <p class="text-[10px] text-gray-400 mt-1 leading-tight">{{ selected.facilities.examRooms.detail }}</p>
                            </div>
                            <div class="bg-slate-50 rounded-xl p-3">
                                <p class="text-2xl font-black text-gray-900">{{ selected.facilities.waitingSeats.count }}</p>
                                <p class="text-xs font-bold text-gray-600 mt-0.5">เก้าอี้รับรอง</p>
                                <p class="text-[10px] text-gray-400 mt-1 leading-tight">{{ selected.facilities.waitingSeats.detail }}</p>
                            </div>
                            <div class="bg-slate-50 rounded-xl p-3">
                                <p class="text-2xl font-black text-gray-900">{{ selected.facilities.parking.count }}</p>
                                <p class="text-xs font-bold text-gray-600 mt-0.5">ที่จอดรถ</p>
                                <p class="text-[10px] text-gray-400 mt-1 leading-tight">{{ selected.facilities.parking.detail }}</p>
                            </div>
                            <div class="bg-slate-50 rounded-xl p-3">
                                <p class="text-sm font-black text-gray-900 leading-tight">{{ selected.facilities.manager.name }}</p>
                                <p class="text-xs font-bold text-gray-600 mt-0.5">ผู้จัดการสาขา</p>
                                <p class="text-[10px] text-gray-400 mt-1">มือถือ {{ selected.facilities.manager.phone }}</p>
                                <p class="text-[10px] text-gray-400">LINE {{ selected.facilities.manager.line }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- ─ Section 02: Add member ─ -->
                    <div v-if="showAddForm" class="bg-white rounded-2xl border border-indigo-200 shadow-sm shadow-indigo-50 overflow-hidden">
                        <div class="flex items-start justify-between px-6 pt-5 pb-4 border-b border-gray-50">
                            <div class="flex items-start gap-3">
                                <span class="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">02</span>
                                <div>
                                    <h2 class="font-black text-gray-900 text-base">เพิ่มสมาชิกประจำสาขา</h2>
                                    <p class="text-[11px] text-gray-400 font-medium mt-0.5">ฟอร์มจะ pre-fill ให้ผูกกับ <strong class="text-gray-600">{{ selected.name }}</strong> โดยอัตโนมัติ · เลือกสาขาอื่นเพิ่มได้ถ้าสมาชิกต้องวิ่งหลายสาขา</p>
                                </div>
                            </div>
                            <span class="text-xs font-bold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-lg shrink-0">ที่นั่งคงเหลือ 3 ที่</span>
                        </div>

                        <div class="px-6 py-5 space-y-5">
                            <!-- Name row -->
                            <div class="grid grid-cols-[auto_1fr_1fr_1fr] gap-3">
                                <div>
                                    <label class="text-xs font-bold text-gray-600 mb-1 block">คำนำหน้า <span class="text-red-500">*</span></label>
                                    <select v-model="form.prefix" class="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400">
                                        <option>นาย</option>
                                        <option>นางสาว</option>
                                        <option>นาง</option>
                                        <option>นพ.</option>
                                        <option>พญ.</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="text-xs font-bold text-gray-600 mb-1 block">ชื่อจริง <span class="text-red-500">*</span></label>
                                    <input v-model="form.firstName" type="text" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400" />
                                </div>
                                <div>
                                    <label class="text-xs font-bold text-gray-600 mb-1 block">นามสกุล <span class="text-red-500">*</span></label>
                                    <input v-model="form.lastName" type="text" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400" />
                                </div>
                                <div>
                                    <label class="text-xs font-bold text-gray-600 mb-1 block">ชื่อเล่น <span class="text-[10px] text-gray-400">(ไม่บังคับ)</span></label>
                                    <input v-model="form.nickname" type="text" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400" />
                                </div>
                            </div>

                            <!-- Contact row -->
                            <div class="grid grid-cols-[1fr_1fr_auto] gap-3">
                                <div>
                                    <label class="text-xs font-bold text-gray-600 mb-1 block">อีเมล <span class="text-red-500">*</span></label>
                                    <div class="relative">
                                        <UIcon name="i-lucide-mail" class="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                                        <input v-model="form.email" type="email" class="w-full border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400" />
                                    </div>
                                    <p class="text-[10px] text-green-600 font-medium mt-1 flex items-center gap-1">
                                        <UIcon name="i-lucide-check" class="w-3 h-3" /> โดเมนคลินิกตรวจสอบแล้ว
                                    </p>
                                </div>
                                <div>
                                    <label class="text-xs font-bold text-gray-600 mb-1 block">เบอร์โทร <span class="text-red-500">*</span></label>
                                    <div class="relative">
                                        <UIcon name="i-lucide-phone" class="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                                        <input v-model="form.phone" type="tel" class="w-full border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400" />
                                    </div>
                                </div>
                                <div>
                                    <label class="text-xs font-bold text-gray-600 mb-1 block">รหัสพนักงาน <span class="text-[10px] text-gray-400">(สร้างอัตโนมัติ)</span></label>
                                    <input :value="form.employeeId" readonly type="text" class="w-full border border-gray-100 rounded-lg px-3 py-2 text-sm text-gray-500 bg-gray-50 cursor-default" />
                                </div>
                            </div>

                            <!-- Role selector -->
                            <div>
                                <label class="text-xs font-bold text-gray-600 mb-2 block">Role <span class="text-red-500">*</span></label>
                                <div class="flex items-center gap-2">
                                    <button
                                        v-for="r in [{ value: 'doctor', label: 'หมอ (Doctor)' }, { value: 'staff', label: 'พนักงาน (Staff)' }, { value: 'admin', label: 'Super Admin' }]"
                                        :key="r.value"
                                        class="flex items-center gap-2 px-3.5 py-2 rounded-xl border text-sm font-semibold transition-all cursor-pointer"
                                        :class="form.role === r.value
                                            ? 'border-green-500 bg-green-500 text-white shadow-sm'
                                            : 'border-gray-200 text-gray-600 hover:border-gray-300'"
                                        @click="form.role = r.value as 'doctor' | 'staff' | 'admin'"
                                    >
                                        <span
                                            class="w-2 h-2 rounded-full"
                                            :class="form.role === r.value ? 'bg-white' : 'bg-gray-300'"
                                        />
                                        {{ r.label }}
                                    </button>
                                    <span class="text-[11px] text-gray-400 ml-1">— กำหนดสิทธิ์และเอียดได้ที่ <a href="#" class="text-indigo-500 underline">ตั้งค่า → ทีมงาน & สิทธิ์</a></span>
                                </div>
                            </div>

                            <!-- Branch access -->
                            <div>
                                <label class="text-xs font-bold text-gray-600 mb-2 block">สาขาที่เข้าถึงได้ <span class="text-red-500">*</span></label>
                                <div class="flex gap-3">
                                    <button
                                        v-for="branch in branches"
                                        :key="branch.id"
                                        class="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all cursor-pointer"
                                        :class="form.branchAccess.includes(branch.id)
                                            ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                                            : 'border-gray-200 text-gray-600 hover:border-gray-300'"
                                        @click="toggleBranchAccess(branch.id)"
                                    >
                                        <div class="w-6 h-6 rounded-lg flex items-center justify-center text-white text-[10px] font-black shrink-0" :class="branch.colorClass">
                                            {{ branch.shortCode }}
                                        </div>
                                        <div class="text-left">
                                            <p class="text-xs font-bold">{{ branch.name }}</p>
                                            <p class="text-[10px] font-medium text-gray-400">
                                                {{ form.branchAccess.includes(branch.id) && branch.id === selectedBranchId ? 'ประจำที่นี่' : branch.id === 2 ? 'เสริมกำลังเสาร์-อาทิตย์' : 'เสริมตามตาราง' }}
                                            </p>
                                        </div>
                                        <div
                                            v-if="form.branchAccess.includes(branch.id)"
                                            class="w-5 h-5 rounded-md bg-indigo-500 flex items-center justify-center ml-1"
                                        >
                                            <UIcon name="i-lucide-check" class="w-3 h-3 text-white" />
                                        </div>
                                        <div v-else class="w-5 h-5 rounded-md border-2 border-gray-200 ml-1" />
                                    </button>
                                </div>
                            </div>

                            <!-- Position & Schedule -->
                            <div>
                                <label class="text-xs font-bold text-gray-600 mb-2 block">ตำแหน่ง & ตารางงาน</label>
                                <div class="grid grid-cols-3 gap-3">
                                    <div>
                                        <label class="text-[11px] text-gray-400 font-medium mb-1 block">ตำแหน่ง</label>
                                        <select v-model="form.position" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400">
                                            <option>พยาบาลวิชาชีพ</option>
                                            <option>แพทย์ทั่วไป</option>
                                            <option>ช่างภาพ / คอนเทนต์</option>
                                            <option>พนักงานต้อนรับ</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label class="text-[11px] text-gray-400 font-medium mb-1 block">กะ</label>
                                        <select v-model="form.shift" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400">
                                            <option>กะเช้า (09:00-18:00)</option>
                                            <option>กะบ่าย (13:00-22:00)</option>
                                            <option>กะดึก (18:00-02:00)</option>
                                            <option>Full Day</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label class="text-[11px] text-gray-400 font-medium mb-1 block">เริ่มงาน</label>
                                        <input v-model="form.startDate" type="date" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400" />
                                    </div>
                                </div>
                            </div>

                            <!-- Photo permissions -->
                            <div>
                                <p class="text-xs font-bold text-gray-600 mb-1">สิทธิ์เรื่องรูปก่อน-หลัง</p>
                                <p class="text-[11px] text-gray-400 mb-3">เลือกได้ว่าสมาชิกคนนี้ทำอะไรกับรูปได้บ้างในสาขาที่ผูก</p>
                                <div class="space-y-3">
                                    <div
                                        v-for="perm in [
                                            { key: 'uploadPhotos', label: 'อัปโหลดรูปก่อน-หลังเข้าระบบ', desc: 'ใช้แอป AVACLINIC Capture หรืออัปจากเว็บ · ติดแท็กเคสอัตโนมัติ' },
                                            { key: 'forwardToDoctor', label: 'ส่งรูปต่อให้หมอที่ดูแลเคส', desc: 'ระบบจะส่ง notification เข้า LINE ของหมอภายใน 30 วินาที' },
                                            { key: 'viewOtherCases', label: 'ดูรูปของเคสคนอื่นในสาขาเดียวกัน', desc: 'เปิดเฉพาะหัวหน้าทีม / ผู้ฝึกสอน · ปิดไว้เป็นค่าเริ่มต้น' },
                                            { key: 'exportPhotos', label: 'ดาวน์โหลด / ส่งออกรูปออกนอกระบบ', desc: 'ต้องขออนุมัติจาก Super Admin เป็นรายครั้ง · เก็บ log ไว้ใน Audit' },
                                            { key: 'watermark', label: 'บังคับใส่ลายน้ำ (watermark) อัตโนมัติ', desc: 'โลโก้คลินิก + รหัสเคส · ตามนโยบาย PDPA' }
                                        ]"
                                        :key="perm.key"
                                        class="flex items-center justify-between"
                                    >
                                        <div>
                                            <p class="text-sm font-semibold text-gray-800">{{ perm.label }}</p>
                                            <p class="text-[11px] text-gray-400">{{ perm.desc }}</p>
                                        </div>
                                        <button
                                            class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus:outline-none ml-4"
                                            :class="form.permissions[perm.key as keyof typeof form.permissions] ? 'bg-indigo-600' : 'bg-gray-200'"
                                            @click="form.permissions[perm.key as keyof typeof form.permissions] = !form.permissions[perm.key as keyof typeof form.permissions]"
                                        >
                                            <span
                                                class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-transform"
                                                :class="form.permissions[perm.key as keyof typeof form.permissions] ? 'translate-x-5' : 'translate-x-0'"
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- ─ Section 03: Team ─ -->
                    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div class="flex items-start justify-between px-6 pt-5 pb-4 border-b border-gray-50">
                            <div class="flex items-start gap-3">
                                <span class="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">03</span>
                                <div>
                                    <h2 class="font-black text-gray-900 text-base">ทีมประจำ{{ selected.name }}</h2>
                                    <p class="text-[11px] text-gray-400 font-medium mt-0.5">{{ selected.teamCount }} คน · เรียงตามจำนวนรูปที่ส่งเข้าระบบ 30 วันล่าสุด · คลิกชื่อเพื่อจัดการสิทธิ์</p>
                                </div>
                            </div>
                            <span class="text-xs font-medium text-gray-400 shrink-0">แสดง 1–{{ filteredTeam.length }} จาก {{ selected.teamCount }}</span>
                        </div>

                        <!-- Filter tabs -->
                        <div class="flex items-center gap-2 px-6 py-3 border-b border-gray-50">
                            <div class="relative flex-1 max-w-xs">
                                <UIcon name="i-lucide-search" class="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                                <input type="text" placeholder="ค้นหาชื่อสมาชิก, ตำแหน่ง..." class="w-full border border-gray-200 rounded-xl pl-8 pr-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400" />
                            </div>
                            <button
                                v-for="f in [{ value: 'all', label: 'ทุก role' }, { value: 'doctor', label: 'หมอ' }, { value: 'staff', label: 'พนักงาน' }]"
                                :key="f.value"
                                class="px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                                :class="teamFilter === f.value ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
                                @click="teamFilter = f.value as 'all' | 'doctor' | 'staff' | 'active'"
                            >
                                {{ f.label }}
                            </button>
                            <button
                                class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                                :class="teamFilter === 'active' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
                                @click="teamFilter = 'active'"
                            >
                                <span class="w-1.5 h-1.5 rounded-full bg-green-500" />
                                ส่งรูปอยู่ตอนนี้
                            </button>
                        </div>

                        <!-- Team table -->
                        <div class="overflow-x-auto">
                            <table class="w-full">
                                <thead>
                                    <tr class="border-b border-gray-50">
                                        <th class="text-left px-6 py-2.5 text-[10px] font-bold text-gray-400 uppercase tracking-wide">สมาชิก</th>
                                        <th class="text-left px-3 py-2.5 text-[10px] font-bold text-gray-400 uppercase tracking-wide">ROLE / ตำแหน่ง</th>
                                        <th class="text-left px-3 py-2.5 text-[10px] font-bold text-gray-400 uppercase tracking-wide">รูปที่ส่ง 30 วัน</th>
                                        <th class="text-left px-3 py-2.5 text-[10px] font-bold text-gray-400 uppercase tracking-wide">เคสที่ดูแล</th>
                                        <th class="text-left px-3 py-2.5 text-[10px] font-bold text-gray-400 uppercase tracking-wide">สถานะ</th>
                                        <th class="px-3 py-2.5 text-[10px] font-bold text-gray-400 uppercase tracking-wide">การจัดการ</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-50">
                                    <tr
                                        v-for="member in filteredTeam"
                                        :key="member.id"
                                        class="hover:bg-gray-50/50 transition-colors"
                                        :class="member.status === 'pending-invite' ? 'bg-amber-50/30' : ''"
                                    >
                                        <td class="px-6 py-3">
                                            <div class="flex items-center gap-2.5">
                                                <div class="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-black shrink-0" :class="member.colorClass">
                                                    {{ member.initials }}
                                                </div>
                                                <div>
                                                    <div class="flex items-center gap-1.5">
                                                        <span class="text-sm font-bold text-gray-800 cursor-pointer hover:text-indigo-600">{{ member.name }}</span>
                                                        <span v-if="member.isNew" class="text-[9px] font-black bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-md">ใหม่</span>
                                                    </div>
                                                    <p class="text-[11px] text-gray-400 font-medium">{{ member.position }} · {{ member.startLabel }}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="px-3 py-3">
                                            <span
                                                class="text-[11px] font-bold px-2 py-0.5 rounded-full"
                                                :class="member.role === 'doctor' ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'"
                                            >
                                                {{ member.role === 'doctor' ? 'หมอ' : 'พนักงาน' }}
                                            </span>
                                        </td>
                                        <td class="px-3 py-3">
                                            <div v-if="member.photosLast30 !== null">
                                                <p class="text-sm font-black text-gray-800">{{ member.photosLast30 }} รูป</p>
                                                <div class="w-20 h-1 bg-gray-100 rounded-full mt-1">
                                                    <div class="h-1 rounded-full bg-indigo-500" :style="{ width: member.photosProgress + '%' }" />
                                                </div>
                                            </div>
                                            <p v-else class="text-xs text-gray-400">— กำลังตั้งค่า</p>
                                        </td>
                                        <td class="px-3 py-3">
                                            <span v-if="member.casesManaged !== null" class="text-sm font-bold text-gray-700">{{ member.casesManaged }}</span>
                                            <span v-else class="text-sm text-gray-300">—</span>
                                        </td>
                                        <td class="px-3 py-3">
                                            <div class="flex items-center gap-1.5">
                                                <span class="w-2 h-2 rounded-full" :class="statusDotClass(member.status)" />
                                                <span class="text-xs font-medium text-gray-600">{{ statusLabel(member.status) }}</span>
                                            </div>
                                        </td>
                                        <td class="px-3 py-3">
                                            <div class="flex items-center gap-1 justify-center">
                                                <button class="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer">
                                                    <UIcon name="i-lucide-pencil" class="w-3.5 h-3.5" />
                                                </button>
                                                <button class="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer">
                                                    <UIcon name="i-lucide-ellipsis" class="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- ─ Section 04: Queue ─ -->
                    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div class="flex items-start justify-between px-6 pt-5 pb-4 border-b border-gray-50">
                            <div class="flex items-start gap-3">
                                <span class="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">04</span>
                                <div>
                                    <h2 class="font-black text-gray-900 text-base">คิวรูปที่กำลังส่งจากสาขานี้</h2>
                                    <p class="text-[11px] text-gray-400 font-medium mt-0.5">ดูได้ว่าใครเป็นคนถ่าย ส่งเข้าเคสไหน หมอคนไหนเป็นผู้รับ · ทำงานแบบ realtime</p>
                                </div>
                            </div>
                            <div class="flex items-center gap-2 shrink-0">
                                <span class="text-xs font-medium text-gray-500">กำลังอัปโหลด <strong class="text-gray-700">3</strong></span>
                                <span class="text-gray-300">·</span>
                                <span class="text-xs font-medium text-gray-500">รอตรวจ <strong class="text-gray-700">11</strong></span>
                            </div>
                        </div>

                        <div class="divide-y divide-gray-50 px-6">
                            <div
                                v-for="item in queue"
                                :key="item.id"
                                class="py-4 flex items-center gap-4"
                            >
                                <!-- Icon -->
                                <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" :class="item.iconBg">
                                    <UIcon name="i-lucide-camera" class="w-5 h-5" :class="item.iconColor" />
                                </div>

                                <!-- Main info -->
                                <div class="flex-1 min-w-0">
                                    <div class="flex items-center gap-2 flex-wrap">
                                        <span class="text-xs font-bold text-indigo-600">{{ item.caseCode }}</span>
                                        <span class="text-sm font-bold text-gray-800">· {{ item.treatmentName }}</span>
                                    </div>
                                    <p class="text-[11px] text-gray-400 font-medium mt-0.5">
                                        โดย {{ item.uploadedBy }} → {{ item.assignedDoctor ?? 'ยังไม่ได้กำหนดหมอ' }} · {{ item.photoCount }} รูป · {{ item.sizeMb }} MB
                                    </p>
                                    <div v-if="item.status !== 'no-doctor'" class="mt-1.5">
                                        <div class="flex items-center justify-between mb-0.5">
                                            <span class="text-[10px] font-bold text-gray-500">
                                                {{ item.status === 'done' ? 'เสร็จแล้ว' : 'กำลังอัป' }}
                                                {{ item.uploadProgress }}%
                                            </span>
                                            <span
                                                v-if="item.photoTypeNote"
                                                class="text-[10px] font-bold bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-md"
                                            >
                                                {{ item.photoType }} {{ item.photoTypeNote }}
                                            </span>
                                            <span
                                                v-else
                                                class="text-[10px] font-medium text-gray-400"
                                            >
                                                {{ item.photoType }}
                                            </span>
                                        </div>
                                        <div class="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                class="h-full rounded-full transition-all"
                                                :class="uploadProgressColor(item.uploadProgress)"
                                                :style="{ width: item.uploadProgress + '%' }"
                                            />
                                        </div>
                                    </div>
                                    <div v-else class="flex items-center gap-2 mt-1.5">
                                        <span class="text-[11px] text-amber-600 font-medium">รอจัดให้หมอ</span>
                                        <span class="text-[10px] text-gray-400">{{ item.photoType }}</span>
                                    </div>
                                </div>

                                <!-- Action -->
                                <div class="shrink-0">
                                    <button
                                        v-if="item.status === 'no-doctor'"
                                        class="px-3 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-700 transition-colors cursor-pointer"
                                    >
                                        จัดให้หมอ
                                    </button>
                                    <button
                                        v-else
                                        class="w-8 h-8 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:text-indigo-600 hover:border-indigo-200 transition-colors cursor-pointer"
                                    >
                                        <UIcon name="i-lucide-volume-x" class="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ════ Right column: sticky sidebar ════ -->
                <div class="sticky top-4 space-y-4">
                    <!-- Live stats card -->
                    <div v-if="selected.liveStats" class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div class="flex items-center justify-between px-5 pt-4 pb-3 border-b border-gray-50">
                            <h3 class="text-sm font-black text-gray-800">สถานะสาขาแบบสด</h3>
                            <span class="flex items-center gap-1.5 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                                <span class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                LIVE
                            </span>
                        </div>
                        <div class="px-5 py-4 space-y-3">
                            <div class="flex items-center justify-between">
                                <span class="text-xs font-medium text-gray-500">คิวรอตรวจ</span>
                                <span class="text-sm font-black text-gray-800">{{ selected.liveStats.queueWaiting }} คน</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-xs font-medium text-gray-500">เวลารอเฉลี่ย</span>
                                <span class="text-sm font-black text-green-600">{{ selected.liveStats.avgWaitMin }} นาที</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-xs font-medium text-gray-500">ทีมออนไลน์</span>
                                <span class="text-sm font-black text-gray-800">{{ selected.liveStats.teamOnline }} / {{ selected.liveStats.teamTotal }} คน</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-xs font-medium text-gray-500">รูปอัปโหลดวันนี้</span>
                                <span class="text-sm font-black text-gray-800">
                                    {{ selected.liveStats.photosToday }} รูป
                                    <span class="text-xs font-bold text-green-500">+{{ selected.liveStats.photosTodayChange }}%</span>
                                </span>
                            </div>
                            <div>
                                <div class="flex items-center justify-between mb-1.5">
                                    <span class="text-xs font-medium text-gray-500">พื้นที่เก็บใช้ไป</span>
                                    <span class="text-sm font-black text-gray-800">{{ selected.liveStats.storageGb }} GB / {{ selected.liveStats.storageTotalGb }} GB</span>
                                </div>
                                <div class="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        class="h-full bg-indigo-500 rounded-full"
                                        :style="{ width: (selected.liveStats.storageGb / selected.liveStats.storageTotalGb * 100) + '%' }"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Business hours card -->
                    <div v-if="selected.businessHours.length" class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div class="px-5 pt-4 pb-3 border-b border-gray-50">
                            <h3 class="text-sm font-black text-gray-800">เวลาทำการ</h3>
                        </div>
                        <div class="px-5 py-3 space-y-2">
                            <div
                                v-for="h in selected.businessHours"
                                :key="h.day"
                                class="flex items-center justify-between py-0.5"
                                :class="h.isToday ? 'text-indigo-600' : ''"
                            >
                                <div class="flex items-center gap-2">
                                    <span class="text-xs font-semibold w-16" :class="h.isToday ? 'text-indigo-600 font-bold' : 'text-gray-600'">{{ h.day }}</span>
                                    <span v-if="h.isToday" class="text-[9px] font-black bg-indigo-100 text-indigo-600 px-1.5 py-0.5 rounded-md">วันนี้</span>
                                </div>
                                <span
                                    v-if="h.open"
                                    class="text-xs font-semibold"
                                    :class="h.isToday ? 'text-indigo-600' : 'text-gray-700'"
                                >
                                    {{ h.start }} – {{ h.end }}
                                </span>
                                <span v-else class="text-xs font-semibold text-red-500">ปิดทำการ</span>
                            </div>
                        </div>
                    </div>

                    <!-- Contacts card -->
                    <div v-if="selected.contacts.length" class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div class="px-5 pt-4 pb-3 border-b border-gray-50">
                            <h3 class="text-sm font-black text-gray-800">ผู้ติดต่อประจำสาขา</h3>
                        </div>
                        <div class="px-5 py-3 space-y-3">
                            <div
                                v-for="c in selected.contacts"
                                :key="c.name"
                                class="flex items-center gap-3"
                            >
                                <div class="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-black shrink-0" :class="c.colorClass">
                                    {{ c.initials }}
                                </div>
                                <div class="flex-1 min-w-0">
                                    <p class="text-xs font-bold text-gray-800">{{ c.name }}</p>
                                    <p class="text-[10px] text-gray-400 font-medium">{{ c.role }}</p>
                                </div>
                                <div class="flex items-center gap-1 shrink-0">
                                    <button class="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer">
                                        <UIcon name="i-lucide-phone" class="w-3.5 h-3.5" />
                                    </button>
                                    <button class="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer">
                                        <UIcon name="i-lucide-message-circle" class="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Equipment card -->
                    <div v-if="selected.equipment.length" class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div class="px-5 pt-4 pb-3 border-b border-gray-50">
                            <h3 class="text-sm font-black text-gray-800">อุปกรณ์ & เครื่องมือ</h3>
                        </div>
                        <div class="px-5 py-3 space-y-2.5">
                            <div
                                v-for="eq in selected.equipment"
                                :key="eq.name"
                                class="flex items-center justify-between"
                            >
                                <span class="text-xs font-medium text-gray-700">{{ eq.name }}</span>
                                <div class="flex items-center gap-1.5">
                                    <span
                                        class="flex items-center gap-1 text-[10px] font-bold"
                                        :class="eq.status === 'ready' ? 'text-green-600' : eq.status === 'maintenance' ? 'text-amber-600' : 'text-red-500'"
                                    >
                                        <span
                                            class="w-1.5 h-1.5 rounded-full"
                                            :class="eq.status === 'ready' ? 'bg-green-500' : eq.status === 'maintenance' ? 'bg-amber-400' : 'bg-red-500'"
                                        />
                                        {{ eq.status === 'ready' ? (eq.note ?? 'พร้อมใช้') : eq.status === 'maintenance' ? 'ซ่อมบำรุง' : 'ออฟไลน์' }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- ── Fixed bottom action bar — only when add form is open ── -->
    <Teleport v-if="showAddForm" to="body">
        <div class="fixed bottom-0 left-[255px] right-0 z-[100] bg-white/95 backdrop-blur-sm border-t border-gray-100 shadow-lg">
            <div class="flex items-center justify-between px-8 py-3">
                <div class="flex items-center gap-2 text-sm text-gray-600">
                    <UIcon name="i-lucide-check-circle" class="w-4 h-4 text-green-500 shrink-0" />
                    <span>
                        ผูก <strong class="text-gray-800">คุณ{{ form.firstName }}</strong>
                        เข้า <strong class="text-gray-800">{{ selected?.name }}</strong>
                        เป็นพยาบาล กะเช้า · พร้อมส่งคำเชิญ ·
                        <span class="text-gray-400">บันทึกอัตโนมัติเมื่อ 1 นาทีที่แล้ว</span>
                    </span>
                </div>
                <div class="flex items-center gap-2 shrink-0">
                    <button class="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-800 transition-colors cursor-pointer" @click="handleCancel">
                        ยกเลิก
                    </button>
                    <button class="px-4 py-2 text-sm font-semibold text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer" @click="handleSaveDraft">
                        บันทึกแบบร่าง
                    </button>
                    <button class="flex items-center gap-2 px-5 py-2 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition-colors cursor-pointer shadow-sm shadow-indigo-200" @click="handleSubmit">
                        <UIcon name="i-lucide-send" class="w-4 h-4" />
                        ส่งคำเชิญ & ผูกสาขา
                    </button>
                </div>
            </div>
        </div>
    </Teleport>
</template>
