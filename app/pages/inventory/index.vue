<script setup lang="ts">
    import Header from '~/components/inventory/Header.vue'
    import AlertCards from '~/components/inventory/AlertCards.vue'
    import InventorySidebar from '~/components/inventory/InventorySidebar.vue'
    import ItemTable from '~/components/inventory/ItemTable.vue'
    import ExpirySection from '~/components/inventory/ExpirySection.vue'
    import MovementsSection from '~/components/inventory/MovementsSection.vue'
    import ValueChart from '~/components/inventory/ValueChart.vue'
    import type { InventoryData } from '~/client/inventory'

    definePageMeta({
        layout: 'main',
        middleware: ['auth']
    })

    const { data: inventoryData, pending } = useFetch<{ status: string; data: InventoryData }>('/api/inventory')
</script>

<template>
    <div class="max-w-7xl mx-auto px-6 lg:px-8 py-6 pb-8">
        <div class="relative min-h-[80vh]">
            <div
                v-if="pending"
                class="absolute inset-0 bg-[#fcfcfd]/50 backdrop-blur-sm z-50 flex items-center justify-center rounded-3xl"
            >
                <UIcon name="i-heroicons-arrow-path" class="w-10 h-10 text-indigo-600 animate-spin" />
            </div>

            <div v-if="inventoryData?.data" class="space-y-5">
                <!-- Header -->
                <Header :summary="inventoryData.data.summary" />

                <!-- Alert Cards -->
                <AlertCards :summary="inventoryData.data.summary" />

                <!-- Main content: Sidebar + Table -->
                <div class="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-5">
                    <InventorySidebar
                        :summary="inventoryData.data.summary"
                        :categories="inventoryData.data.categories"
                        :locations="inventoryData.data.locations"
                    />
                    <ItemTable :items="inventoryData.data.items" />
                </div>

                <!-- Bottom sections -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <ExpirySection :expiring="inventoryData.data.expiring" />
                    <MovementsSection :movements="inventoryData.data.movements" />
                </div>

                <!-- Value Chart -->
                <ValueChart
                    :categoryValues="inventoryData.data.categoryValues"
                    :summary="inventoryData.data.summary"
                />
            </div>
        </div>
    </div>
</template>
