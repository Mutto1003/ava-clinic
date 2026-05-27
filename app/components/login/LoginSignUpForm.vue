<script setup lang="ts">
    import { ref } from 'vue'

    const fullName = ref('')
    const email = ref('')
    const password = ref('')
    const showPassword = ref(false)
    const isLoading = ref(false)

    const handleSignUp = async () => {
        isLoading.value = true
        await new Promise(resolve => setTimeout(resolve, 1000))
        isLoading.value = false
    }
</script>

<template>
    <div class="signup-form">
        <form class="fields" @submit.prevent="handleSignUp">
            <div class="field-group">
                <label class="field-label">ชื่อ-นามสกุล</label>
                <div class="input-wrap">
                    <svg class="input-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>
                    <input
                        id="signup-fullname"
                        v-model="fullName"
                        type="text"
                        placeholder="กรอกชื่อ-นามสกุล"
                        class="input"
                        autocomplete="name"
                        required
                    />
                </div>
            </div>

            <div class="field-group">
                <label class="field-label">อีเมล</label>
                <div class="input-wrap">
                    <svg class="input-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <input
                        id="signup-email"
                        v-model="email"
                        type="email"
                        placeholder="example@avaclinic.com"
                        class="input"
                        autocomplete="email"
                        required
                    />
                </div>
            </div>

            <div class="field-group">
                <label class="field-label">รหัสผ่าน</label>
                <div class="input-wrap">
                    <svg class="input-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <input
                        id="signup-password"
                        v-model="password"
                        :type="showPassword ? 'text' : 'password'"
                        placeholder="••••••••"
                        class="input"
                        autocomplete="new-password"
                        required
                    />
                    <button type="button" class="eye-btn" @click="showPassword = !showPassword">
                        <svg v-if="!showPassword" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                        </svg>
                        <svg v-else width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                            <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                            <line x1="1" y1="1" x2="23" y2="23" />
                        </svg>
                    </button>
                </div>
            </div>

            <button id="signup-submit-btn" type="submit" class="submit-btn" :disabled="isLoading">
                <span v-if="isLoading" class="spinner" />
                <span>{{ isLoading ? 'กำลังสมัคร...' : 'สมัครใช้งานฟรี 14 วัน' }}</span>
                <svg v-if="!isLoading" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                </svg>
            </button>
        </form>
    </div>
</template>

<style scoped>
    .signup-form { width: 100%; }
    .fields { display: flex; flex-direction: column; gap: 16px; }

    .field-group { display: flex; flex-direction: column; gap: 6px; }
    .field-label { font-size: 13px; font-weight: 600; color: #374151; }

    .input-wrap { position: relative; display: flex; align-items: center; }
    .input-icon { position: absolute; left: 13px; color: #9ca3af; pointer-events: none; }
    .input {
        width: 100%;
        background: white;
        border: 1.5px solid #e5e7eb;
        border-radius: 10px;
        padding: 10px 40px 10px 38px;
        font-size: 14px;
        color: #111827;
        outline: none;
        transition: border-color 0.2s, box-shadow 0.2s;
    }
    .input::placeholder { color: #d1d5db; }
    .input:focus {
        border-color: #7c3aed;
        box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.08);
    }
    .eye-btn {
        position: absolute;
        right: 12px;
        background: none;
        border: none;
        color: #9ca3af;
        cursor: pointer;
        display: flex;
        align-items: center;
        padding: 0;
        transition: color 0.2s;
    }
    .eye-btn:hover { color: #6b7280; }

    .submit-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        background: #5b21b6;
        color: white;
        border: none;
        border-radius: 12px;
        padding: 13px 24px;
        font-size: 14.5px;
        font-weight: 700;
        cursor: pointer;
        width: 100%;
        transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
        box-shadow: 0 4px 14px rgba(91, 33, 182, 0.35);
    }
    .submit-btn:hover:not(:disabled) {
        background: #4c1d95;
        transform: translateY(-1px);
        box-shadow: 0 6px 20px rgba(91, 33, 182, 0.45);
    }
    .submit-btn:disabled { opacity: 0.65; cursor: not-allowed; }
    .spinner {
        width: 15px; height: 15px;
        border: 2px solid rgba(255,255,255,0.4);
        border-top-color: white;
        border-radius: 50%;
        animation: spin 0.7s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
</style>
