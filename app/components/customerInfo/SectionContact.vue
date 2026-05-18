<script setup lang="ts">
defineProps<{
    form: any
    isEditMode: boolean
}>()

const INPUT_CLASS = 'w-full bg-slate-50 border border-gray-200 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 focus:bg-white focus:border-indigo-500 outline-none'
</script>

<template>
    <div id="section-02" class="bg-white rounded-3xl p-6 border border-gray-100 shadow-xl shadow-slate-200/40 relative animate-fade-in">
        <div class="flex items-center gap-3 mb-6 pb-4 border-b border-gray-50">
            <div class="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-xl font-black text-sm flex items-center justify-center shrink-0">02</div>
            <div>
                <h2 class="text-base md:text-lg font-black text-slate-800 tracking-tight">ช่องทางการติดต่อ & ที่อยู่</h2>
                <p class="text-xs font-semibold text-gray-400 mt-0.5">เบอร์โทร, LINE, อีเมล และผู้ติดต่อกรณีฉุกเฉิน</p>
            </div>
        </div>

        <div v-if="isEditMode" class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div><label class="block text-xs md:text-sm font-bold text-slate-700 mb-1.5">เบอร์โทรหลัก <span class="text-rose-500">*</span></label><input v-model="form.mobile" type="text" :class="INPUT_CLASS" /></div>
            <div><label class="block text-xs md:text-sm font-bold text-slate-700 mb-1.5">เบอร์โทรสำรอง</label><input v-model="form.homePhone" type="text" :class="INPUT_CLASS" /></div>
            <div><label class="block text-xs md:text-sm font-bold text-slate-700 mb-1.5">LINE ID</label><input v-model="form.lineId" type="text" :class="INPUT_CLASS" /></div>
            <div><label class="block text-xs md:text-sm font-bold text-slate-700 mb-1.5">อีเมล</label><input v-model="form.email" type="text" :class="INPUT_CLASS" /></div>
            <div class="md:col-span-2"><label class="block text-xs md:text-sm font-bold text-slate-700 mb-1.5">ที่อยู่ปัจจุบัน</label><input v-model="form.address" type="text" :class="INPUT_CLASS" /></div>
            <div><label class="block text-xs md:text-sm font-bold text-slate-700 mb-1.5">ผู้ติดต่อกรณีฉุกเฉิน</label><input v-model="form.emergencyName" type="text" :class="INPUT_CLASS" /></div>
            <div>
                <label class="block text-xs md:text-sm font-bold text-slate-700 mb-1.5">ความสัมพันธ์</label>
                <select v-model="form.emergencyRelation" :class="INPUT_CLASS">
                    <option>— เลือก —</option><option>บิดา / มารดา</option><option>สามี / ภรรยา</option><option>บุตร</option><option>ญาติ</option><option>เพื่อน</option>
                </select>
            </div>
            <div><label class="block text-xs md:text-sm font-bold text-slate-700 mb-1.5">เบอร์โทรกรณีฉุกเฉิน</label><input v-model="form.emergencyMobile" type="text" :class="INPUT_CLASS" /></div>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
                v-for="item in [
                    { icon: 'i-lucide-phone', label: 'เบอร์โทรหลัก / สำรอง', value: form.mobile + (form.homePhone ? ` (${form.homePhone})` : '') },
                    { icon: 'i-lucide-message-circle', label: 'LINE ID', value: form.lineId },
                    { icon: 'i-lucide-mail', label: 'อีเมล', value: form.email },
                    { icon: 'i-lucide-map-pin', label: 'ที่อยู่', value: form.address }
                ]"
                :key="item.label"
                class="bg-slate-50/50 p-4 rounded-2xl border border-slate-100/60 flex items-center gap-3"
            >
                <UIcon :name="item.icon" class="w-5 h-5 text-indigo-500 shrink-0" />
                <div>
                    <span class="text-xs font-bold text-slate-500 block">{{ item.label }}</span>
                    <span class="text-xs md:text-sm font-bold text-slate-700">{{ item.value || '—' }}</span>
                </div>
            </div>
            <div class="bg-slate-50/50 p-4 rounded-2xl border border-slate-100/60 flex items-center gap-3 md:col-span-2">
                <UIcon name="i-lucide-shield-alert" class="w-5 h-5 text-amber-500 shrink-0" />
                <div>
                    <span class="text-xs font-bold text-slate-500 block">ผู้ติดต่อฉุกเฉิน</span>
                    <span class="text-xs md:text-sm font-bold text-slate-700">{{ form.emergencyName ? `${form.emergencyName} (${form.emergencyRelation}) — โทร ${form.emergencyMobile}` : '— ไม่ได้ระบุ —' }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
