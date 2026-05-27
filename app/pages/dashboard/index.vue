<script setup lang="ts">
    definePageMeta({
        layout: 'main',
        middleware: ['auth']
    })
</script>

<template>
    <div class="max-w-7xl mx-auto px-6 lg:px-8 py-6 pb-8 flex flex-col gap-5">
        <!-- Clinic Header Banner -->
        <DashboardClinicHeader />

        <!-- Main two-column layout -->
        <div class="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-5 items-start">
            <DashboardAppointmentTable />
            <div class="flex flex-col gap-4">
                <DashboardAnnouncementCard />
                <DashboardRecentActivities />
            </div>
        </div>
    </div>
</template>
