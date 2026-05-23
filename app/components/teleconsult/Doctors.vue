<script setup lang="ts">
    import type { TeleconsultDoctor } from '~/client/teleconsult'

    const props = defineProps<{
        doctors: TeleconsultDoctor[]
    }>()

    const toast = useAppToast()

    const avatarColors: Record<number, string> = {
        1: 'bg-blue-100 text-blue-600',
        2: 'bg-pink-100 text-pink-600',
        3: 'bg-emerald-100 text-emerald-600',
        4: 'bg-purple-100 text-purple-600'
    }

    const getAvatarClass = (doctor: TeleconsultDoctor) =>
        doctor.avatarClass ?? avatarColors[doctor.id] ?? 'bg-gray-100 text-gray-600'

    const availableCount = computed(
        () => props.doctors.filter(d => d.statusColor === 'bg-emerald-500').length
    )
    const busyCount = computed(
        () => props.doctors.filter(d => d.statusColor === 'bg-rose-500').length
    )
</script>

<template>
    <div class="bg-white rounded-2xl ring-1 ring-gray-100 shadow-sm p-5">
        <div class="flex justify-between items-start mb-5">
            <div>
                <h2 class="font-bold text-gray-900 text-lg">ทีมแพทย์ออนไลน์</h2>
                <p class="text-xs text-gray-500 font-medium">
                    <span class="text-emerald-600 font-bold">{{ availableCount }} ท่านพร้อมรับเคส</span>
                    <span class="text-gray-300 mx-1">·</span>
                    <span>{{ busyCount }} ท่านกำลังตรวจ</span>
                </p>
            </div>
            <UButton
                variant="ghost"
                size="xs"
                class="rounded-xl font-bold ring-1 ring-gray-200 text-gray-600 px-3"
                @click="toast.info('มอบหมาย', 'เปิดหน้าจัดการมอบหมายเคส')"
            >
                มอบหมาย
            </UButton>
        </div>

        <div class="space-y-4">
            <div
                v-for="doctor in doctors"
                :key="doctor.id"
                class="flex items-center justify-between"
            >
                <div class="flex items-center gap-3">
                    <div class="relative">
                        <div
                            class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                            :class="getAvatarClass(doctor)"
                        >
                            {{ doctor.initial }}
                        </div>
                        <span
                            class="absolute bottom-0 right-0 w-2.5 h-2.5 border-2 border-white rounded-full"
                            :class="doctor.statusColor"
                        ></span>
                    </div>
                    <div>
                        <div class="flex items-center gap-1.5">
                            <span class="font-bold text-gray-900 text-sm">{{ doctor.name }}</span>
                            <span class="text-[10px] text-gray-400 font-medium">· {{ doctor.specialty }}</span>
                        </div>
                        <div
                            class="text-[11px] font-medium mt-0.5"
                            :class="doctor.statusColor === 'bg-rose-500' ? 'text-rose-500' : 'text-gray-500'"
                        >
                            {{ doctor.status }}
                        </div>
                    </div>
                </div>

                <div class="text-xs text-gray-500 font-medium shrink-0">{{ doctor.cases }} เคส</div>
            </div>
        </div>
    </div>
</template>
