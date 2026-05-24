<script setup lang="ts">
    import type { BillingData } from '~/client/settings/billing'

    const props = defineProps<{ channels: BillingData['paymentChannels'] }>()
    const emit = defineEmits<{ 'update:channels': [v: BillingData['paymentChannels']] }>()

    function toggleChannel(id: string) {
        const updated = props.channels.map(c =>
            c.id === id ? { ...c, enabled: !c.enabled } : c
        )
        emit('update:channels', updated)
    }
</script>

<template>
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div class="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-50">
            <div class="flex items-center gap-3">
                <span class="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-black">03</span>
                <div>
                    <h2 class="font-black text-gray-900 text-base">ช่องทางรับชำระจากลูกค้า</h2>
                    <p class="text-[11px] text-gray-400 font-medium mt-0.5">เลือกวิธีที่ลูกค้าใช้จ่ายค่าบริการคลินิก · เปิด/ปิดได้แต่ละช่องทาง</p>
                </div>
            </div>
            <button class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-indigo-600 border border-indigo-200 rounded-xl hover:bg-indigo-50 cursor-pointer transition-colors">
                <UIcon name="i-lucide-plus" class="w-3.5 h-3.5" />
                เพิ่มช่องทาง
            </button>
        </div>

        <div class="divide-y divide-gray-50">
            <div
                v-for="channel in channels"
                :key="channel.id"
                class="flex items-center gap-4 px-6 py-4 hover:bg-gray-50/50 transition-colors"
            >
                <!-- Icon -->
                <div
                    class="w-10 h-10 rounded-xl flex items-center justify-center text-white text-[10px] font-black shrink-0"
                    :class="channel.color"
                >
                    {{ channel.initials }}
                </div>

                <!-- Info -->
                <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2">
                        <span class="text-sm font-bold text-gray-900">{{ channel.name }}</span>
                        <span
                            v-if="channel.isDefault"
                            class="text-[10px] font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100"
                        >★ ค่าเริ่มต้น</span>
                        <span
                            v-if="channel.isPending"
                            class="text-[10px] font-black text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full"
                        >ข้ออยู่</span>
                    </div>
                    <p class="text-[11px] text-gray-400 font-medium mt-0.5">
                        <span v-if="channel.provider">{{ channel.provider }} · </span>
                        {{ channel.fee }}
                        <span v-if="channel.feeNote"> · {{ channel.feeNote }}</span>
                    </p>
                </div>

                <!-- Default toggle label -->
                <span
                    v-if="!channel.isPending && !channel.isDefault"
                    class="text-[11px] text-gray-400 font-medium shrink-0"
                >ตั้งเป็นค่าเริ่มต้น</span>

                <!-- Toggle -->
                <button
                    class="relative w-10 h-5.5 rounded-full transition-colors cursor-pointer shrink-0 focus:outline-none"
                    :class="channel.enabled ? 'bg-indigo-600' : 'bg-gray-200'"
                    :disabled="channel.isPending"
                    @click="toggleChannel(channel.id)"
                >
                    <span
                        class="absolute top-0.5 left-0.5 w-4.5 h-4.5 bg-white rounded-full shadow transition-transform duration-200"
                        :class="channel.enabled ? 'translate-x-4.5' : 'translate-x-0'"
                    />
                </button>

                <!-- Edit -->
                <button
                    v-if="!channel.isPending"
                    class="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                >
                    <UIcon name="i-lucide-pencil" class="w-3.5 h-3.5" />
                </button>
            </div>
        </div>
    </div>
</template>
