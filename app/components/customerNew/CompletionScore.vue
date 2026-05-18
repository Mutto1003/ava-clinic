<script setup lang="ts">
defineProps<{
    progressList: { label: string; done: boolean }[]
    completionProgress: number
}>()
</script>

<template>
    <div class="bg-white rounded-3xl p-6 border border-gray-100 shadow-xl shadow-slate-200/40 relative">
        <h4 class="text-sm font-bold text-slate-700 mb-3 flex items-center justify-between">
            <span>ความสมบูรณ์ของเอกสาร</span>
            <span class="text-indigo-600 font-black text-base">{{ completionProgress }}%</span>
        </h4>
        <div class="h-2 w-full bg-slate-100 rounded-full mb-5 overflow-hidden">
            <div
                class="h-full bg-gradient-to-r from-indigo-600 to-blue-500 rounded-full transition-all duration-500"
                :style="{ width: completionProgress + '%' }"
            ></div>
        </div>
        <div class="space-y-3">
            <div
                v-for="item in progressList"
                :key="item.label"
                class="flex items-center gap-2.5 text-xs md:text-sm"
            >
                <div
                    class="w-4.5 h-4.5 rounded-lg flex items-center justify-center shrink-0 border transition-all"
                    :class="item.done ? 'bg-emerald-500 border-emerald-400 text-white' : 'border-gray-200 bg-slate-50 text-transparent'"
                >
                    <UIcon name="i-lucide-check" class="w-3 h-3 stroke-[3]" />
                </div>
                <span
                    class="font-bold transition-all duration-300"
                    :class="item.done ? 'text-slate-700' : 'text-slate-400'"
                >{{ item.label }}</span>
            </div>
        </div>
    </div>
</template>
