<script setup lang="ts">
defineProps<{
    form: any
    avatarInitials: string
    computedAge: number | null
}>()
</script>

<template>
    <div class="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-slate-200/40 overflow-hidden relative">
        <div class="h-20 bg-gradient-to-tr from-indigo-600 to-indigo-800 p-4 flex items-start justify-between relative overflow-hidden">
            <div class="absolute -right-6 -bottom-6 w-20 h-20 bg-white/5 rounded-full blur-xl pointer-events-none"></div>
            <span class="text-xs font-black text-indigo-200 uppercase tracking-widest bg-indigo-900/30 px-2.5 py-0.5 rounded-md border border-indigo-400/20 backdrop-blur-md">LIVE PREVIEW</span>
            <span class="text-xs font-bold text-white/80">CN-00184</span>
        </div>

        <div class="p-6 pt-0 relative">
            <div class="w-20 h-20 rounded-full bg-[#f6f3ff] border-4 border-white flex items-center justify-center font-black text-2xl text-indigo-600 shadow-md -mt-10 mb-4 mx-auto relative z-10 shrink-0">
                {{ avatarInitials }}
            </div>

            <div class="text-center mb-6">
                <h3 class="text-base font-black text-slate-800">
                    {{ form.firstName ? (form.title + ' ' + form.firstName + ' ' + form.lastName) : '— ยังไม่ได้ระบุชื่อ —' }}
                </h3>
                <p class="text-xs text-gray-400 font-bold mt-1 flex items-center justify-center gap-1.5">
                    <span>เพศ: {{ form.gender || '—' }}</span>
                    <span class="text-slate-300">•</span>
                    <span>อายุ: {{ computedAge !== null ? computedAge + ' ปี' : '—' }}</span>
                </p>
            </div>

            <div class="border-b border-gray-50 mb-4"></div>

            <div class="space-y-3.5 text-xs">
                <div
                    v-for="item in [
                        { icon: 'i-lucide-phone', label: 'เบอร์โทรศัพท์', value: form.mobile },
                        { icon: 'i-lucide-mail', label: 'อีเมล', value: form.email },
                        { icon: 'i-lucide-message-square', label: 'LINE ID', value: form.lineId },
                        { icon: 'i-lucide-map-pin', label: 'ที่อยู่ปัจจุบัน', value: form.address ? [form.address, form.subDistrict, form.district, form.province, form.zipcode].filter(Boolean).join(' ') : '' },
                        { icon: 'i-lucide-shield-alert', label: 'ผู้ติดต่อฉุกเฉิน', value: form.emergencyName ? `${form.emergencyName} (${form.emergencyMobile})` : '' }
                    ]"
                    :key="item.label"
                    class="flex items-start gap-3"
                >
                    <div class="w-7 h-7 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center text-slate-400 shrink-0">
                        <UIcon :name="item.icon" class="w-3.5 h-3.5" />
                    </div>
                    <div class="flex-1 min-w-0">
                        <span class="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">{{ item.label }}</span>
                        <span class="text-xs md:text-sm font-semibold text-slate-700 block truncate">{{ item.value || '—' }}</span>
                    </div>
                </div>
            </div>

            <div class="border-b border-gray-50 my-4"></div>

            <div class="space-y-3">
                <div>
                    <span class="text-[11px] font-bold text-rose-400 uppercase tracking-wider block mb-1">ประวัติการแพ้ยา</span>
                    <div class="flex flex-wrap gap-1.5">
                        <template v-if="form.drugAllergies.length">
                            <span v-for="tag in form.drugAllergies" :key="tag" class="text-xs font-bold bg-rose-50 border border-rose-100 text-rose-500 px-2 py-0.5 rounded-lg">{{ tag }}</span>
                        </template>
                        <span v-else class="text-xs font-bold text-slate-400/80">ไม่มีประวัติแพ้ยา</span>
                    </div>
                </div>
                <div>
                    <span class="text-[11px] font-bold text-indigo-400 uppercase tracking-wider block mb-1">โรคประจำตัว</span>
                    <div class="flex flex-wrap gap-1.5">
                        <template v-if="form.chronicDiseases.length">
                            <span v-for="tag in form.chronicDiseases" :key="tag" class="text-xs font-bold bg-indigo-50 border border-indigo-100 text-indigo-500 px-2 py-0.5 rounded-lg">{{ tag }}</span>
                        </template>
                        <span v-else class="text-xs font-bold text-slate-400/80">ไม่มีโรคประจำตัว</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
