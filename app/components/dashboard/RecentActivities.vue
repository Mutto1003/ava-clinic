<script setup lang="ts">
    import { ref } from 'vue'

    const toast = useAppToast()
    const isRefreshing = ref(false)

    // Dynamic list of activities matching the precise UI specification
    const activities = ref([
        {
            id: 1,
            icon: 'i-lucide-circle-check',
            bgClass: 'bg-emerald-50/80',
            iconClass: 'text-emerald-500',
            prefix: 'เช็คอินลูกค้าใหม่',
            highlight: 'คุณวิไลพร มั่นคง',
            time: '10 นาทีที่แล้ว'
        },
        {
            id: 2,
            icon: 'i-lucide-receipt',
            bgClass: 'bg-blue-50/80',
            iconClass: 'text-blue-500',
            prefix: 'ออกใบเสร็จรับเงิน',
            highlight: '฿8,500 · คุณลินิ แสงทอง',
            time: '45 นาทีที่แล้ว'
        },
        {
            id: 3,
            icon: 'i-lucide-phone',
            bgClass: 'bg-amber-50/80',
            iconClass: 'text-amber-500',
            prefix: 'โทรยืนยันนัด',
            highlight: 'คุณธนภูมิ ยิ่งใหญ่ · 14:00',
            time: '1 ชม. ที่แล้ว'
        },
        {
            id: 4,
            icon: 'i-lucide-pencil',
            bgClass: 'bg-red-50/80',
            iconClass: 'text-red-400',
            prefix: 'แก้ไขเวลานัด',
            highlight: 'คุณวารี ➔ ยกเลิก',
            time: '2 ชม. ที่แล้ว'
        },
        {
            id: 5,
            icon: 'i-lucide-user-plus',
            bgClass: 'bg-purple-50/80',
            iconClass: 'text-purple-500',
            prefix: 'เพิ่มลูกค้าใหม่',
            highlight: 'HN 6700883 · คุณวารี มีสุข',
            time: '3 ชม. ที่แล้ว'
        },
        {
            id: 6,
            icon: 'i-lucide-camera',
            bgClass: 'bg-violet-50/80',
            iconClass: 'text-violet-500',
            prefix: 'อัปโหลดรูปก่อน-หลัง',
            highlight: 'คุณลินิ แสงทอง · 4 รูป',
            time: '4 ชม. ที่แล้ว'
        }
    ])

    const refresh = () => {
        if (isRefreshing.value) return
        isRefreshing.value = true
        setTimeout(() => {
            isRefreshing.value = false
            toast.success('อัปเดตข้อมูล', 'ดึงข้อมูลกิจกรรมล่าสุดเรียบร้อยแล้ว')
        }, 800)
    }
</script>

<template>
    <div class="bg-white rounded-3xl p-6 md:p-7 border border-gray-100 shadow-xl shadow-slate-200/40 relative overflow-hidden group">
        <!-- Card Header -->
        <div class="flex items-center justify-between pb-4 border-b border-gray-100">
            <div class="flex items-center gap-3">
                <!-- Vertical purple pill bar -->
                <div class="w-1.5 h-6 bg-indigo-600 rounded-full shadow-sm shadow-indigo-600/30"></div>
                <div>
                    <h3 class="text-base md:text-lg font-black text-slate-800 tracking-tight leading-none">กิจกรรมล่าสุด</h3>
                    <p class="text-[11px] font-bold text-gray-400 mt-1.5">6 รายการในช่วง 4 ชม.</p>
                </div>
            </div>
            
            <!-- Interactive Refresh Button with spinning icon on click/hover -->
            <button
                class="refresh-btn border border-gray-100 hover:border-gray-200 shadow-sm rounded-xl p-2.5 text-gray-400 hover:text-indigo-600 hover:bg-gray-50 bg-white transition-all cursor-pointer flex items-center justify-center"
                @click="refresh"
                title="ดึงข้อมูลกิจกรรมล่าสุด"
            >
                <UIcon
                    name="i-lucide-refresh-cw"
                    class="w-4 h-4"
                    :class="{ 'spin-active': isRefreshing }"
                />
            </button>
        </div>

        <!-- Activity Items List with dashed dividers -->
        <div class="divide-y divide-dashed divide-gray-100/90 mt-2">
            <div
                v-for="item in activities"
                :key="item.id"
                class="flex items-center gap-3.5 py-4 group/item hover:bg-slate-50/40 px-2 -mx-2 rounded-2xl transition-all duration-300"
            >
                <!-- Left Icon Box with soft colorful bg and scale effect -->
                <div
                    class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover/item:scale-105 shadow-sm"
                    :class="item.bgClass"
                >
                    <UIcon :name="item.icon" class="w-5 h-5" :class="item.iconClass" />
                </div>
                
                <!-- Right Details Area -->
                <div class="flex-1 min-w-0">
                    <h4 class="text-xs md:text-sm font-bold text-slate-700 leading-snug break-words">
                        {{ item.prefix }} 
                        <span class="text-indigo-600 font-extrabold ml-0.5">{{ item.highlight }}</span>
                    </h4>
                    <p class="text-[10px] md:text-[11px] font-semibold text-gray-400 mt-1">
                        {{ item.time }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    /* Continuous Spin for Refresh Icon on active */
    .spin-active {
        animation: spin-cw 0.8s linear infinite;
    }

    /* Single rotation on button hover */
    .refresh-btn:hover:not(:active) .i-lucide-refresh-cw:not(.spin-active) {
        animation: spin-once 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }

    @keyframes spin-cw {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }

    @keyframes spin-once {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
</style>
