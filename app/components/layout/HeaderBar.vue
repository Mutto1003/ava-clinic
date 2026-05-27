<script setup lang="ts">
    import { computed } from 'vue'
    import { useRoute } from 'vue-router'

    const route = useRoute()

    interface MenuInfo {
        parent: string
        child: string
        icon?: string
    }

    // Define route categories and page titles
    const routeMap: Record<string, MenuInfo> = {
        '/dashboard': { parent: 'เมนูหลัก', child: 'หน้าแรก', icon: 'i-lucide-home' },
        '/customerNew': { parent: 'เมนูหลัก', child: 'เพิ่มลูกค้าใหม่', icon: 'i-lucide-user-plus' },
        '/customerInfo': { parent: 'เมนูหลัก', child: 'ข้อมูลลูกค้า', icon: 'i-lucide-users' },
        '/reports': { parent: 'เมนูหลัก', child: 'รายงาน', icon: 'i-lucide-bar-chart-2' },
        '/teleconsult': { parent: 'เมนูหลัก', child: 'Teleconsult', icon: 'i-lucide-video' },
        '/branches': { parent: 'จุดบริการ', child: 'สาขาเลย', icon: 'i-lucide-map-pin' },
        '/settings': { parent: 'ระบบ', child: 'ตั้งค่า', icon: 'i-lucide-settings' },
        '/search': { parent: 'ระบบ', child: 'ค้นหา', icon: 'i-lucide-search' }
    }

    const subRouteMap: Record<string, MenuInfo> = {
        '/treatment': { parent: 'ข้อมูลลูกค้า', child: 'ประวัติการรักษา', icon: 'i-lucide-clipboard-list' },
    }

    const currentMenu = computed((): MenuInfo => {
        // Check specific sub-routes first (e.g. /customerInfo/:id/treatment)
        const subMatch = Object.keys(subRouteMap).find(suffix => route.path.endsWith(suffix))
        if (subMatch) return subRouteMap[subMatch]!

        // If exact match is found
        const exactMatch = routeMap[route.path]
        if (exactMatch) return exactMatch

        // Fallback: search for partial matches sorted by specificity (e.g., /customerInfo/123)
        const matchedKey = Object.keys(routeMap)
            .filter(key => key !== '/' && route.path.startsWith(key))
            .sort((a, b) => b.length - a.length)[0]
        if (matchedKey) return routeMap[matchedKey]!

        return { parent: 'เมนูหลัก', child: 'หน้าแรก', icon: 'i-lucide-home' }
    })
</script>

<template>
    <header
        class="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6 fixed top-0 left-[255px] right-0 z-40"
    >
        <div class="flex items-center text-sm gap-2">
            <span class="text-gray-400 font-medium transition-all duration-300">{{ currentMenu.parent }}</span>
            <UIcon name="i-lucide-chevron-right" class="w-4 h-4 text-gray-400" />
            <div class="flex items-center gap-1.5 font-semibold text-gray-800 bg-gray-50 px-2.5 py-1 rounded-lg ring-1 ring-gray-200/50 transition-all duration-300">
                <UIcon v-if="currentMenu.icon" :name="currentMenu.icon" class="w-4 h-4 text-primary-500" />
                <span class="text-xs tracking-wider uppercase">{{ currentMenu.child }}</span>
            </div>
        </div>

        <div class="flex items-center gap-3">
            <!-- ── Premium Shortcut Search Input ── -->
            <div class="relative w-48 md:w-60">
                <UIcon name="i-lucide-search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                    type="text"
                    placeholder="ค้นหาลูกค้า, HN, นัดหมาย..."
                    class="w-full pl-9 pr-14 py-1.5 rounded-xl bg-slate-50 border border-gray-200/60 focus:border-indigo-500 focus:bg-white text-xs text-slate-700 outline-none transition-all duration-300 font-semibold placeholder-gray-400 shadow-sm"
                />
                <div class="absolute right-2 top-1/2 -translate-y-1/2 bg-white border border-gray-200/30 text-gray-400 px-1.5 py-0.5 rounded-md text-[9px] font-bold font-mono shadow-sm pointer-events-none select-none">
                    ⌘K
                </div>
            </div>

            <!-- ── Language Toggle Pill (TH / EN) ── -->
            <div class="flex items-center bg-slate-100 rounded-full p-0.5 text-[10px] font-extrabold border border-gray-200/10 shadow-inner">
                <button
                    class="px-2.5 py-1 rounded-full bg-white text-slate-800 shadow-sm transition-all"
                    data-testid="lang-th"
                >
                    TH
                </button>
                <button
                    class="px-2.5 py-1 rounded-full text-slate-400 hover:text-slate-600 transition-all"
                    data-testid="lang-en"
                >
                    EN
                </button>
            </div>

            <!-- ── Globe Button (Border Box) ── -->
            <button
                class="w-8 h-8 rounded-xl border border-gray-200/60 bg-white hover:bg-slate-50 hover:border-gray-300 text-slate-500 hover:text-indigo-600 transition-all duration-300 shadow-sm flex items-center justify-center cursor-pointer"
                data-testid="btn-global"
            >
                <UIcon name="i-lucide-globe" class="w-4 h-4" />
            </button>

            <!-- ── Bell Notification Button with Pulsing Red Indicator ── -->
            <button
                class="w-8 h-8 rounded-xl border border-gray-200/60 bg-white hover:bg-slate-50 hover:border-gray-300 text-slate-500 hover:text-indigo-600 transition-all duration-300 shadow-sm flex items-center justify-center relative cursor-pointer"
                data-testid="btn-notification"
            >
                <UIcon name="i-lucide-bell" class="w-4 h-4" />
                <span class="absolute top-1.5 right-1.5 flex h-2 w-2">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                </span>
            </button>

            <!-- ── Help / Question Button (Border Box) ── -->
            <button
                class="w-8 h-8 rounded-xl border border-gray-200/60 bg-white hover:bg-slate-50 hover:border-gray-300 text-slate-500 hover:text-indigo-600 transition-all duration-300 shadow-sm flex items-center justify-center cursor-pointer"
                data-testid="btn-help"
            >
                <UIcon name="i-lucide-help-circle" class="w-4 h-4" />
            </button>
        </div>
    </header>
</template>
