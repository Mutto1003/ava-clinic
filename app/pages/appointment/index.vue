<script setup lang="ts">
    import FilterHeader from '~/components/appointment/FilterHeader.vue'
    import DoctorFilter from '~/components/appointment/DoctorFilter.vue'
    import CalendarGrid from '~/components/appointment/CalendarGrid.vue'
    import SidebarPanel from '~/components/appointment/SidebarPanel.vue'

    definePageMeta({
        layout: 'main',
        middleware: ['auth']
    })

    const toast = useAppToast()

    // Primary Interactive States
    const selectedBranch = ref('ทั้งหมด')
    const selectedDoctor = ref('ทั้งหมด')
    const searchQuery = ref('')
    const selectedDay = ref(17)

    const onSelectDay = (day: number) => {
        selectedDay.value = day
        toast.info('เปลี่ยนวันตรวจ', `แสดงข้อมูลนัดหมายของวันที่ ${day} พฤษภาคม 2569`, {
            icon: 'i-lucide-calendar'
        })
    }

    const onAddAppointment = () => {
        toast.success('เปิดฟอร์มสร้างนัดหมายใหม่', 'กำลังเปิดหน้าต่างกรอกข้อมูลนัดหมายผู้ป่วยใหม่...', {
            icon: 'i-lucide-calendar-plus'
        })
    }

    const onSyncGoogle = () => {
        toast.info('ซิงค์ Google Calendar', 'กำลังดึงและอัปเดตข้อมูลนัดหมายล่าสุดจาก Google Workspace...', {
            icon: 'i-lucide-refresh-cw'
        })
    }

    const onSaveBooking = (payload: any) => {
        toast.success(
            'สร้างนัดหมายสำเร็จ!',
            `จองคิวให้ ${payload.customer} กับ ${payload.doctor} เวลา ${payload.time} น. ที่สาขา${payload.branch} เรียบร้อยแล้ว`,
            { icon: 'i-lucide-check-circle' }
        )
    }
</script>

<template>
    <div class="space-y-6 max-w-7xl mx-auto px-4 py-6 pb-28">
        <!-- Main Top Filter and Header Bar -->
        <FilterHeader
            v-model:selectedBranch="selectedBranch"
            v-model:searchQuery="searchQuery"
            :total-appointments="42"
            @add-appointment="onAddAppointment"
            @sync-google="onSyncGoogle"
        />

        <!-- Doctor Filter Pill Bar -->
        <DoctorFilter
            v-model:selectedDoctor="selectedDoctor"
        />

        <!-- Two Column Content Grid (Main Monthly Calendar Grid + Interactive Right Sidebar Panel) -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch lg:h-[800px]">
            <!-- Left Side: Custom Monthly Calendar view (spans 8 cols) -->
            <div class="lg:col-span-8 flex flex-col h-full">
                <CalendarGrid
                    :selected-branch="selectedBranch"
                    :selected-doctor="selectedDoctor"
                    :search-query="searchQuery"
                    :selected-day="selectedDay"
                    @select-day="onSelectDay"
                />
            </div>

            <!-- Right Side: Sticky Appointment Side Booking Panel (spans 4 cols) -->
            <div class="lg:col-span-4 lg:sticky lg:top-24 h-full" >
                <SidebarPanel
                    :selected-day="selectedDay"
                    @save-booking="onSaveBooking"
                />
            </div>
        </div>
    </div>
</template>

<style scoped>
    /* Premium smooth entrance animations */
    .grid {
        animation: slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    @keyframes slide-up {
        0% {
            opacity: 0;
            transform: translateY(16px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>
