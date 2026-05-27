<script setup lang="ts">
defineProps<{
    form: any
    isEditMode: boolean
}>()

const emit = defineEmits<{
    edit: []
    back: []
}>()

const route = useRoute()
const customerId = computed(() => route.params.id)
</script>

<template>
    <div class="bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 rounded-3xl p-6 md:p-8 text-white shadow-xl shadow-indigo-950/20 mb-8 relative overflow-hidden">
        <div class="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div class="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>

        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div class="flex items-center gap-4">
                <div class="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shrink-0 shadow-lg">
                    <UIcon name="i-heroicons-user" class="w-7 h-7 text-indigo-300" />
                </div>
                <div>
                    <h1 class="text-xl md:text-2xl font-extrabold flex items-center gap-3 tracking-tight">
                        ข้อมูลเวชระเบียน: {{ form.title + form.firstName + ' ' + form.lastName }}
                        <span class="text-xs font-bold bg-indigo-500/30 text-white border border-white/20 px-2.5 py-0.5 rounded-full backdrop-blur-md">HN {{ form.hn }}</span>
                    </h1>
                    <p class="text-xs md:text-sm text-indigo-200/80 mt-1 font-medium">ดูประวัติส่วนตัว สัญญาการติดต่อ ประวัติทางสุขภาพ และการยินยอม PDPA</p>
                </div>
            </div>
            <div class="flex items-center gap-3">
                <NuxtLink
                    v-if="!isEditMode"
                    :to="`/customerInfo/${customerId}/treatment`"
                    class="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs md:text-sm px-5 py-2.5 rounded-2xl flex items-center gap-2 shadow-lg transition-all cursor-pointer transform hover:-translate-y-0.5"
                >
                    <UIcon name="i-lucide-clipboard-list" class="w-4 h-4 text-indigo-300" />
                    <span>ประวัติการรักษา</span>
                </NuxtLink>
                <button
                    v-if="!isEditMode"
                    type="button"
                    class="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs md:text-sm px-6 py-2.5 rounded-2xl flex items-center gap-2 shadow-lg transition-all cursor-pointer transform hover:-translate-y-0.5"
                    @click="emit('edit')"
                >
                    <UIcon name="i-lucide-edit" class="w-4 h-4 text-indigo-300" />
                    <span>แก้ไขประวัติ</span>
                </button>
                <button
                    type="button"
                    class="bg-indigo-600/60 hover:bg-indigo-600/80 border border-indigo-500/40 text-white font-bold text-xs px-4 py-2.5 rounded-2xl transition-all cursor-pointer"
                    @click="emit('back')"
                >
                    ย้อนกลับ ➔
                </button>
            </div>
        </div>
    </div>
</template>
