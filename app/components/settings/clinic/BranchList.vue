<script setup lang="ts">
    import type { Branch } from '~/client/settings'

    defineProps<{ branches: Branch[] }>()
    const emit = defineEmits<{ add: [] }>()

    const openCount = (branches: Branch[]) => branches.filter((b) => b.isOpen).length
    const pendingCount = (branches: Branch[]) => branches.filter((b) => !b.isOpen).length
</script>

<template>
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div class="flex items-start justify-between px-6 pt-5 pb-4 border-b border-gray-50">
            <div class="flex items-center gap-3">
                <span class="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-black">04</span>
                <div>
                    <h2 class="font-black text-gray-900 text-base">สาขาทั้งหมด</h2>
                    <p class="text-[11px] text-gray-400 font-medium mt-0.5">
                        {{ openCount(branches) }} สาขา
                        <template v-if="pendingCount(branches) > 0">· {{ pendingCount(branches) }} กำลังเปิด</template>
                    </p>
                </div>
            </div>
            <button
                class="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-indigo-600 border border-indigo-200 bg-indigo-50 rounded-xl hover:bg-indigo-100 cursor-pointer transition-colors"
                @click="emit('add')"
            >
                <UIcon name="i-lucide-plus" class="w-3.5 h-3.5" />
                เพิ่มสาขา
            </button>
        </div>

        <div class="divide-y divide-gray-50">
            <div
                v-for="branch in branches"
                :key="branch.id"
                class="flex items-start justify-between px-6 py-4 hover:bg-gray-50/50 transition-colors group"
            >
                <div class="flex items-start gap-3 min-w-0">
                    <div
                        class="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black shrink-0 mt-0.5"
                        :class="branch.isOpen ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-500'"
                    >
                        {{ branch.name.charAt(0) }}
                    </div>
                    <div class="min-w-0">
                        <div class="flex items-center gap-2 flex-wrap">
                            <span class="text-sm font-black text-gray-900">{{ branch.name }}</span>
                            <span
                                v-if="branch.isHQ"
                                class="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-indigo-100 text-indigo-700"
                            >สาขาหลัก</span>
                            <span
                                v-if="!branch.isOpen"
                                class="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-700"
                            >กำลังเปิด</span>
                        </div>
                        <p class="text-[11px] text-gray-400 font-medium mt-0.5 truncate">{{ branch.address }}</p>
                        <div class="flex items-center gap-3 mt-1">
                            <span class="flex items-center gap-1 text-[11px] text-gray-500 font-medium">
                                <UIcon name="i-lucide-phone" class="w-3 h-3" />
                                {{ branch.phone }}
                            </span>
                            <span class="flex items-center gap-1 text-[11px] text-gray-500 font-medium">
                                <UIcon name="i-lucide-users" class="w-3 h-3" />
                                {{ branch.staffCount }} คน
                            </span>
                        </div>
                    </div>
                </div>
                <div class="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-3">
                    <button class="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 cursor-pointer transition-colors">
                        <UIcon name="i-lucide-pencil" class="w-3.5 h-3.5" />
                    </button>
                    <button class="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 cursor-pointer transition-colors">
                        <UIcon name="i-lucide-eye" class="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
