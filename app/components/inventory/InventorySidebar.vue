<script setup lang="ts">
    import type { InventorySummary, InventoryCategory, InventoryLocation } from '~/client/inventory'

    defineProps<{
        summary: InventorySummary
        categories: InventoryCategory[]
        locations: InventoryLocation[]
    }>()
</script>

<template>
    <div class="bg-white rounded-2xl ring-1 ring-gray-100 shadow-sm p-5 flex flex-col gap-5">
        <!-- ภาพรวม -->
        <div>
            <div class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">ภาพรวม</div>
            <div class="flex flex-col gap-1.5">
                <button
                    class="flex items-center justify-between px-3 py-2 rounded-xl bg-indigo-50 text-indigo-700 font-semibold text-sm"
                >
                    <span class="flex items-center gap-2">
                        <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
                        ทั้งหมด
                    </span>
                    <span class="text-xs font-bold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
                        {{ summary.totalItems }}
                    </span>
                </button>
                <button
                    class="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-gray-50 text-gray-600 text-sm transition-colors"
                >
                    <span class="flex items-center gap-2">
                        <span class="w-2 h-2 rounded-full bg-yellow-400"></span>
                        สต็อกต่ำ
                    </span>
                    <span class="text-xs font-bold text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded-full">
                        {{ summary.lowStock }}
                    </span>
                </button>
                <button
                    class="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-gray-50 text-gray-600 text-sm transition-colors"
                >
                    <span class="flex items-center gap-2">
                        <span class="w-2 h-2 rounded-full bg-orange-400"></span>
                        หมดอายุเร็วๆ
                    </span>
                    <span class="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                        {{ summary.expiringSoon }}
                    </span>
                </button>
            </div>
        </div>

        <div class="border-t border-gray-100"></div>

        <!-- หมวดสินค้า -->
        <div>
            <div class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">หมวดสินค้า</div>
            <div class="flex flex-col gap-1">
                <button
                    v-for="cat in categories"
                    :key="cat.name"
                    class="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-gray-50 text-gray-600 text-sm transition-colors"
                >
                    <span class="flex items-center gap-2">
                        <span class="w-2.5 h-2.5 rounded-full flex-shrink-0" :style="{ background: cat.color }"></span>
                        <span class="text-left">{{ cat.name }}</span>
                    </span>
                    <span class="text-xs font-semibold text-gray-400">{{ cat.count }}</span>
                </button>
            </div>
        </div>

        <div class="border-t border-gray-100"></div>

        <!-- ตำแหน่งเก็บ -->
        <div>
            <div class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">ตำแหน่งเก็บ</div>
            <div class="flex flex-col gap-1">
                <button
                    v-for="loc in locations"
                    :key="loc.name"
                    class="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-gray-50 text-gray-600 text-sm transition-colors"
                >
                    <span class="flex items-center gap-2">
                        <UIcon name="i-lucide-archive" class="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                        <span>{{ loc.name }}</span>
                    </span>
                    <span class="text-xs font-semibold text-gray-400">{{ loc.count }}</span>
                </button>
            </div>
        </div>
    </div>
</template>
