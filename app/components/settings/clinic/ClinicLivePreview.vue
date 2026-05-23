<script setup lang="ts">
    import type { ClinicData } from '~/client/settings'

    defineProps<{ clinic: ClinicData }>()

    const colorMap: Record<string, string> = {
        violet: 'from-violet-600 via-purple-600 to-fuchsia-700',
        emerald: 'from-emerald-500 via-teal-600 to-green-700',
        blue: 'from-blue-500 via-indigo-600 to-violet-700',
        pink: 'from-pink-500 via-rose-600 to-fuchsia-700',
        amber: 'from-amber-500 via-orange-500 to-red-600',
        custom: 'from-indigo-600 via-violet-600 to-purple-700'
    }
</script>

<template>
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div class="flex items-center justify-between px-5 pt-4 pb-3 border-b border-gray-50">
            <h3 class="font-black text-gray-900 text-sm">LIVE PREVIEW · ตัวอย่าง</h3>
            <div class="flex items-center gap-1 text-[9px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                LIVE
            </div>
        </div>

        <div class="p-5">
            <!-- Clinic card -->
            <div class="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                <!-- Header gradient -->
                <div
                    class="h-16 bg-gradient-to-br relative"
                    :class="colorMap[clinic.brand.primaryColor] || colorMap['violet']"
                >
                    <div class="absolute inset-0 bg-black/10" />
                    <div class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                        <div
                            class="w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg font-black shadow-lg bg-gradient-to-br"
                            :class="colorMap[clinic.brand.primaryColor] || colorMap['violet']"
                        >
                            {{ clinic.brand.nameEn?.charAt(0) || 'A' }}
                        </div>
                    </div>
                </div>

                <!-- Content -->
                <div class="pt-8 pb-5 px-4 text-center">
                    <p class="font-black text-gray-900 text-sm">{{ clinic.brand.nameEn || 'CLINIC NAME' }}</p>
                    <p class="text-[10px] text-gray-400 font-medium mt-0.5">{{ clinic.brand.nameTh || 'ชื่อคลินิก' }}</p>
                </div>

                <!-- Info rows -->
                <div class="border-t border-gray-50 px-4 py-3 space-y-2">
                    <div
                        v-if="clinic.license.taxId"
                        class="flex items-center justify-between"
                    >
                        <span class="text-[10px] text-gray-400 font-medium">เลขผู้เสียภาษี</span>
                        <span class="text-[10px] font-bold text-gray-700 font-mono">{{ clinic.license.taxId }}</span>
                    </div>
                    <div
                        v-if="clinic.license.licenseNumber"
                        class="flex items-center justify-between"
                    >
                        <span class="text-[10px] text-gray-400 font-medium">ที่อยู่</span>
                        <span class="text-[10px] font-bold text-gray-700">{{ clinic.license.licenseNumber }}</span>
                    </div>
                    <div
                        v-if="clinic.contact.callCenter"
                        class="flex items-center justify-between"
                    >
                        <span class="text-[10px] text-gray-400 font-medium">โทร</span>
                        <span class="text-[10px] font-bold text-gray-700">{{ clinic.contact.callCenter }}</span>
                    </div>
                    <div
                        v-if="clinic.contact.lineOfficial"
                        class="flex items-center justify-between"
                    >
                        <span class="text-[10px] text-gray-400 font-medium">LINE</span>
                        <span class="text-[10px] font-bold text-gray-700">{{ clinic.contact.lineOfficial }}</span>
                    </div>
                    <div
                        v-if="clinic.contact.website"
                        class="flex items-center justify-between"
                    >
                        <span class="text-[10px] text-gray-400 font-medium">เว็บไซต์</span>
                        <span class="text-[10px] font-bold text-indigo-600">{{ clinic.contact.website }}</span>
                    </div>
                </div>

                <!-- Invoice format sample -->
                <div class="border-t border-gray-50 px-4 py-2.5 bg-gray-50/50">
                    <p class="text-[9px] text-gray-400 font-medium text-center">
                        INV-XXXX · ออกโดย <span class="font-black text-gray-600">{{ clinic.brand.nameEn || 'AVACLINIC' }}</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
