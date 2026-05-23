<script setup lang="ts">
    import Header from '~/components/teleconsult/Header.vue'
    import SummaryCards from '~/components/teleconsult/SummaryCards.vue'
    import Schedule from '~/components/teleconsult/Schedule.vue'
    import Statistics from '~/components/teleconsult/Statistics.vue'
    import WaitingRoom from '~/components/teleconsult/WaitingRoom.vue'
    import Shortcuts from '~/components/teleconsult/Shortcuts.vue'
    import Doctors from '~/components/teleconsult/Doctors.vue'
    import type { TeleconsultData } from '~/client/teleconsult'

    definePageMeta({
        layout: 'main',
        middleware: ['auth']
    })

    const { data: teleconsultData, pending } = useFetch<{ status: string; data: TeleconsultData }>('/api/teleconsult')
</script>

<template>
    <div class="p-4 md:p-8 max-w-7xl mx-auto min-h-screen">
        <div class="relative min-h-[80vh]">
            <div
                v-if="pending"
                class="absolute inset-0 bg-[#fcfcfd]/50 backdrop-blur-sm z-50 flex items-center justify-center rounded-3xl"
            >
                <UIcon
                    name="i-heroicons-arrow-path"
                    class="w-10 h-10 text-indigo-600 animate-spin"
                />
            </div>

            <div v-if="teleconsultData?.data" class="space-y-6">
                <Header :summary="teleconsultData.data.summary" />

                <SummaryCards :summary="teleconsultData.data.summary" />

                <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <!-- Left Column (Schedule & Stats) -->
                    <div class="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
                        <Schedule :schedule="teleconsultData.data.schedule" class="flex-1" />
                        <div class="h-80 shrink-0">
                            <Statistics :statistics="teleconsultData.data.statistics" />
                        </div>
                    </div>

                    <!-- Right Column (Wait Room, Doctors, Shortcuts) -->
                    <div class="lg:col-span-5 xl:col-span-4 flex flex-col gap-4">
                        <WaitingRoom
                            :waitingRoom="teleconsultData.data.waitingRoom"
                            :liveConsult="teleconsultData.data.liveConsult"
                        />
                        <Doctors :doctors="teleconsultData.data.doctors" />
                        <Shortcuts />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
