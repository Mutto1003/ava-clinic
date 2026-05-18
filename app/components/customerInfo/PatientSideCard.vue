<script setup lang="ts">
defineProps<{
    form: any
    avatarInitials: string
    computedAge: number | string
}>()

const toast = useAppToast()
</script>

<template>
    <div class="space-y-6">
        <!-- Patient Summary -->
        <div class="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-slate-200/40 overflow-hidden relative">
            <div class="h-20 bg-gradient-to-tr from-indigo-600 to-indigo-800 p-4 flex items-start justify-between relative overflow-hidden">
                <span class="text-xs font-bold text-indigo-200 uppercase tracking-widest bg-indigo-900/30 px-2.5 py-0.5 rounded-md border border-indigo-400/20 backdrop-blur-md">เวชระเบียนคลินิก</span>
                <span class="text-xs font-bold text-white/80">CN-{{ form.hn }}</span>
            </div>
            <div class="p-6 pt-0 relative text-center">
                <div
                    class="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center font-bold text-2xl shadow-md -mt-10 mb-4 mx-auto relative z-10 shrink-0"
                    :class="form.avatarColor || 'bg-indigo-100 text-indigo-600'"
                >
                    {{ avatarInitials }}
                </div>
                <h3 class="text-base font-bold text-slate-800">{{ form.title }} {{ form.firstName }} {{ form.lastName }}</h3>
                <p class="text-xs text-gray-400 font-bold mt-1 flex items-center justify-center gap-1.5">
                    <span>เพศ: {{ form.gender }}</span>
                    <span class="text-slate-300">•</span>
                    <span>อายุ: {{ computedAge }} ปี</span>
                </p>
                <div class="border-b border-gray-100 my-4"></div>
                <div class="grid grid-cols-3 gap-2 text-left mb-4">
                    <div class="bg-slate-50 p-2 rounded-xl border border-slate-100">
                        <span class="text-[9px] font-bold text-gray-400 block uppercase">เข้ารับบริการ</span>
                        <span class="text-sm font-bold text-indigo-600 block mt-0.5">14 ครั้ง</span>
                    </div>
                    <div class="bg-slate-50 p-2 rounded-xl border border-slate-100">
                        <span class="text-[9px] font-bold text-gray-400 block uppercase">ยอดใช้จ่าย</span>
                        <span class="text-sm font-bold text-emerald-600 block mt-0.5">42.8k ฿</span>
                    </div>
                    <div class="bg-slate-50 p-2 rounded-xl border border-slate-100">
                        <span class="text-[9px] font-bold text-gray-400 block uppercase">พบแพทย์ล่าสุด</span>
                        <span class="text-xs font-bold text-slate-700 block mt-1 truncate">หมอโอ๊ค</span>
                    </div>
                </div>
                <div class="space-y-3.5 text-left text-xs">
                    <div class="flex items-center gap-2.5"><UIcon name="i-lucide-phone" class="w-4 h-4 text-slate-400" /><span class="font-semibold text-slate-700">{{ form.mobile || '—' }}</span></div>
                    <div class="flex items-center gap-2.5"><UIcon name="i-lucide-message-circle" class="w-4 h-4 text-slate-400" /><span class="font-semibold text-slate-700">{{ form.lineId || '—' }}</span></div>
                    <div class="flex items-center gap-2.5">
                        <UIcon name="i-lucide-shield-alert" class="w-4 h-4 text-rose-400" />
                        <span v-if="form.drugAllergies.length" class="font-bold text-rose-500">แพ้ยา: {{ form.drugAllergies.join(', ') }}</span>
                        <span v-else class="font-semibold text-slate-400">ไม่มีประวัติแพ้ยา</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Quick Actions -->
        <div class="bg-white rounded-3xl p-6 border border-gray-100 shadow-xl shadow-slate-200/40 space-y-3">
            <h4 class="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block">ทางลัดบริการ (Quick Actions)</h4>
            <button
                type="button"
                class="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs md:text-sm py-3 px-4 rounded-2xl flex items-center justify-between transition-all cursor-pointer"
                @click="toast.info('นัดหมายล่วงหน้า', `ระบบนัดหมายสำหรับ ${form.firstName} จองเวลาถัดไป...`)"
            >
                <span class="flex items-center gap-2"><UIcon name="i-lucide-calendar" class="w-4 h-4" /><span>นัดหมายทรีตเมนต์ถัดไป</span></span>
                <UIcon name="i-lucide-chevron-right" class="w-4 h-4" />
            </button>
            <button
                type="button"
                class="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs md:text-sm py-3 px-4 rounded-2xl flex items-center justify-between transition-all cursor-pointer"
                @click="toast.success('ปรึกษาออนไลน์', `เริ่มการจัดห้องเทเลคอนซัลต์ให้กับคนไข้ HN ${form.hn}`)"
            >
                <span class="flex items-center gap-2"><UIcon name="i-lucide-video" class="w-4 h-4" /><span>เปิดห้อง Teleconsult ทันที</span></span>
                <UIcon name="i-lucide-chevron-right" class="w-4 h-4" />
            </button>
            <button
                type="button"
                class="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs md:text-sm py-3 px-4 rounded-2xl flex items-center justify-between transition-all cursor-pointer"
                @click="toast.info('เวชระเบียนย่อ', 'พิมพ์รายงานเวชระเบียนย่อลงกระดาษ A4 หรือบันทึก PDF')"
            >
                <span class="flex items-center gap-2"><UIcon name="i-lucide-printer" class="w-4 h-4" /><span>พิมพ์บันทึกเวชระเบียนย่อ (OPD Card)</span></span>
                <UIcon name="i-lucide-chevron-right" class="w-4 h-4" />
            </button>
        </div>
    </div>
</template>
