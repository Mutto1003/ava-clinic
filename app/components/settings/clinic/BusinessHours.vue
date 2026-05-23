<script setup lang="ts">
    import type { BusinessHourDay } from '~/client/settings'

    const props = defineProps<{ modelValue: BusinessHourDay[] }>()
    const emit = defineEmits<{ 'update:modelValue': [v: BusinessHourDay[]] }>()

    const hours = computed({
        get: () => props.modelValue,
        set: (v) => emit('update:modelValue', v)
    })

    function toggleDay(index: number) {
        const updated = hours.value.map((h, i) => i === index ? { ...h, open: !h.open } : h)
        emit('update:modelValue', updated)
    }

    function updateTime(index: number, field: 'start' | 'end', value: string) {
        const updated = hours.value.map((h, i) => i === index ? { ...h, [field]: value } : h)
        emit('update:modelValue', updated)
    }
</script>

<template>
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div class="flex items-start justify-between px-6 pt-5 pb-4 border-b border-gray-50">
            <div class="flex items-center gap-3">
                <span class="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-black">05</span>
                <div>
                    <h2 class="font-black text-gray-900 text-base">เวลาทำการ (สำนักงานใหญ่)</h2>
                    <p class="text-[11px] text-gray-400 font-medium mt-0.5">ใช้ระบบของ Google Business · ให้ตรงกันกับเวลาที่แสดงใน Google Search</p>
                </div>
            </div>
            <button class="text-[11px] font-bold text-indigo-600 hover:underline cursor-pointer shrink-0">คลอกลิงก์สุขภาพ</button>
        </div>

        <div class="p-6 space-y-1">
            <div
                v-for="(day, index) in hours"
                :key="day.day"
                class="flex items-center gap-4 py-2.5 border-b border-gray-50 last:border-0"
            >
                <span class="w-24 text-sm font-bold text-gray-700 shrink-0">• {{ day.day }}</span>
                <template v-if="day.open">
                    <div class="flex items-center gap-2 flex-1">
                        <input
                            :value="day.start"
                            type="time"
                            class="px-2.5 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-400 font-mono text-gray-900 w-24"
                            @input="updateTime(index, 'start', ($event.target as HTMLInputElement).value)"
                        />
                        <span class="text-gray-300 font-medium">—</span>
                        <input
                            :value="day.end"
                            type="time"
                            class="px-2.5 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-400 font-mono text-gray-900 w-24"
                            @input="updateTime(index, 'end', ($event.target as HTMLInputElement).value)"
                        />
                    </div>
                </template>
                <template v-else>
                    <div class="flex items-center gap-2 flex-1">
                        <span class="text-sm text-gray-300 font-medium px-2.5 py-1.5">—</span>
                        <span class="text-sm text-gray-300 font-medium">—</span>
                        <span class="text-sm text-gray-300 font-medium px-2.5 py-1.5">—</span>
                    </div>
                </template>
                <!-- Toggle -->
                <button
                    class="relative inline-flex h-5 w-9 items-center rounded-full transition-colors cursor-pointer shrink-0"
                    :class="day.open ? 'bg-indigo-600' : 'bg-gray-200'"
                    @click="toggleDay(index)"
                >
                    <span
                        class="inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform"
                        :class="day.open ? 'translate-x-[18px]' : 'translate-x-[3px]'"
                    />
                </button>
            </div>
        </div>

        <div class="px-6 pb-5">
            <p class="text-[10px] text-gray-400 font-medium">
                <UIcon name="i-lucide-info" class="w-3 h-3 inline-block mr-1 text-gray-400" />
                วันหยุดและวันพิเศษสามารถเพิ่มได้ที่
                <button class="text-indigo-600 font-bold hover:underline cursor-pointer">"การแจ้งหยุด · ปฏิทินคลินิก"</button>
            </p>
        </div>
    </div>
</template>
