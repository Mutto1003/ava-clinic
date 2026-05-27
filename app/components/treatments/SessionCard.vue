<script setup lang="ts">
import type { TreatmentSession } from '~/client/treatments'
import { formatThaiDate } from '~/client/treatments'

const props = defineProps<{
    session: TreatmentSession
    defaultExpanded?: boolean
}>()

const emit = defineEmits<{
    edit: [id: string]
    viewInvoice: [id: string]
}>()

const isExpanded = ref(props.defaultExpanded ?? false)

const toast = useAppToast()

const statusConfig = computed(() => {
    switch (props.session.status) {
        case 'completed': return { label: 'เสร็จสมบูรณ์', class: 'bg-emerald-100 text-emerald-700 border-emerald-200', dotClass: 'bg-emerald-500' }
        case 'appointment': return { label: 'นัดหมาย', class: 'bg-blue-100 text-blue-700 border-blue-200', dotClass: 'bg-blue-500' }
        case 'cancelled': return { label: 'ยกเลิก', class: 'bg-red-100 text-red-600 border-red-200', dotClass: 'bg-red-500' }
        case 'free': return { label: 'ฟรี', class: 'bg-slate-100 text-slate-500 border-slate-200', dotClass: 'bg-slate-400' }
    }
})

const dateInfo = computed(() => formatThaiDate(props.session.date))

const displayPrice = computed(() => {
    if (props.session.status === 'free') return 'ฟรี'
    if (props.session.price === 0 && props.session.courseSession) return 'คอร์ส'
    return `฿${props.session.price.toLocaleString()}`
})

const totalItems = computed(() =>
    props.session.items?.reduce((s, i) => s + i.price, 0) ?? 0
)

const outcomeIconMap: Record<string, string> = {
    'ผลลัพธ์ดี': 'i-lucide-check-circle',
    'ลูกค้าพึงพอใจ': 'i-lucide-smile',
    'ไม่มี complication': 'i-lucide-shield-check',
}
</script>

<template>
    <div
        class="bg-white rounded-2xl border shadow-sm overflow-hidden transition-all"
        :class="session.status === 'appointment' ? 'border-blue-200 border-dashed' : 'border-gray-100'"
    >
        <!-- Collapsed header -->
        <div
            class="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-slate-50/60 transition-colors select-none"
            @click="isExpanded = !isExpanded"
        >
            <!-- Date badge -->
            <div class="shrink-0 w-12 text-center">
                <div class="text-xl font-black text-slate-800 leading-none">{{ dateInfo.day }}</div>
                <div class="text-[10px] font-black text-slate-400 mt-0.5">{{ dateInfo.month }}</div>
            </div>

            <!-- Treatment info -->
            <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 flex-wrap">
                    <span class="text-sm font-black text-slate-800 truncate">
                        {{ session.treatmentName }}
                        <span v-if="session.courseSession"> (ครั้งที่ {{ session.courseSession.current }}/{{ session.courseSession.total }})</span>
                    </span>
                    <span
                        class="text-[10px] font-black px-2 py-0.5 rounded-full border flex items-center gap-1 shrink-0"
                        :class="statusConfig.class"
                    >
                        <span class="w-1.5 h-1.5 rounded-full" :class="statusConfig.dotClass"></span>
                        {{ statusConfig.label }}
                    </span>
                    <!-- Course progress bar -->
                    <div v-if="session.courseSession" class="flex items-center gap-1.5 shrink-0">
                        <span class="text-[10px] font-bold text-slate-400">{{ session.courseSession.current }}/{{ session.courseSession.total }}</span>
                        <div class="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                                class="h-full rounded-full bg-indigo-500 transition-all"
                                :style="{ width: `${(session.courseSession.current / session.courseSession.total) * 100}%` }"
                            ></div>
                        </div>
                    </div>
                </div>
                <div class="flex items-center gap-3 mt-1 text-[11px] font-semibold text-slate-400 flex-wrap">
                    <span class="flex items-center gap-1">
                        <UIcon name="i-lucide-clock" class="w-3 h-3" />
                        {{ dateInfo.full }} · {{ session.duration }} นาที<span v-if="session.status === 'appointment'"> (โดยประมาณ)</span>
                    </span>
                    <span class="flex items-center gap-1">
                        <UIcon name="i-lucide-user" class="w-3 h-3" />{{ session.doctorName }}
                    </span>
                    <span class="flex items-center gap-1">
                        <UIcon name="i-lucide-door-open" class="w-3 h-3" />{{ session.room }}
                    </span>
                </div>
            </div>

            <!-- Price + toggle -->
            <div class="flex items-center gap-3 shrink-0">
                <div class="text-right">
                    <div
                        class="text-sm font-black"
                        :class="session.status === 'free' ? 'text-slate-400' : 'text-slate-800'"
                    >{{ displayPrice }}</div>
                    <div v-if="session.invoiceId" class="text-[10px] font-semibold text-slate-400">{{ session.invoiceId }}</div>
                </div>
                <UIcon
                    name="i-lucide-chevron-down"
                    class="w-4 h-4 text-slate-400 transition-transform duration-200"
                    :class="isExpanded ? 'rotate-180' : ''"
                />
            </div>
        </div>

        <!-- Expanded details -->
        <Transition name="expand">
            <div v-if="isExpanded" class="border-t border-gray-50">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 p-5">
                    <!-- Left: items used -->
                    <div v-if="session.items?.length" class="space-y-3">
                        <!-- Items card -->
                        <div class="rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                            <!-- Card header -->
                            <div class="flex items-center gap-2 px-4 py-2.5 bg-slate-50 border-b border-slate-100">
                                <div class="w-5 h-5 rounded-lg bg-indigo-100 flex items-center justify-center shrink-0">
                                    <UIcon name="i-lucide-package" class="w-3 h-3 text-indigo-600" />
                                </div>
                                <span class="text-[11px] font-black text-slate-500 uppercase tracking-wider">หัตถการและเวชภัณฑ์ที่ใช้</span>
                            </div>
                            <!-- Rows -->
                            <div class="divide-y divide-slate-50">
                                <div
                                    v-for="item in session.items"
                                    :key="item.name"
                                    class="flex items-center justify-between px-4 py-2.5 hover:bg-slate-50/70 transition-colors gap-2"
                                >
                                    <div class="flex items-center gap-2 min-w-0">
                                        <span class="w-1.5 h-1.5 rounded-full bg-indigo-300 shrink-0"></span>
                                        <span class="text-xs font-semibold text-slate-700 truncate">{{ item.name }}</span>
                                        <span v-if="item.lotNumber" class="text-[10px] font-mono font-medium text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded shrink-0">{{ item.lotNumber }}</span>
                                    </div>
                                    <div class="flex items-center gap-4 shrink-0">
                                        <span class="text-[11px] font-semibold text-slate-400 w-14 text-right">{{ item.quantity }} {{ item.unit }}</span>
                                        <span class="text-xs font-bold text-slate-700 w-16 text-right">฿{{ item.price.toLocaleString() }}</span>
                                    </div>
                                </div>
                            </div>
                            <!-- Total row -->
                            <div class="flex items-center justify-between px-4 py-2.5 bg-indigo-50/60 border-t border-indigo-100">
                                <span class="text-xs font-black text-slate-500">รวมทั้งหมด</span>
                                <span class="text-sm font-black text-indigo-600">฿{{ totalItems.toLocaleString() }}</span>
                            </div>
                        </div>

                        <!-- SOAP card -->
                        <div v-if="session.soapNote" class="rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                            <div class="flex items-center gap-2 px-4 py-2.5 bg-slate-50 border-b border-slate-100">
                                <div class="w-5 h-5 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
                                    <UIcon name="i-lucide-file-text" class="w-3 h-3 text-amber-600" />
                                </div>
                                <span class="text-[11px] font-black text-slate-500 uppercase tracking-wider">บันทึกการรักษา (SOAP)</span>
                            </div>
                            <div class="px-4 py-3">
                                <p class="text-xs font-semibold text-slate-600 leading-relaxed border-l-2 border-amber-300 pl-3">
                                    {{ session.soapNote }}
                                </p>
                            </div>
                        </div>

                        <!-- Next plan -->
                        <div v-if="session.nextPlan" class="flex items-center gap-3 bg-indigo-50 rounded-2xl px-4 py-3 border border-indigo-100">
                            <div class="w-7 h-7 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0">
                                <UIcon name="i-lucide-calendar-plus" class="w-3.5 h-3.5 text-indigo-600" />
                            </div>
                            <div>
                                <div class="text-[10px] font-black text-indigo-400 uppercase tracking-wider">แผนถัดไป</div>
                                <div class="text-xs font-bold text-indigo-700 mt-0.5">{{ session.nextPlan }}</div>
                            </div>
                        </div>
                    </div>

                    <!-- Left (no items): vitals placeholder -->
                    <div v-else class="flex items-center justify-center bg-slate-50 rounded-xl p-6 border border-slate-100">
                        <div class="text-center">
                            <UIcon name="i-lucide-clipboard-list" class="w-8 h-8 text-slate-300 mx-auto mb-2" />
                            <p class="text-xs font-semibold text-slate-400">ไม่มีรายการเวชภัณฑ์</p>
                        </div>
                    </div>

                    <!-- Right: vitals + photos + outcomes -->
                    <div class="space-y-4">
                        <!-- Vital signs -->
                        <div v-if="session.vitalSigns">
                            <h4 class="text-xs font-black text-slate-500 uppercase tracking-wider mb-2">VITAL SIGNS ก่อนหัตถการ</h4>
                            <div class="grid grid-cols-4 gap-2">
                                <div class="bg-slate-50 rounded-xl p-2.5 text-center border border-slate-100">
                                    <div class="text-[9px] font-black text-slate-400 uppercase mb-1">BP</div>
                                    <div class="text-xs font-black text-slate-700">{{ session.vitalSigns.bp }}</div>
                                    <div class="text-[9px] text-slate-400">mmHg</div>
                                </div>
                                <div class="bg-slate-50 rounded-xl p-2.5 text-center border border-slate-100">
                                    <div class="text-[9px] font-black text-slate-400 uppercase mb-1">PULSE</div>
                                    <div class="text-xs font-black text-slate-700">{{ session.vitalSigns.pulse }}</div>
                                    <div class="text-[9px] text-slate-400">/นาที</div>
                                </div>
                                <div class="bg-slate-50 rounded-xl p-2.5 text-center border border-slate-100">
                                    <div class="text-[9px] font-black text-slate-400 uppercase mb-1">WEIGHT</div>
                                    <div class="text-xs font-black text-slate-700">{{ session.vitalSigns.weight }}</div>
                                    <div class="text-[9px] text-slate-400">kg</div>
                                </div>
                                <div class="bg-slate-50 rounded-xl p-2.5 text-center border border-slate-100">
                                    <div class="text-[9px] font-black text-slate-400 uppercase mb-1">TEMP</div>
                                    <div class="text-xs font-black text-slate-700">{{ session.vitalSigns.temp }}</div>
                                    <div class="text-[9px] text-slate-400">°C</div>
                                </div>
                            </div>
                        </div>

                        <!-- Before/After photos -->
                        <div v-if="session.photos?.length">
                            <h4 class="text-xs font-black text-slate-500 uppercase tracking-wider mb-2">ภาพถ่าย (BEFORE / AFTER)</h4>
                            <div class="flex gap-2">
                                <div
                                    v-for="photo in session.photos"
                                    :key="photo.date"
                                    class="flex gap-2"
                                >
                                    <div class="relative">
                                        <div class="w-20 h-20 bg-rose-100 rounded-xl flex items-center justify-center border border-rose-200 overflow-hidden">
                                            <span class="text-[10px] font-black text-rose-500">BEFORE</span>
                                        </div>
                                        <span class="absolute bottom-1 left-1 text-[9px] font-black text-white/80 bg-black/40 px-1 rounded">{{ photo.date }}</span>
                                    </div>
                                    <div class="relative">
                                        <div class="w-20 h-20 bg-emerald-100 rounded-xl flex items-center justify-center border border-emerald-200 overflow-hidden">
                                            <span class="text-[10px] font-black text-emerald-600">AFTER</span>
                                        </div>
                                        <span class="absolute bottom-1 left-1 text-[9px] font-black text-white/80 bg-black/40 px-1 rounded">{{ photo.date }}</span>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    class="w-20 h-20 bg-slate-50 rounded-xl flex flex-col items-center justify-center border border-dashed border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors text-slate-400"
                                    @click="toast.info('เพิ่มรูปภาพ', 'ฟีเจอร์อัปโหลดรูปกำลังพัฒนา')"
                                >
                                    <UIcon name="i-lucide-plus" class="w-4 h-4 mb-1" />
                                    <span class="text-[9px] font-bold">+ เพิ่ม</span>
                                </button>
                            </div>
                        </div>

                        <!-- Outcomes -->
                        <div v-if="session.outcomes?.length">
                            <h4 class="text-xs font-black text-slate-500 uppercase tracking-wider mb-2">การประเมินผล</h4>
                            <div class="flex flex-wrap gap-1.5">
                                <span
                                    v-for="outcome in session.outcomes"
                                    :key="outcome"
                                    class="inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200"
                                >
                                    <UIcon :name="outcomeIconMap[outcome] || 'i-lucide-check'" class="w-3 h-3" />
                                    {{ outcome }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Footer -->
                <div class="border-t border-gray-50 px-5 py-3 flex items-center justify-between bg-slate-50/40">
                    <div class="text-[10px] font-semibold text-slate-400">
                        <span v-if="session.createdAt">บันทึกครั้งแรก {{ session.createdAt }}</span>
                        <span v-if="session.updatedAt"> · แก้ไขล่าสุด {{ session.updatedAt }}</span>
                        <span v-if="session.createdBy"> โดย {{ session.createdBy }}</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <button
                            v-if="session.invoiceId"
                            type="button"
                            class="text-xs font-bold text-slate-500 hover:text-indigo-600 flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-indigo-50 transition-all cursor-pointer"
                            @click="emit('viewInvoice', session.id)"
                        >
                            <UIcon name="i-lucide-receipt" class="w-3.5 h-3.5" />ดูใบเสร็จ
                        </button>
                        <button
                            v-if="session.photos?.length"
                            type="button"
                            class="text-xs font-bold text-slate-500 hover:text-indigo-600 flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-indigo-50 transition-all cursor-pointer"
                            @click="toast.info('รูปภาพ', 'เปิดแกลเลอรีรูปภาพทั้งหมด')"
                        >
                            <UIcon name="i-lucide-images" class="w-3.5 h-3.5" />รูปภาพทั้งหมด
                        </button>
                        <button
                            type="button"
                            class="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-indigo-50 transition-all cursor-pointer"
                            @click="emit('edit', session.id)"
                        >
                            <UIcon name="i-lucide-pencil" class="w-3.5 h-3.5" />แก้ไข
                        </button>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<style scoped>
.expand-enter-active,
.expand-leave-active {
    transition: all 0.2s ease;
    overflow: hidden;
}
.expand-enter-from,
.expand-leave-to {
    opacity: 0;
    max-height: 0;
}
.expand-enter-to,
.expand-leave-from {
    opacity: 1;
    max-height: 1000px;
}
</style>
