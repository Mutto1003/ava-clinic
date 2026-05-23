<script setup lang="ts">
    import type { ClinicData, BrandColor } from '~/client/settings'

    const props = defineProps<{ modelValue: ClinicData['brand'] }>()
    const emit = defineEmits<{ 'update:modelValue': [v: ClinicData['brand']] }>()

    const form = computed({
        get: () => props.modelValue,
        set: (v) => emit('update:modelValue', v)
    })

    const colorOptions: { key: BrandColor; label: string; hex: string }[] = [
        { key: 'violet', label: 'Violet', hex: '#602809' },
        { key: 'emerald', label: 'Emerald', hex: '#08A378' },
        { key: 'blue', label: 'Blue', hex: '#4263E8' },
        { key: 'pink', label: 'Pink', hex: '#982777' },
        { key: 'amber', label: 'Amber', hex: '#D97796' },
        { key: 'custom', label: 'กำหนดเอง', hex: form.value.customColor }
    ]

    const businessTypes = ['คลินิกเวชกรรม', 'คลินิกทันตกรรม', 'คลินิกความงาม', 'โรงพยาบาล', 'อื่นๆ']
</script>

<template>
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div class="flex items-start justify-between px-6 pt-5 pb-4 border-b border-gray-50">
            <div class="flex items-center gap-3">
                <span class="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-black">01</span>
                <div>
                    <h2 class="font-black text-gray-900 text-base">เอกลักษณ์แบรนด์ & ชื่อทางค้า</h2>
                    <p class="text-[11px] text-gray-400 font-medium mt-0.5">ใช้ใน Teleconsult, ใบเสร็จ, อีเมล, และเอกสารทางการ</p>
                </div>
            </div>
            <span class="inline-flex items-center gap-1.5 text-[10px] font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                <UIcon name="i-lucide-check-circle" class="w-3 h-3" />
                บันทึกเรียบร้อย
            </span>
        </div>

        <div class="p-6 space-y-6">
            <!-- Logo Upload -->
            <div class="flex items-start gap-5">
                <div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 flex items-center justify-center text-white text-2xl font-black shrink-0 shadow-lg shadow-indigo-200">
                    {{ form.nameEn?.charAt(0) || 'A' }}
                </div>
                <div class="flex-1">
                    <p class="text-xs font-black text-gray-700 mb-1">โลโก้คลินิก</p>
                    <p class="text-[11px] text-gray-400 font-medium mb-3">PNG / SVG ไม่เกิน 4MB · ไซส์แนะนำ 512×512px · โลโก้ใช้แสดงในระบบ Teleconsult และเอกสาร</p>
                    <div class="flex items-center gap-2">
                        <button class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                            <UIcon name="i-lucide-upload" class="w-3.5 h-3.5" />
                            อัปโหลด
                        </button>
                        <button class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                            <UIcon name="i-lucide-crop" class="w-3.5 h-3.5" />
                            ครอบ
                        </button>
                        <button class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-red-500 border border-red-100 rounded-lg hover:bg-red-50 cursor-pointer transition-colors">
                            <UIcon name="i-lucide-trash-2" class="w-3.5 h-3.5" />
                            ลบ
                        </button>
                    </div>
                </div>
            </div>

            <!-- Name fields -->
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-[11px] font-black text-gray-600 mb-1.5">ชื่อทางการ (ภาษาอังกฤษ) <span class="text-red-400">*</span></label>
                    <input
                        v-model="form.nameEn"
                        type="text"
                        class="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 font-medium text-gray-900"
                        placeholder="AVACLINIC"
                    />
                    <p class="text-[10px] text-gray-400 font-medium mt-1">แสดงใน Header ของ avaconsult.com</p>
                </div>
                <div>
                    <label class="block text-[11px] font-black text-gray-600 mb-1.5">ชื่อทางการ (ภาษาไทย) <span class="text-red-400">*</span></label>
                    <input
                        v-model="form.nameTh"
                        type="text"
                        class="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 font-medium text-gray-900"
                        placeholder="เอวาคลินิก เวชกรรม"
                    />
                </div>
                <div>
                    <label class="block text-[11px] font-black text-gray-600 mb-1.5">ชื่อนิติบุคคล <span class="text-red-400">*</span></label>
                    <input
                        v-model="form.legalName"
                        type="text"
                        class="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 font-medium text-gray-900"
                        placeholder="บริษัท เอวา คลินิก จำกัด"
                    />
                </div>
                <div>
                    <label class="block text-[11px] font-black text-gray-600 mb-1.5">ประเภทกิจการ</label>
                    <select
                        v-model="form.businessType"
                        class="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 font-medium text-gray-900 bg-white"
                    >
                        <option
                            v-for="t in businessTypes"
                            :key="t"
                            :value="t"
                        >{{ t }}</option>
                    </select>
                </div>
            </div>

            <!-- Brand color -->
            <div>
                <label class="block text-[11px] font-black text-gray-600 mb-2">สีหลักของแบรนด์</label>
                <p class="text-[10px] text-gray-400 font-medium mb-3">ใช้เป็น Accent สี CTA, Tag, และ Highlight ใน Teleconsult และระบบ Online</p>
                <div class="flex flex-wrap gap-2">
                    <button
                        v-for="c in colorOptions"
                        :key="c.key"
                        class="flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-lg border-2 cursor-pointer transition-all"
                        :class="form.primaryColor === c.key
                            ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                            : 'border-gray-200 text-gray-600 hover:border-gray-300'"
                        @click="form.primaryColor = c.key"
                    >
                        <span
                            class="w-3.5 h-3.5 rounded-full shrink-0"
                            :style="{ backgroundColor: c.key === 'custom' ? form.customColor : c.hex }"
                        />
                        {{ c.label }}
                        <span
                            v-if="c.key !== 'custom'"
                            class="text-[9px] text-gray-400 font-medium"
                        >{{ c.hex }}</span>
                    </button>
                </div>
                <div
                    v-if="form.primaryColor === 'custom'"
                    class="mt-3 flex items-center gap-2"
                >
                    <input
                        v-model="form.customColor"
                        type="color"
                        class="w-8 h-8 rounded-lg border border-gray-200 cursor-pointer"
                    />
                    <input
                        v-model="form.customColor"
                        type="text"
                        class="px-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-400 font-mono w-28"
                        placeholder="#000000"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
