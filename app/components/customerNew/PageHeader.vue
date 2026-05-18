<script setup lang="ts">
const emit = defineEmits<{
    scan: []
    cancel: []
}>()
</script>

<template>
    <div class="bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 rounded-3xl p-6 md:p-8 text-white shadow-xl shadow-indigo-950/20 mb-8 relative overflow-hidden">
        <div class="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div class="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>

        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div class="flex items-center gap-4">
                <div class="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shrink-0 shadow-lg transition-transform hover:scale-105 duration-300">
                    <UIcon name="i-heroicons-user-plus" class="w-7 h-7 text-indigo-300" />
                </div>
                <div>
                    <h1 class="text-xl md:text-2xl font-extrabold flex items-center gap-3 tracking-tight">
                        ลงทะเบียนลูกค้าใหม่
                        <span class="text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full backdrop-blur-md">HN AUTO</span>
                    </h1>
                    <p class="text-xs md:text-sm text-indigo-200/80 mt-1 font-medium">บันทึกข้อมูลประวัติผู้ป่วยใหม่เพื่อรับการตรวจและประเมินอาการ</p>
                </div>
            </div>

            <div class="flex items-center gap-3">
                <button
                    type="button"
                    class="bg-indigo-600/80 hover:bg-indigo-600 border border-indigo-500/40 text-white font-bold text-xs px-5 py-2.5 rounded-2xl flex items-center gap-2 shadow-lg shadow-indigo-900/40 transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
                    @click="emit('scan')"
                >
                    <UIcon name="i-heroicons-identification" class="w-4.5 h-4.5" />
                    <span>เสียบบัตรประชาชน</span>
                </button>
                <button
                    type="button"
                    class="bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold text-xs px-4 py-2.5 rounded-2xl transition-all cursor-pointer"
                    @click="emit('cancel')"
                >
                    ยกเลิก
                </button>
            </div>
        </div>
    </div>
</template>
