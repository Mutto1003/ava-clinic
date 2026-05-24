<script setup lang="ts">
    definePageMeta({
        layout: 'main',
        middleware: ['auth']
    })
</script>

<template>
    <div class="dash-page">
        <!-- Clinic Header Banner -->
        <DashboardClinicHeader />

        <!-- Main two-column layout -->
        <div class="main-grid">
            <!-- Left: Appointment Table -->
            <div class="table-col">
                <DashboardAppointmentTable />
            </div>

            <!-- Right: Announcement + Activities -->
            <div class="right-col">
                <DashboardAnnouncementCard />
                <DashboardRecentActivities />
            </div>
        </div>
    </div>
</template>

<style scoped>
    .dash-page {
        max-width: 1280px;
        margin: 0 auto;
        padding: 0 4px 32px;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    .main-grid {
        display: grid;
        grid-template-columns: 1fr 340px;
        gap: 20px;
        align-items: start;
    }
    .table-col {
        min-width: 0;
    }
    .right-col {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    @media (max-width: 1024px) {
        .main-grid {
            grid-template-columns: 1fr;
        }
    }
</style>
