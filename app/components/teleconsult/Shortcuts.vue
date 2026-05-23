<template>
    <div class="bg-white rounded-2xl ring-1 ring-gray-100 shadow-sm p-5">
        <div class="flex items-center gap-2 mb-4">
            <UIcon name="i-heroicons-bolt" class="w-5 h-5 text-indigo-500" />
            <h2 class="font-bold text-gray-900 text-lg">ทางลัด</h2>
        </div>

        <div class="grid grid-cols-2 gap-3">
            <button
                class="flex flex-col items-start p-4 rounded-xl ring-1 ring-gray-200 hover:bg-slate-50 transition-colors text-left group"
            >
                <UIcon
                    name="i-heroicons-user-plus"
                    class="w-5 h-5 text-indigo-500 mb-2 group-hover:scale-110 transition-transform"
                />
                <span class="text-xs font-bold text-gray-700">เริ่มกับคนไข้ใหม่</span>
                <span class="text-[10px] text-gray-400 font-medium mt-0.5">สร้าง HN + นัด</span>
            </button>
            <button
                class="flex flex-col items-start p-4 rounded-xl ring-1 ring-gray-200 hover:bg-slate-50 transition-colors text-left group"
            >
                <UIcon
                    name="i-heroicons-video-camera"
                    class="w-5 h-5 text-indigo-500 mb-2 group-hover:scale-110 transition-transform"
                />
                <span class="text-xs font-bold text-gray-700">ทดสอบกล้อง/ไมค์</span>
                <span class="text-[10px] text-gray-400 font-medium mt-0.5">ตรวจอุปกรณ์</span>
            </button>
            <button
                class="flex flex-col items-start p-4 rounded-xl ring-1 ring-gray-200 hover:bg-slate-50 transition-colors text-left group"
            >
                <UIcon
                    name="i-heroicons-arrow-down-tray"
                    class="w-5 h-5 text-indigo-500 mb-2 group-hover:scale-110 transition-transform"
                />
                <span class="text-xs font-bold text-gray-700">ดาวน์โหลดสรุป</span>
                <span class="text-[10px] text-gray-400 font-medium mt-0.5">PDF วันนี้</span>
            </button>
            <button
                class="flex flex-col items-start p-4 rounded-xl ring-1 ring-gray-200 hover:bg-slate-50 transition-colors text-left group"
            >
                <UIcon
                    name="i-heroicons-clock"
                    class="w-5 h-5 text-indigo-500 mb-2 group-hover:scale-110 transition-transform"
                />
                <span class="text-xs font-bold text-gray-700">ประวัติเซสชัน</span>
                <span class="text-[10px] text-gray-400 font-medium mt-0.5">30 วันล่าสุด</span>
            </button>
        </div>
    </div>
</template>
