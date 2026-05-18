<script setup lang="ts">
defineProps<{
    form: any
    isEditMode: boolean
}>()

const CONSENTS = [
    { key: 'pdpaConsent', title: 'ยินยอมให้เก็บข้อมูลส่วนบุคคล (PDPA)', desc: 'ลูกค้ายินยอมให้คลินิกเก็บและใช้ข้อมูลเพื่อการรักษาอย่างปลอดภัย' },
    { key: 'linePromoConsent', title: 'ส่งโปรโมชั่น & ข่าวสารทาง LINE', desc: 'ยินยอมให้แจ้งสิทธิประโยชน์และแพ็กเกจผ่าน LINE OA' },
    { key: 'smsNoticeConsent', title: 'แจ้งเตือนนัดทาง SMS', desc: 'ส่ง SMS แจ้งเตือนการยืนยันคิวล่วงหน้า 24 ชั่วโมง' }
]
</script>

<template>
    <div id="section-04" class="bg-white rounded-3xl p-6 border border-gray-100 shadow-xl shadow-slate-200/40 relative animate-fade-in">
        <div class="flex items-center gap-3 mb-6 pb-4 border-b border-gray-50">
            <div class="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-xl font-black text-sm flex items-center justify-center shrink-0">04</div>
            <div>
                <h2 class="text-base md:text-lg font-black text-slate-800 tracking-tight">การยินยอมพระราชบัญญัติคุ้มครองข้อมูล (PDPA)</h2>
                <p class="text-xs font-semibold text-gray-400 mt-0.5">การเก็บข้อมูลและการยินยอมให้ติดต่อรับข่าวสารทางตลาด</p>
            </div>
        </div>
        <div class="space-y-4">
            <div
                v-for="consent in CONSENTS"
                :key="consent.key"
                class="flex items-start justify-between p-3.5 border border-slate-100 rounded-2xl bg-slate-50/30"
            >
                <div>
                    <h4 class="text-sm font-bold text-slate-800">{{ consent.title }}</h4>
                    <p class="text-xs text-gray-400 font-semibold mt-0.5">{{ consent.desc }}</p>
                </div>
                <USwitch v-model="(form as any)[consent.key]" :disabled="!isEditMode" color="primary" class="cursor-pointer" />
            </div>
        </div>
    </div>
</template>
