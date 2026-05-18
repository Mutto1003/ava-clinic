<script setup lang="ts">
    const props = defineProps<{
        selectedDoctor: string
    }>()

    const emit = defineEmits<{
        (e: 'update:selectedDoctor', value: string): void
    }>()

    // 6 Doctors with counts matching the image exactly
    const doctors = [
        { name: 'ทั้งหมด', initial: 'ทม', count: '6', color: 'bg-indigo-50 text-indigo-600' },
        { name: 'ธนดล สวัสดี', initial: 'ธด', count: '15d', color: 'bg-blue-500 text-white' },
        { name: 'พิมลภา จันทร์เพ็ญ', initial: 'พม', count: '13d', color: 'bg-pink-500 text-white' },
        { name: 'นันทกานต์ ภู่กัน', initial: 'นก', count: '9d', color: 'bg-emerald-500 text-white' },
        { name: 'สมศักดิ์ พัฒนกุล', initial: 'สศ', count: '7d', color: 'bg-amber-500 text-white' },
        { name: 'เจลิม คงสกุล', initial: 'จค', count: '6d', color: 'bg-violet-500 text-white' },
        { name: 'วิวัฒน์ มงคล', initial: 'วม', count: '8d', color: 'bg-rose-500 text-white' }
    ]

    const selectDoctor = (name: string) => {
        emit('update:selectedDoctor', name)
    }
</script>

<template>
    <div class="bg-white rounded-3xl p-4 border border-gray-100 shadow-sm flex items-center gap-4 overflow-x-auto scrollbar-none">
        <!-- Left Label -->
        <span class="text-xs md:text-sm font-bold text-slate-400 shrink-0 select-none pl-1">แพทย์</span>

        <!-- Doctor Pills List -->
        <div class="flex items-center gap-2.5">
            <button
                v-for="doc in doctors"
                :key="doc.name"
                type="button"
                class="px-3.5 py-1.5 rounded-full border text-xs md:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm shrink-0"
                :class="[
                    selectedDoctor === doc.name
                        ? 'ring-2 ring-indigo-500 ring-offset-1 font-black bg-indigo-50 text-indigo-700 border-indigo-200'
                        : 'bg-slate-50 hover:bg-slate-100/80 border-slate-200/60 text-slate-700'
                ]"
                @click="selectDoctor(doc.name)"
            >
                <!-- circular initial/avatar -->
                <span 
                    v-if="doc.name !== 'ทั้งหมด'"
                    class="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black shrink-0"
                    :class="doc.color"
                >
                    {{ doc.initial }}
                </span>
                
                <span>{{ doc.name }}</span>
                
                <!-- Count suffix -->
                <span 
                    class="text-[9px] font-bold"
                    :class="selectedDoctor === doc.name ? 'text-indigo-500' : 'text-slate-400'"
                >
                    {{ doc.count }}
                </span>
            </button>
        </div>
    </div>
</template>

<style scoped>
    /* Hide scrollbar for clean horizontal swipe on touch devices */
    .scrollbar-none::-webkit-scrollbar {
        display: none;
    }
    .scrollbar-none {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
</style>
