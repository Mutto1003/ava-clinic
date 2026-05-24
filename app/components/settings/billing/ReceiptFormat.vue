<script setup lang="ts">
    import type { BillingData, ReceiptTemplate, ReceiptLocale } from '~/client/settings/billing'

    const props = defineProps<{
        modelValue: BillingData['receiptFormat']
        clinicName: string
        clinicLegalName: string
        clinicTaxId: string
        clinicAddress: string
    }>()
    const emit = defineEmits<{ 'update:modelValue': [v: BillingData['receiptFormat']] }>()

    const form = computed({
        get: () => props.modelValue,
        set: (v) => emit('update:modelValue', v)
    })

    const templates: { key: ReceiptTemplate; label: string; accent: string; header: string }[] = [
        { key: 'violet', label: 'Violet (แนะนำ)', accent: 'bg-violet-600', header: 'bg-violet-600' },
        { key: 'monochrome', label: 'Monochrome', accent: 'bg-gray-900', header: 'bg-gray-900' },
        { key: 'emerald', label: 'Emerald', accent: 'bg-emerald-600', header: 'bg-emerald-600' },
        { key: 'minimal', label: 'Minimal', accent: 'bg-gray-300', header: 'bg-gray-200' }
    ]

    const locales: { key: ReceiptLocale; label: string }[] = [
        { key: 'th', label: 'ไทย (TH)' },
        { key: 'en', label: 'English (EN)' },
        { key: 'th_en', label: 'ไทย + EN' }
    ]

    const previewInvoiceNumber = computed(() => {
        const num = form.value.startNumber.padStart(4, '0')
        return `${form.value.prefix}${num}`
    })
</script>

<template>
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div class="px-6 pt-5 pb-4 border-b border-gray-50">
            <div class="flex items-center gap-3">
                <span class="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-black">04</span>
                <div>
                    <h2 class="font-black text-gray-900 text-base">รูปแบบใบเสร็จ / ใบกำกับภาษี</h2>
                    <p class="text-[11px] text-gray-400 font-medium mt-0.5">เลือกเทมเพลตและกำหนดข้อความที่จะปรากฏบนใบเสร็จ</p>
                </div>
            </div>
        </div>

        <div class="p-6 space-y-6">
            <!-- Invoice number config -->
            <div class="grid grid-cols-3 gap-4">
                <div>
                    <label class="block text-[11px] font-black text-gray-600 mb-1.5">คำนำหน้าเลขที่ใบเสร็จ</label>
                    <input
                        v-model="form.prefix"
                        type="text"
                        class="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 font-medium text-gray-900"
                        placeholder="INV-"
                    />
                    <p class="text-[10px] text-gray-400 font-medium mt-1">
                        ตัวอย่าง: {{ previewInvoiceNumber }} · ระบบจะใส่เลขอัตโนมัติ
                    </p>
                </div>
                <div>
                    <label class="block text-[11px] font-black text-gray-600 mb-1.5">เริ่มเลขที่</label>
                    <input
                        v-model="form.startNumber"
                        type="text"
                        class="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 font-medium text-gray-900"
                        placeholder="0001"
                    />
                </div>
                <div>
                    <label class="block text-[11px] font-black text-gray-600 mb-1.5">รูปแบบใบเสร็จ</label>
                    <select
                        v-model="form.locale"
                        class="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 font-medium text-gray-900 bg-white"
                    >
                        <option
                            v-for="l in locales"
                            :key="l.key"
                            :value="l.key"
                        >{{ l.label }}</option>
                    </select>
                </div>
            </div>

            <!-- Template selection -->
            <div>
                <label class="block text-[11px] font-black text-gray-600 mb-3">เทมเพลต</label>
                <div class="grid grid-cols-4 gap-3">
                    <button
                        v-for="t in templates"
                        :key="t.key"
                        class="rounded-xl border-2 overflow-hidden cursor-pointer transition-all focus:outline-none"
                        :class="form.template === t.key ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-gray-200 hover:border-gray-300'"
                        @click="form.template = t.key"
                    >
                        <!-- Mini preview card -->
                        <div class="bg-white p-2">
                            <div class="h-1.5 rounded-full mb-1.5" :class="t.header" />
                            <div class="space-y-1">
                                <div class="h-1 rounded-full bg-gray-200 w-3/4" />
                                <div class="h-1 rounded-full bg-gray-100 w-1/2" />
                            </div>
                            <div class="mt-2 flex justify-between items-center">
                                <div class="space-y-0.5">
                                    <div class="h-1 rounded-full bg-gray-100 w-8" />
                                    <div class="h-1 rounded-full bg-gray-100 w-6" />
                                </div>
                                <div class="h-3 w-10 rounded" :class="t.accent" />
                            </div>
                        </div>
                        <p class="text-[10px] font-bold text-center py-1.5 text-gray-600">{{ t.label }}</p>
                    </button>
                </div>
            </div>

            <!-- Footer note -->
            <div>
                <label class="block text-[11px] font-black text-gray-600 mb-1.5">
                    หมายเหตุท้ายใบเสร็จ
                    <span class="text-gray-400 font-medium ml-1">(ไม่บังคับ)</span>
                </label>
                <textarea
                    v-model="form.footerNote"
                    rows="3"
                    class="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 font-medium text-gray-900 resize-none"
                    placeholder="ขอบคุณที่ใช้บริการ..."
                />
            </div>

            <!-- Receipt preview -->
            <div class="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div class="bg-white rounded-xl shadow-sm overflow-hidden max-w-sm mx-auto text-[10px]">
                    <!-- Header bar -->
                    <div
                        class="h-1.5"
                        :class="templates.find(t => t.key === form.template)?.header"
                    />
                    <div class="p-4">
                        <div class="flex items-start justify-between mb-3">
                            <div>
                                <div class="flex items-center gap-2 mb-1">
                                    <div class="w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center text-white text-[8px] font-black">A</div>
                                    <span class="font-black text-gray-900 text-xs">{{ clinicName }}</span>
                                </div>
                                <p class="text-gray-400 font-medium">{{ clinicLegalName }}</p>
                                <p class="text-gray-400 font-medium">เลขผู้เสียภาษี {{ clinicTaxId }}</p>
                            </div>
                            <div class="text-right">
                                <p class="text-[9px] font-black text-gray-500 uppercase tracking-wide">ใบเสร็จรับเงิน / RECEIPT</p>
                                <p
                                    class="font-black text-xs"
                                    :class="templates.find(t => t.key === form.template)?.accent.replace('bg-', 'text-')"
                                >{{ previewInvoiceNumber }}</p>
                                <p class="text-gray-400">วันที่ 24 พ.ค. 2026 · 14:08 น.</p>
                            </div>
                        </div>
                        <div class="border-t border-gray-100 pt-3 space-y-1.5">
                            <div class="flex justify-between text-gray-600">
                                <span>Filler Juvederm Volift 1ml</span>
                                <span>28,000.00</span>
                            </div>
                            <div class="flex justify-between text-gray-600">
                                <span>ยา EMLA Cream</span>
                                <span class="text-gray-400">รวมในบริการ</span>
                            </div>
                        </div>
                        <div class="border-t border-gray-100 mt-3 pt-3 space-y-1">
                            <div class="flex justify-between text-gray-500">
                                <span>ยอดก่อนภาษี</span>
                                <span>26,168.22</span>
                            </div>
                            <div class="flex justify-between text-gray-500">
                                <span>VAT 7%</span>
                                <span>1,831.78</span>
                            </div>
                            <div class="flex justify-between font-black text-gray-900 text-xs pt-1">
                                <span>รวมทั้งสิ้น</span>
                                <span>฿28,000.00</span>
                            </div>
                        </div>
                        <p
                            v-if="form.footerNote"
                            class="mt-3 pt-3 border-t border-gray-100 text-gray-400 leading-relaxed"
                        >{{ form.footerNote }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
