<script setup lang="ts">
    import { useAuthStore } from '~/stores/auth'

    definePageMeta({ layout: 'auth' })

    const authStore = useAuthStore()
    if (authStore.isAuthenticated) navigateTo('/dashboard')
</script>

<template>
    <div class="login-page">
        <!-- Left: Hero -->
        <LoginHero class="login-left" />

        <!-- Right: Form -->
        <div class="login-right">
            <!-- Top support link -->
            <div class="support-bar">
                ต้องการความช่วยเหลือ?
                <a href="#" class="support-link">ติดต่อทีมซัพพอร์ต ›</a>
            </div>

            <!-- Centered form -->
            <div class="form-wrap">
                <LoginFormTabs />
            </div>

            <!-- Floating style toggle -->
            <button type="button" class="style-toggle">
                ✨ เปลี่ยนสไตล์โลโก้
            </button>
        </div>
    </div>
</template>

<style scoped>
    .login-page {
        display: grid;
        grid-template-columns: 1fr 1fr;
        min-height: 100vh;
        width: 100%;
    }

    .login-right {
        display: flex;
        flex-direction: column;
        background: white;
        position: relative;
        min-height: 100vh;
    }

    .support-bar {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 5px;
        padding: 18px 28px;
        font-size: 12.5px;
        color: #9ca3af;
        flex-shrink: 0;
    }
    .support-link {
        color: #7c3aed;
        font-weight: 600;
        text-decoration: none;
        transition: color 0.2s;
    }
    .support-link:hover { color: #5b21b6; }

    .form-wrap {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px 48px 48px;
    }

    .style-toggle {
        position: fixed;
        bottom: 24px;
        right: 24px;
        background: white;
        border: 1.5px solid #e5e7eb;
        border-radius: 20px;
        padding: 8px 16px;
        font-size: 12.5px;
        font-weight: 600;
        color: #374151;
        cursor: pointer;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
        transition: box-shadow 0.2s, border-color 0.2s;
        z-index: 50;
    }
    .style-toggle:hover {
        border-color: #d1d5db;
        box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12);
    }

    @media (max-width: 768px) {
        .login-page { grid-template-columns: 1fr; }
        .login-left { display: none; }
        .form-wrap { padding: 20px 24px 40px; }
    }
</style>
