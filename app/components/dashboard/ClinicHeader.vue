<script setup lang="ts">
    import { computed } from 'vue'
    import { useAuthStore } from '~/stores/auth'

    const authStore = useAuthStore()

    const userName = computed(() => authStore.user?.name || 'จิตราภรณ์ (Admin)')

    const greeting = computed(() => {
        const h = new Date().getHours()
        if (h < 12) return 'สวัสดีตอนเช้า'
        if (h < 17) return 'สวัสดีตอนบ่าย'
        return 'สวัสดีตอนเย็น'
    })
</script>

<template>
    <div class="rounded-2xl overflow-hidden shadow-lg shadow-indigo-900/10 relative mb-6"
         style="background: linear-gradient(135deg, #3730a3 0%, #4f46e5 45%, #7c3aed 100%)">
        <!-- BG blobs -->
        <div class="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div class="absolute bottom-0 left-20 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl translate-y-1/3 pointer-events-none" />

        <div class="relative z-10 flex items-center justify-between px-8 py-6 gap-8">
            <!-- Left: greeting + subtitle -->
            <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 text-xs font-semibold text-white/70 mb-3">
                    <span class="relative flex h-2 w-2">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    AVACLINIC · พระราม 9 · เปิดให้บริการ 09:00 – 20:00
                </div>
                <h2 class="text-2xl font-black text-white leading-tight flex items-center gap-2 mb-2">
                    {{ greeting }}, {{ userName }}
                    <span class="wave">👋</span>
                </h2>
                <p class="text-sm text-indigo-100/80 font-medium">
                    วันนี้คุณมีนัดหมาย <strong class="text-white font-black">8 ราย</strong> ·
                    <strong class="text-white font-black">3 รายการ</strong> ต้องการความสนใจ ·
                    <strong class="text-white font-black">5 สินค้า</strong> ใกล้หมดอายุ
                </p>
            </div>

            <!-- Right: stat cards -->
            <div class="flex items-center gap-3 shrink-0">
                <div class="stat-card">
                    <p class="stat-label">นัดถัดไป</p>
                    <div class="flex items-baseline gap-2">
                        <span class="stat-value">14:00</span>
                        <span class="stat-badge">อีก 1 ชม.</span>
                    </div>
                </div>
                <div class="divider" />
                <div class="stat-card">
                    <p class="stat-label">รายได้วันนี้</p>
                    <div class="flex items-baseline gap-2">
                        <span class="stat-value">฿38,200</span>
                        <span class="stat-badge">+18%</span>
                    </div>
                </div>
                <div class="divider" />
                <div class="stat-card">
                    <p class="stat-label">ลูกค้าวันนี้</p>
                    <div class="flex items-baseline gap-2">
                        <span class="stat-value">12</span>
                        <span class="stat-badge">+2</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .wave {
        display: inline-block;
        animation: wave 2.2s infinite;
        transform-origin: 70% 70%;
    }
    @keyframes wave {
        0%, 60%, 100% { transform: rotate(0deg); }
        10% { transform: rotate(14deg); }
        20% { transform: rotate(-8deg); }
        30% { transform: rotate(14deg); }
        40% { transform: rotate(-4deg); }
        50% { transform: rotate(10deg); }
    }

    .stat-card {
        display: flex;
        flex-direction: column;
        gap: 4px;
        min-width: 110px;
    }
    .stat-label {
        font-size: 10px;
        font-weight: 700;
        color: rgba(199, 210, 254, 0.7);
        text-transform: uppercase;
        letter-spacing: 0.8px;
        margin: 0;
    }
    .stat-value {
        font-size: 22px;
        font-weight: 900;
        color: white;
        line-height: 1;
    }
    .stat-badge {
        font-size: 10px;
        font-weight: 700;
        color: #6ee7b7;
        background: rgba(16, 185, 129, 0.2);
        padding: 2px 8px;
        border-radius: 20px;
        line-height: 1.6;
    }
    .divider {
        width: 1px;
        height: 40px;
        background: rgba(255, 255, 255, 0.15);
    }
</style>
