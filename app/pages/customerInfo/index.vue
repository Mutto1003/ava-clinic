<script setup lang="ts">
    definePageMeta({
        layout: 'main',
        middleware: ['auth']
    })
</script>

<template>
    <div class="max-w-7xl mx-auto px-6 lg:px-8 py-6 pb-8">
        <!-- Main Container matching customerNew spacing & styles -->
        <div
            class="bg-white rounded-3xl shadow-xl shadow-blue-900/5 ring-1 ring-gray-100 flex flex-col h-full overflow-hidden"
        >
            <!-- Header Component -->
            <CustomerInfoHeader />

            <!-- Toolbar (Search & Filters) Component -->
            <CustomerInfoToolbar />

            <!-- Main Table Component -->
            <CustomerInfoTable />

            <!-- Pagination Component -->
            <CustomerInfoPagination />
        </div>
    </div>
</template>
