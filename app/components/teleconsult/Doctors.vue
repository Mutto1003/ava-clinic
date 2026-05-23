<script setup lang="ts">
    interface Doctor {
        id: number
        name: string
        initial: string
        status: string
        statusColor: string
        avatarClass?: string
        cases: number
    }

    defineProps<{
        doctors: Doctor[]
    }>()

    const avatarColors: Record<number, string> = {
        1: 'bg-blue-100 text-blue-600',
        2: 'bg-pink-100 text-pink-600',
        3: 'bg-emerald-100 text-emerald-600',
    }

    const getAvatarClass = (doctor: Doctor) =>
        doctor.avatarClass ?? avatarColors[doctor.id] ?? 'bg-purple-100 text-purple-600'
</script>

<template>
    <div class="bg-white rounded-2xl ring-1 ring-gray-100 shadow-sm p-5">
        <div class="mb-5">
            <h2 class="font-bold text-gray-900 text-lg">ทีมแพทย์ออนไลน์</h2>
            <p class="text-xs text-gray-500 font-medium">3 ท่านพร้อมรับเคส</p>
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
                        <div class="font-bold text-gray-900 text-sm mb-0.5">{{ doctor.name }}</div>
                        <div
                            class="text-[10px] text-gray-500 font-medium"
                            :class="doctor.statusColor === 'bg-rose-500' ? 'text-rose-500' : ''"
                        >
                            {{ doctor.status }}
                        </div>
                    </div>
                </div>

                <div class="text-xs text-gray-500 font-medium">{{ doctor.cases }} เคส</div>
            </div>
        </div>
    </div>
</template>
