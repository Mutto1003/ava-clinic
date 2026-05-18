<script setup lang="ts">
defineProps<{
    form: any
    isEditMode: boolean
    computedAge: number | string
    isIdCardValid: boolean
}>()

const INPUT_CLASS = 'w-full bg-slate-50 border border-gray-200 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 focus:bg-white focus:border-indigo-500 outline-none'
</script>

<template>
    <div id="section-01" class="bg-white rounded-3xl p-6 border border-gray-100 shadow-xl shadow-slate-200/40 relative animate-fade-in">
        <div class="flex items-center gap-3 mb-6 pb-4 border-b border-gray-50">
            <div class="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-xl font-black text-sm flex items-center justify-center shrink-0">01</div>
            <div>
                <h2 class="text-base md:text-lg font-black text-slate-800 tracking-tight">ข้อมูลพื้นฐานผู้ป่วย</h2>
                <p class="text-xs font-semibold text-gray-400 mt-0.5">ข้อมูลส่วนตัวและอายุสำหรับการประเมินอาการขั้นพื้นฐาน</p>
            </div>
        </div>

        <div v-if="isEditMode" class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
                <label class="block text-xs md:text-sm font-bold text-slate-700 mb-1.5">คำนำหน้า <span class="text-rose-500">*</span></label>
                <select v-model="form.title" :class="INPUT_CLASS">
                    <option>นาย</option><option>นาง</option><option>นางสาว</option>
                </select>
            </div>
            <div>
                <label class="block text-xs md:text-sm font-bold text-slate-700 mb-1.5">ชื่อจริง <span class="text-rose-500">*</span></label>
                <input v-model="form.firstName" type="text" :class="INPUT_CLASS" />
            </div>
            <div>
                <label class="block text-xs md:text-sm font-bold text-slate-700 mb-1.5">นามสกุล <span class="text-rose-500">*</span></label>
                <input v-model="form.lastName" type="text" :class="INPUT_CLASS" />
            </div>
            <div>
                <label class="block text-xs md:text-sm font-bold text-slate-700 mb-1.5">ชื่อเล่น <span class="text-gray-400 font-bold">(ไม่บังคับ)</span></label>
                <input v-model="form.nickname" type="text" :class="INPUT_CLASS" />
            </div>
            <div>
                <label class="block text-xs md:text-sm font-bold text-slate-700 mb-1.5">เพศสภาพ <span class="text-rose-500">*</span></label>
                <div class="grid grid-cols-2 gap-2">
                    <button type="button" @click="form.gender = 'ชาย'" class="py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer" :class="form.gender === 'ชาย' ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'bg-slate-50 border-gray-200 text-slate-500 hover:bg-slate-100/70'">ชาย</button>
                    <button type="button" @click="form.gender = 'หญิง'" class="py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer" :class="form.gender === 'หญิง' ? 'bg-rose-50 border-rose-200 text-rose-600' : 'bg-slate-50 border-gray-200 text-slate-500 hover:bg-slate-100/70'">หญิง</button>
                </div>
            </div>
            <div>
                <label class="block text-xs md:text-sm font-bold text-slate-700 mb-1.5">วัน/เดือน/ปีเกิด <span class="text-rose-500">*</span></label>
                <input v-model="form.birthDate" type="date" :class="INPUT_CLASS" />
            </div>
            <div class="md:col-span-3">
                <label class="block text-xs md:text-sm font-bold text-slate-700 mb-1.5">เลขบัตรประชาชน 13 หลัก <span class="text-rose-500">*</span></label>
                <input v-model="form.idCard" type="text" placeholder="x-xxxx-xxxxx-xx-x" :class="INPUT_CLASS" />
                <div v-if="isIdCardValid" class="text-xs font-bold text-emerald-500 mt-1 flex items-center gap-1">
                    <UIcon name="i-lucide-check-circle" class="w-3.5 h-3.5" />
                    <span>เลขบัตรประชาชนถูกต้องตามสูตรคำนวณ</span>
                </div>
            </div>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-slate-50/50 p-4 rounded-2xl border border-slate-100/60">
                <span class="text-xs font-bold text-slate-500 block mb-1">ชื่อ-นามสกุลจริง</span>
                <span class="text-xs md:text-sm font-bold text-slate-700">{{ form.title }} {{ form.firstName }} {{ form.lastName }}</span>
            </div>
            <div class="bg-slate-50/50 p-4 rounded-2xl border border-slate-100/60">
                <span class="text-xs font-bold text-slate-500 block mb-1">ชื่อเล่น</span>
                <span class="text-xs md:text-sm font-bold text-slate-700">{{ form.nickname || '—' }}</span>
            </div>
            <div class="bg-slate-50/50 p-4 rounded-2xl border border-slate-100/60">
                <span class="text-xs font-bold text-slate-500 block mb-1">เพศสภาพ</span>
                <span class="text-xs md:text-sm font-bold" :class="form.gender === 'หญิง' ? 'text-rose-500' : 'text-indigo-600'">{{ form.gender }}</span>
            </div>
            <div class="bg-slate-50/50 p-4 rounded-2xl border border-slate-100/60">
                <span class="text-xs font-bold text-slate-500 block mb-1">วันเกิด / อายุ</span>
                <span class="text-xs md:text-sm font-bold text-slate-700">{{ form.birthDate }} ({{ computedAge }} ปี)</span>
            </div>
            <div class="bg-slate-50/50 p-4 rounded-2xl border border-slate-100/60 md:col-span-2">
                <span class="text-xs font-bold text-slate-500 block mb-1">เลขบัตรประชาชน</span>
                <span class="text-xs md:text-sm font-bold text-slate-700 tracking-wider">{{ form.idCard }}</span>
            </div>
        </div>
    </div>
</template>
