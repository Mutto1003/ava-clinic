<script setup lang="ts">
    const filter = ref('7 วัน')

    // Mock data for the chart
    const chartData = [
        { label: 'อา', value: 7, height: '45%', color: 'bg-indigo-500' },
        { label: 'จ', value: 9, height: '60%', color: 'bg-indigo-500' },
        { label: 'อ', value: 11, height: '75%', color: 'bg-indigo-500' },
        { label: 'พ', value: 10, height: '65%', color: 'bg-indigo-500' },
        { label: 'พฤ', value: 13, height: '90%', color: 'bg-indigo-500' },
        { label: 'ศ', value: 5, height: '30%', color: 'bg-indigo-200' },
        { label: 'วันนี้', value: 9, height: '60%', color: 'bg-indigo-500', isDashed: true }
    ]
</script>

<template>
    <div class="bg-white rounded-2xl ring-1 ring-gray-100 shadow-sm p-5 h-full flex flex-col">
        <div class="flex justify-between items-start mb-8">
            <div>
                <h2 class="font-bold text-gray-900 text-lg">สถิติ 7 วันย้อนหลัง</h2>
                <p class="text-xs text-gray-500 font-medium">จำนวนเซสชัน · เฉลี่ย 9.4 / วัน</p>
            </div>

            <USelectMenu
                v-model="filter"
                :options="['7 วัน', '14 วัน', '30 วัน']"
                size="sm"
                class="w-24"
            />
        </div>

        <div class="flex-1 relative mt-4">
            <!-- Y Axis Labels -->
            <div
                class="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-[10px] text-gray-400 font-medium w-6"
            >
                <span>15</span>
                <span>10</span>
                <span>5</span>
                <span>0</span>
            </div>

            <!-- Grid Lines -->
            <div class="absolute left-8 right-0 top-0 bottom-6 flex flex-col justify-between">
                <div class="w-full border-t border-gray-100/50"></div>
                <div class="w-full border-t border-gray-100/50"></div>
                <div class="w-full border-t border-gray-100/50"></div>
                <div class="w-full border-t border-gray-100/50"></div>
            </div>

            <!-- Bars -->
            <div class="absolute left-8 right-0 top-0 bottom-6 flex justify-around items-end px-2">
                <div
                    v-for="(item, index) in chartData"
                    :key="index"
                    class="w-8 flex flex-col items-center group"
                >
                    <span
                        class="text-[10px] font-bold text-indigo-500 mb-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >{{ item.value }}</span
                    >
                    <div
                        class="w-full rounded-t-sm transition-all duration-500 group-hover:brightness-110"
                        :class="[
                            item.color,
                            item.isDashed
                                ? 'border-2 border-dashed border-indigo-300 bg-indigo-50/50'
                                : 'shadow-sm'
                        ]"
                        :style="{ height: item.height }"
                    ></div>
                </div>
            </div>

            <!-- X Axis Labels -->
            <div class="absolute left-8 right-0 bottom-0 flex justify-around px-2">
                <div
                    v-for="(item, index) in chartData"
                    :key="index"
                    class="w-8 text-center text-[10px] font-medium text-gray-500"
                >
                    {{ item.label }}
                </div>
            </div>
        </div>
    </div>
</template>
