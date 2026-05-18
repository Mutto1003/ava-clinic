<script setup lang="ts">
defineProps<{
    isLoading: boolean
}>()

const emit = defineEmits<{
    cancel: []
    save: []
}>()
</script>

<template>
    <div class="bg-white rounded-3xl p-5 border border-gray-100 shadow-xl shadow-slate-200/30 flex items-center justify-between gap-4">
        <button
            type="button"
            class="px-6 py-2.5 rounded-2xl hover:bg-slate-50 text-slate-500 hover:text-slate-700 font-bold text-xs md:text-sm cursor-pointer transition-all"
            @click="emit('cancel')"
        >
            ยกเลิกการกรอก
        </button>
        <button
            type="button"
            class="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-extrabold text-xs md:text-sm px-8 py-3 rounded-2xl shadow-lg shadow-indigo-500/20 flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 transition-all"
            :disabled="isLoading"
            @click="emit('save')"
        >
            <UIcon v-if="isLoading" name="i-heroicons-arrow-path" class="w-4 h-4 animate-spin" />
            <UIcon v-else name="i-heroicons-check-circle" class="w-4.5 h-4.5" />
            <span>บันทึกข้อมูลลูกค้า</span>
        </button>
    </div>
</template>
