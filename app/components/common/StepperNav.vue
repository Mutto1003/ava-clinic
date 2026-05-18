<script setup lang="ts">
const props = defineProps<{
    activeTab: number
    steps: { label: string }[]
}>()

const emit = defineEmits<{
    (e: 'select', index: number): void
}>()
</script>

<template>
    <div class="flex flex-wrap gap-2 md:gap-4 flex-1">
        <button
            v-for="(step, i) in steps"
            :key="step.label"
            type="button"
            class="flex items-center gap-2 px-3 py-2 rounded-xl transition-all cursor-pointer font-bold text-xs md:text-sm"
            :class="activeTab === i + 1 ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-50 text-slate-400 hover:bg-slate-100/80 hover:text-slate-600'"
            @click="emit('select', i + 1)"
        >
            <span
                class="w-5 h-5 rounded-lg flex items-center justify-center text-xs"
                :class="activeTab === i + 1 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'"
            >{{ i + 1 }}</span>
            <span>{{ step.label }}</span>
        </button>
    </div>
</template>
