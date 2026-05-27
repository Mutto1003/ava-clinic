<script setup lang="ts">
    import { ref } from 'vue'
    import { loginApi } from '~/client/auth'
    import { useAuthStore } from '~/stores/auth'

    const authStore = useAuthStore()

    const email = ref('admin@avaclinic.com')
    const password = ref('password')
    const rememberMe = ref(true)
    const showPassword = ref(false)
    const isLoading = ref(false)
    const errorMessage = ref('')

    const handleLogin = async () => {
        isLoading.value = true
        errorMessage.value = ''
        const resp = await loginApi(email.value, password.value)
        if (resp.status === 'success') {
            authStore.setAuth(resp.data.token, resp.data.user)
            navigateTo('/dashboard')
        } else {
            errorMessage.value = resp.message
        }
        isLoading.value = false
    }

    const fillCredentials = (type: 'admin' | 'superadmin') => {
        email.value = type === 'admin' ? 'admin@avaclinic.com' : 'super@avaclinic.com'
        password.value = 'password'
    }
</script>

<template>
    <div class="signin-form">
        <form class="fields" @submit.prevent="handleLogin">
            <!-- Email -->
            <div class="field-group">
                <label class="field-label">อีเมล</label>
                <div class="input-wrap">
                    <svg class="input-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <input
                        id="login-email"
                        v-model="email"
                        type="email"
                        placeholder="admin@avaclinic.com"
                        class="input"
                        autocomplete="email"
                        required
                    />
                </div>
            </div>

            <!-- Password -->
            <div class="field-group">
                <label class="field-label">รหัสผ่าน</label>
                <div class="input-wrap">
                    <svg class="input-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <input
                        id="login-password"
                        v-model="password"
                        :type="showPassword ? 'text' : 'password'"
                        placeholder="••••••••"
                        class="input"
                        autocomplete="current-password"
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

            <!-- Remember + Forgot -->
            <div class="remember-row">
                <label class="remember-label">
                    <input v-model="rememberMe" type="checkbox" class="checkbox" />
                    <span>จดจำการเข้าสู่ระบบ</span>
                </label>
                <a href="#" class="forgot-link">ลืมรหัสผ่าน?</a>
            </div>

            <!-- Error -->
            <div v-if="errorMessage" class="error-alert">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="#ef4444" stroke-width="2" />
                    <path d="M12 8v4M12 16h.01" stroke="#ef4444" stroke-width="2" stroke-linecap="round" />
                </svg>
                {{ errorMessage }}
            </div>

            <!-- Submit -->
            <button id="login-submit-btn" type="submit" class="submit-btn" :disabled="isLoading">
                <span v-if="isLoading" class="spinner" />
                <span>{{ isLoading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ' }}</span>
                <svg v-if="!isLoading" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                </svg>
            </button>
        </form>

        <!-- Social login -->
        <div class="divider">
            <span class="divider-text">หรือเข้าสู่ระบบด้วย</span>
        </div>
        <div class="social-btns">
            <button type="button" class="social-btn">
                <svg width="16" height="16" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google
            </button>
            <button type="button" class="social-btn social-btn-line">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M12 2C6.48 2 2 5.9 2 10.7c0 2.6 1.4 4.9 3.6 6.5.2.1.2.4.1.6l-.7 2.4c-.1.2.1.4.3.3l2.8-1.4c.2-.1.4-.1.5 0 1 .4 2.2.6 3.4.6 5.52 0 10-3.9 10-8.7S17.52 2 12 2zM8 12H6v-4h2v4zm5 0h-2V8h2v4zm5 0h-2V8h2v4z" />
                </svg>
                LINE
            </button>
            <button type="button" class="social-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                Apple
            </button>
        </div>

        <!-- Dev credentials -->
        <div class="dev-creds">
            <div class="dev-row">
                <span class="dev-role">Admin</span>
                <button type="button" class="dev-fill" @click="fillCredentials('admin')">
                    admin@avaclinic.com · password
                </button>
            </div>
            <div class="dev-row">
                <span class="dev-role">Superadmin</span>
                <button type="button" class="dev-fill" @click="fillCredentials('superadmin')">
                    super@avaclinic.com · password
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .signin-form {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .fields {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    /* Field */
    .field-group {
        display: flex;
        flex-direction: column;
        gap: 6px;
    }
    .field-label {
        font-size: 13px;
        font-weight: 600;
        color: #374151;
    }
    .input-wrap {
        position: relative;
        display: flex;
        align-items: center;
    }
    .input-icon {
        position: absolute;
        left: 13px;
        color: #9ca3af;
        pointer-events: none;
        flex-shrink: 0;
    }
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

    /* Remember row */
    .remember-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .remember-label {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 13px;
        color: #374151;
        cursor: pointer;
        user-select: none;
    }
    .checkbox {
        width: 15px;
        height: 15px;
        accent-color: #7c3aed;
        cursor: pointer;
        border-radius: 4px;
    }
    .forgot-link {
        font-size: 13px;
        color: #7c3aed;
        font-weight: 600;
        text-decoration: none;
        transition: color 0.2s;
    }
    .forgot-link:hover { color: #6d28d9; }

    /* Error */
    .error-alert {
        display: flex;
        align-items: center;
        gap: 8px;
        background: #fef2f2;
        border: 1px solid #fee2e2;
        border-radius: 8px;
        padding: 9px 13px;
        font-size: 13px;
        color: #ef4444;
    }

    /* Submit */
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
        letter-spacing: 0.2px;
        box-shadow: 0 4px 14px rgba(91, 33, 182, 0.35);
    }
    .submit-btn:hover:not(:disabled) {
        background: #4c1d95;
        transform: translateY(-1px);
        box-shadow: 0 6px 20px rgba(91, 33, 182, 0.45);
    }
    .submit-btn:active:not(:disabled) { transform: translateY(0); }
    .submit-btn:disabled { opacity: 0.65; cursor: not-allowed; }
    .spinner {
        width: 15px;
        height: 15px;
        border: 2px solid rgba(255, 255, 255, 0.4);
        border-top-color: white;
        border-radius: 50%;
        animation: spin 0.7s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* Divider */
    .divider {
        display: flex;
        align-items: center;
        gap: 12px;
    }
    .divider::before,
    .divider::after {
        content: '';
        flex: 1;
        height: 1px;
        background: #f3f4f6;
    }
    .divider-text {
        font-size: 12px;
        color: #9ca3af;
        white-space: nowrap;
        font-weight: 500;
    }

    /* Social buttons */
    .social-btns {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
    }
    .social-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 7px;
        background: white;
        border: 1.5px solid #e5e7eb;
        border-radius: 10px;
        padding: 9px 12px;
        font-size: 13px;
        font-weight: 600;
        color: #374151;
        cursor: pointer;
        transition: border-color 0.2s, background 0.2s;
    }
    .social-btn:hover {
        border-color: #d1d5db;
        background: #f9fafb;
    }
    .social-btn-line {
        background: #06c755;
        border-color: #06c755;
        color: white;
    }
    .social-btn-line:hover {
        background: #05b84d;
        border-color: #05b84d;
    }

    /* Dev credentials */
    .dev-creds {
        border: 1px solid #f3f4f6;
        border-radius: 10px;
        overflow: hidden;
        background: #fafafa;
    }
    .dev-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 14px;
    }
    .dev-row + .dev-row {
        border-top: 1px solid #f3f4f6;
    }
    .dev-role {
        font-size: 11.5px;
        font-weight: 700;
        color: #374151;
    }
    .dev-fill {
        background: none;
        border: none;
        font-size: 11px;
        color: #7c3aed;
        font-weight: 500;
        cursor: pointer;
        padding: 0;
        font-family: monospace;
        transition: color 0.2s;
    }
    .dev-fill:hover { color: #5b21b6; text-decoration: underline; }
</style>
