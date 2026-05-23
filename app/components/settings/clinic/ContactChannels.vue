<script setup lang="ts">
    import type { ClinicData } from '~/client/settings'

    const props = defineProps<{ modelValue: ClinicData['contact'] }>()
    const emit = defineEmits<{ 'update:modelValue': [v: ClinicData['contact']] }>()

    const form = computed({
        get: () => props.modelValue,
        set: (v) => emit('update:modelValue', v)
    })
</script>

<template>
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div class="flex items-start justify-between px-6 pt-5 pb-4 border-b border-gray-50">
            <div class="flex items-center gap-3">
                <span class="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-black">03</span>
                <div>
                    <h2 class="font-black text-gray-900 text-base">ช่องทางติดต่อหลัก</h2>
                    <p class="text-[11px] text-gray-400 font-medium mt-0.5">โชว์ในระบบ Teleconsult, ใบเสร็จ, และแจ้งเตือนไปยังลูกค้า</p>
                </div>
            </div>
        </div>

        <div class="p-6 grid grid-cols-3 gap-4">
            <div>
                <label class="block text-[11px] font-black text-gray-600 mb-1.5">เบอร์โทรศัพท์ Call Center</label>
                <div class="relative">
                    <UIcon name="i-lucide-phone" class="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                    <input
                        v-model="form.callCenter"
                        type="tel"
                        class="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 font-medium text-gray-900"
                        placeholder="02-000-0000"
                    />
                </div>
            </div>
            <div>
                <label class="block text-[11px] font-black text-gray-600 mb-1.5">LINE Official</label>
                <div class="relative">
                    <span class="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-green-500 flex items-center justify-center" />
                    <input
                        v-model="form.lineOfficial"
                        type="text"
                        class="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 font-medium text-gray-900"
                        placeholder="@yourline"
                    />
                </div>
            </div>
            <div>
                <label class="block text-[11px] font-black text-gray-600 mb-1.5">อีเมลทางการ</label>
                <div class="relative">
                    <UIcon name="i-lucide-mail" class="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                    <input
                        v-model="form.email"
                        type="email"
                        class="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 font-medium text-gray-900"
                        placeholder="hello@clinic.co.th"
                    />
                </div>
            </div>
            <div>
                <label class="block text-[11px] font-black text-gray-600 mb-1.5">เว็บไซต์</label>
                <div class="relative">
                    <UIcon name="i-lucide-globe" class="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                    <input
                        v-model="form.website"
                        type="text"
                        class="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 font-medium text-gray-900"
                        placeholder="clinic.co.th"
                    />
                </div>
            </div>
            <div>
                <label class="block text-[11px] font-black text-gray-600 mb-1.5">Facebook</label>
                <div class="relative">
                    <UIcon name="i-lucide-facebook" class="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                    <input
                        v-model="form.facebook"
                        type="text"
                        class="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 font-medium text-gray-900"
                        placeholder="facebook.com/..."
                    />
                </div>
            </div>
            <div>
                <label class="block text-[11px] font-black text-gray-600 mb-1.5">Instagram</label>
                <div class="relative">
                    <UIcon name="i-lucide-instagram" class="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                    <input
                        v-model="form.instagram"
                        type="text"
                        class="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 font-medium text-gray-900"
                        placeholder="@clinicname"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
