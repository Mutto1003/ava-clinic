<script setup lang="ts">
    import type { ClinicData } from '~/client/settings'

    const props = defineProps<{ modelValue: ClinicData['license'] }>()
    const emit = defineEmits<{ 'update:modelValue': [v: ClinicData['license']] }>()

    const form = computed({
        get: () => props.modelValue,
        set: (v) => emit('update:modelValue', v)
    })

    const taxBranchOptions = ['สำนักงานใหญ่', 'สาขาที่ 1', 'สาขาที่ 2']
    const vatOptions = ['จดทะเบียน VAT 7%', 'ไม่จด VAT', 'ยกเว้น VAT']
</script>

<template>
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div class="flex items-start justify-between px-6 pt-5 pb-4 border-b border-gray-50">
            <div class="flex items-center gap-3">
                <span class="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-black">02</span>
                <div>
                    <h2 class="font-black text-gray-900 text-base">ข้อมูลสุขภาพ & ใบอนุญาต</h2>
                    <p class="text-[11px] text-gray-400 font-medium mt-0.5">สำหรับใบเสร็จ, ใบกำกับภาษี, และเอกสารทางการ</p>
                </div>
            </div>
        </div>

        <div class="p-6 space-y-4">
            <!-- Tax + VAT row -->
            <div class="grid grid-cols-3 gap-4">
                <div class="col-span-1">
                    <label class="block text-[11px] font-black text-gray-600 mb-1.5">เลขประจำตัวผู้เสียภาษี <span class="text-red-400">*</span></label>
                    <input
                        v-model="form.taxId"
                        type="text"
                        maxlength="13"
                        class="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 font-mono text-gray-900"
                        placeholder="0000000000000"
                    />
                </div>
                <div>
                    <label class="block text-[11px] font-black text-gray-600 mb-1.5">สาขา (ภาษี)</label>
                    <select
                        v-model="form.taxBranch"
                        class="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 font-medium text-gray-900 bg-white"
                    >
                        <option
                            v-for="b in taxBranchOptions"
                            :key="b"
                            :value="b"
                        >{{ b }}</option>
                    </select>
                </div>
                <div>
                    <label class="block text-[11px] font-black text-gray-600 mb-1.5">VAT</label>
                    <select
                        v-model="form.vatType"
                        class="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 font-medium text-gray-900 bg-white"
                    >
                        <option
                            v-for="v in vatOptions"
                            :key="v"
                            :value="v"
                        >{{ v }}</option>
                    </select>
                </div>
            </div>

            <!-- Info note -->
            <div class="flex items-start gap-2 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
                <UIcon name="i-lucide-info" class="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                <p class="text-[11px] text-blue-700 font-medium leading-relaxed">
                    การเปลี่ยนแปลงข้อมูลภาษีจะถูกใช้ใน<strong>ใบกำกับภาษีที่ออกหลังจากวันนี้</strong> เท่านั้น·
                    <button class="font-black underline cursor-pointer">เชื่อมต่อ Avaconnect มากกว่า›</button>
                </p>
            </div>

            <!-- License fields -->
            <div class="grid grid-cols-3 gap-4">
                <div class="col-span-1">
                    <label class="block text-[11px] font-black text-gray-600 mb-1.5">เลขที่ใบอนุญาตประกอบกิจการตาม พรบ.</label>
                    <input
                        v-model="form.licenseNumber"
                        type="text"
                        class="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 font-medium text-gray-900"
                        placeholder="พ.ษ. 0000-00-000"
                    />
                </div>
                <div>
                    <label class="block text-[11px] font-black text-gray-600 mb-1.5">วันออกใบอนุญาต</label>
                    <input
                        v-model="form.licenseIssuedDate"
                        type="date"
                        class="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 font-medium text-gray-900"
                    />
                </div>
                <div>
                    <label class="block text-[11px] font-black text-gray-600 mb-1.5">วันหมดอายุ</label>
                    <input
                        v-model="form.licenseExpiryDate"
                        type="date"
                        class="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 font-medium text-gray-900"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
