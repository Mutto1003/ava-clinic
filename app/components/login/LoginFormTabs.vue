<script setup lang="ts">
    type Tab = 'signup' | 'signin'
    const activeTab = ref<Tab>('signin')
    const setTab = (tab: Tab) => { activeTab.value = tab }

    const tabMeta = {
        signin: { title: 'เข้าสู่ระบบ', subtitle: 'กรอกข้อมูลด้านล่างเพื่อเข้าสู่ระบบจัดการคลินิกของคุณ' },
        signup: { title: 'สมัครสมาชิก', subtitle: 'สร้างบัญชีและเริ่มใช้งาน AVA Clinic ได้ฟรีภายใน 14 วัน' }
    }
</script>

<template>
    <div class="form-panel">
        <!-- Tabs -->
        <div class="tabs">
            <button
                class="tab-btn"
                :class="{ active: activeTab === 'signup' }"
                type="button"
                @click="setTab('signup')"
            >
                สมัครสมาชิก
            </button>
            <button
                class="tab-btn"
                :class="{ active: activeTab === 'signin' }"
                type="button"
                @click="setTab('signin')"
            >
                เข้าสู่ระบบ
            </button>
        </div>

        <!-- Title block -->
        <Transition name="fade-slide" mode="out-in">
            <div :key="activeTab" class="title-block">
                <h1 class="form-title">{{ tabMeta[activeTab].title }}</h1>
                <p class="form-subtitle">{{ tabMeta[activeTab].subtitle }}</p>
            </div>
        </Transition>

        <!-- Form -->
        <Transition name="fade-slide" mode="out-in">
            <LoginSignUpForm v-if="activeTab === 'signup'" key="signup" />
            <LoginSignInForm v-else key="signin" />
        </Transition>

        <!-- Switch tab -->
        <p class="switch-link">
            <template v-if="activeTab === 'signin'">
                ยังไม่มีบัญชี?
                <button type="button" class="link-btn" @click="setTab('signup')">
                    สมัครใช้งานฟรี 14 วัน
                </button>
            </template>
            <template v-else>
                มีบัญชีอยู่แล้ว?
                <button type="button" class="link-btn" @click="setTab('signin')">
                    เข้าสู่ระบบ
                </button>
            </template>
        </p>
    </div>
</template>

<style scoped>
    .form-panel {
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: 100%;
        max-width: 400px;
    }

    /* Tabs */
    .tabs {
        display: flex;
        gap: 24px;
        border-bottom: 1.5px solid #f3f4f6;
        padding-bottom: 0;
    }
    .tab-btn {
        background: none;
        border: none;
        font-size: 14.5px;
        font-weight: 600;
        color: #9ca3af;
        cursor: pointer;
        padding: 0 0 12px;
        position: relative;
        transition: color 0.2s;
    }
    .tab-btn::after {
        content: '';
        position: absolute;
        bottom: -1.5px;
        left: 0;
        right: 0;
        height: 2.5px;
        background: #7c3aed;
        border-radius: 2px;
        transform: scaleX(0);
        transition: transform 0.25s ease;
    }
    .tab-btn.active {
        color: #111827;
    }
    .tab-btn.active::after {
        transform: scaleX(1);
    }

    /* Title block */
    .title-block {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    .form-title {
        font-size: 26px;
        font-weight: 800;
        color: #111827;
        margin: 0;
        letter-spacing: -0.3px;
    }
    .form-subtitle {
        font-size: 13.5px;
        color: #6b7280;
        margin: 0;
        line-height: 1.55;
    }

    /* Switch link */
    .switch-link {
        text-align: center;
        font-size: 13px;
        color: #6b7280;
        margin: 0;
    }
    .link-btn {
        background: none;
        border: none;
        color: #7c3aed;
        font-weight: 700;
        font-size: 13px;
        cursor: pointer;
        padding: 0 2px;
        transition: color 0.2s;
    }
    .link-btn:hover { color: #5b21b6; text-decoration: underline; }

    /* Transitions */
    .fade-slide-enter-active,
    .fade-slide-leave-active { transition: all 0.22s ease; }
    .fade-slide-enter-from { opacity: 0; transform: translateY(6px); }
    .fade-slide-leave-to   { opacity: 0; transform: translateY(-6px); }
</style>
