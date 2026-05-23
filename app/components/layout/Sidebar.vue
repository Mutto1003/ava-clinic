<script setup lang="ts">
    import { useAuthStore } from '~/stores/auth'
    import { useRoute } from 'vue-router'

    const authStore = useAuthStore()
    const route = useRoute()

    const menuItems = [
        { name: 'หน้าแรก', icon: 'i-lucide-home', to: '/dashboard' },
        { name: 'เพิ่มลูกค้าใหม่', icon: 'i-lucide-user-plus', to: '/customerNew' },
        { name: 'ข้อมูลลูกค้า', icon: 'i-lucide-users', to: '/customerInfo' },
        { name: 'ปฏิทินนัดหมาย', icon: 'i-lucide-calendar', to: '/appointment' },
        { name: 'คลังสินค้า', icon: 'i-lucide-package', to: '#' },
        { name: 'รายงาน', icon: 'i-lucide-bar-chart-2', to: '/reports' },
        { name: 'จุดบริการ', icon: 'i-lucide-activity', to: '#' },
        { name: 'Teleconsult', icon: 'i-lucide-video', to: '/teleconsult', badge: 'BETA' }
    ]

    const systemItems = [
        { name: 'ตั้งค่า', icon: 'i-lucide-settings', to: '/settings' },
        { name: 'ค้นหา', icon: 'i-lucide-search', to: '#' }
    ]

    const isActive = (to: string) => to !== '#' && route.path === to

    const handleLogout = () => {
        authStore.logout()
        navigateTo('/')
    }
</script>

<template>
    <aside class="sidebar">
        <!-- Logo -->
        <div class="sidebar-logo">
            <div class="logo-avatar">
                <span>A</span>
            </div>
            <div class="logo-info">
                <div class="logo-name">AVACLINIC</div>
                <div class="logo-sub">เอวาคลินิกมวกเหล็ก</div>
            </div>
        </div>

        <!-- Main menu -->
        <div class="sidebar-scroll">
            <div class="menu-section-label">เมนูหลัก</div>
            <nav class="menu-nav">
                <NuxtLink
                    v-for="item in menuItems"
                    :key="item.name"
                    :to="item.to"
                    class="menu-item"
                    :class="{ 'menu-item--active': isActive(item.to) }"
                    data-testid="sidebar-link"
                >
                    <UIcon :name="item.icon" class="menu-icon" />
                    <span class="menu-label">{{ item.name }}</span>
                    <span v-if="item.badge" class="menu-badge">{{ item.badge }}</span>
                </NuxtLink>
            </nav>

            <div class="menu-section-label" style="margin-top: 20px">ระบบ</div>
            <nav class="menu-nav">
                <NuxtLink
                    v-for="item in systemItems"
                    :key="item.name"
                    :to="item.to"
                    class="menu-item"
                    :class="{ 'menu-item--active': isActive(item.to) }"
                    data-testid="sidebar-system-link"
                >
                    <UIcon :name="item.icon" class="menu-icon" />
                    <span class="menu-label">{{ item.name }}</span>
                </NuxtLink>
            </nav>
        </div>

        <!-- User profile -->
        <div class="sidebar-user">
            <div class="user-avatar">
                {{ (authStore.user?.name || 'จ')[0] }}
            </div>
            <div class="user-info">
                <p class="user-name">{{ authStore.user?.name || 'จิตราภรณ์' }}</p>
                <p class="user-role">พนักงานต้อนรับ</p>
            </div>
            <button
                class="logout-btn"
                data-testid="sidebar-logout"
                title="ออกจากระบบ"
                @click="handleLogout"
            >
                <UIcon name="i-lucide-log-out" class="w-4 h-4" />
            </button>
        </div>
    </aside>
</template>

<style scoped>
    .sidebar {
        width: 255px;
        flex-shrink: 0;
        background: linear-gradient(180deg, #3730a3 0%, #4f46e5 40%, #7c3aed 100%);
        display: flex;
        flex-direction: column;
        height: 100vh;
        position: fixed;
        left: 0;
        top: 0;
        overflow: hidden;
    }

    /* Subtle blob */
    .sidebar::before {
        content: '';
        position: absolute;
        width: 220px;
        height: 220px;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 50%;
        top: -80px;
        right: -80px;
        pointer-events: none;
    }

    /* Logo */
    .sidebar-logo {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 22px 20px 16px;
        /* border-bottom: 1px solid rgba(255,255,255,0.1); */
        flex-shrink: 0;
    }
    .logo-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        font-weight: 800;
        color: white;
        flex-shrink: 0;
    }
    .logo-info {
        min-width: 0;
    }
    .logo-name {
        font-size: 14px;
        font-weight: 800;
        color: white;
        letter-spacing: 1px;
        line-height: 1.2;
    }
    .logo-sub {
        font-size: 10px;
        color: rgba(255, 255, 255, 0.55);
        margin-top: 2px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    /* Scrollable area */
    .sidebar-scroll {
        flex: 1;
        overflow-y: auto;
        padding: 16px 12px;
        scrollbar-width: none;
    }
    .sidebar-scroll::-webkit-scrollbar {
        display: none;
    }

    /* Section labels */
    .menu-section-label {
        font-size: 10px;
        font-weight: 700;
        color: rgba(255, 255, 255, 0.45);
        letter-spacing: 1.2px;
        padding: 0 10px;
        margin-bottom: 6px;
        text-transform: uppercase;
    }

    /* Menu items */
    .menu-nav {
        display: flex;
        flex-direction: column;
        gap: 2px;
    }
    .menu-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 12px;
        border-radius: 10px;
        text-decoration: none;
        font-size: 13.5px;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.7);
        transition:
            background 0.15s,
            color 0.15s;
        position: relative;
    }
    .menu-item:hover {
        background: rgba(255, 255, 255, 0.12);
        color: white;
    }
    .menu-item--active {
        background: rgba(255, 255, 255, 0.18);
        color: white;
        font-weight: 600;
    }
    .menu-icon {
        width: 18px;
        height: 18px;
        flex-shrink: 0;
    }
    .menu-label {
        flex: 1;
    }
    .menu-badge {
        font-size: 9px;
        font-weight: 700;
        background: #10b981;
        color: white;
        padding: 2px 6px;
        border-radius: 6px;
        letter-spacing: 0.5px;
    }

    /* User area */
    .sidebar-user {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 14px 16px;
        border-top: 1px solid rgba(255, 255, 255, 0.12);
        background: rgba(0, 0, 0, 0.15);
        flex-shrink: 0;
    }
    .user-avatar {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.25);
        color: white;
        font-size: 15px;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }
    .user-info {
        flex: 1;
        min-width: 0;
    }
    .user-name {
        font-size: 12.5px;
        font-weight: 600;
        color: white;
        margin: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .user-role {
        font-size: 10.5px;
        color: rgba(255, 255, 255, 0.5);
        margin: 1px 0 0;
    }
    .logout-btn {
        background: none;
        border: none;
        color: rgba(255, 255, 255, 0.45);
        cursor: pointer;
        padding: 4px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        transition:
            color 0.15s,
            background 0.15s;
    }
    .logout-btn:hover {
        color: white;
        background: rgba(255, 255, 255, 0.12);
    }
</style>
