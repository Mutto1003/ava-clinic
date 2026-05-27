<script setup lang="ts">
const lang = ref<'TH' | 'EN'>('TH')
</script>

<template>
    <div class="hero">
        <!-- Animated background blobs -->
        <div class="blob blob-1" />
        <div class="blob blob-2" />
        <div class="blob blob-3" />

        <!-- Top bar -->
        <div class="topbar">
            <div class="logo">
                <!-- App icon -->
                <div class="logo-appicon">
                    <div class="appicon-inner">
                        <span class="appicon-a">A</span>
                    </div>
                </div>
                <div class="logo-text">
                    <div class="logo-name">
                        <span class="logo-a">A</span><span class="logo-va">VA</span>
                        <span class="logo-clinic"> Clinic</span>
                    </div>
                    <span class="logo-sub">เ ว ช ศ า ส ต ร์ ค ว า ม ง า ม</span>
                </div>
            </div>
            <div class="lang-toggle">
                <button :class="['lang-btn', { active: lang === 'TH' }]" type="button" @click="lang = 'TH'">TH</button>
                <button :class="['lang-btn', { active: lang === 'EN' }]" type="button" @click="lang = 'EN'">EN</button>
            </div>
        </div>

        <!-- Center hero -->
        <div class="center">
            <!-- Squircle card with rings -->
            <div class="squircle-wrap">
                <!-- Orbit ring outer — rotates CCW, has gold dot -->
                <div class="ring ring-3" />
                <div class="orbit orbit-outer">
                    <div class="orbit-dot orbit-gold" />
                </div>
                <!-- Orbit ring inner — rotates CW -->
                <div class="ring ring-2" />
                <div class="orbit orbit-inner">
                    <div class="orbit-dot orbit-pearl" />
                </div>
                <!-- Outer wrapper floats up/down, inner squircle breathes scale -->
                <div class="squircle-floater">
                    <div class="squircle">
                        <div class="circle-glow" />
                        <div class="squircle-circle">
                            <span class="squircle-a">A</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Version badge -->
            <div class="version-badge">
                <span class="badge-dot" />
                V2.6 · พร้อมให้บริการ
            </div>

            <!-- Title -->
            <h1 class="title">
                ยินดีต้อนรับสู่<br />
                <em class="brand">AVA Clinic</em>
            </h1>
            <p class="subtitle">
                ระบบจัดการคลินิกครบวงจร — ตั้งแต่นัดหมาย หัตถการ คลัง<br />
                ยา ไปจนถึงรายงานรายได้ ปลอดภัยและรวดเร็ว
            </p>

            <!-- Stats -->
            <div class="stats">
                <div class="stat">
                    <span class="stat-num">2,400+</span>
                    <span class="stat-label">ผู้ป่วยที่ดูแล</span>
                </div>
                <div class="stat-sep" />
                <div class="stat">
                    <span class="stat-num">98%</span>
                    <span class="stat-label">ความพึงพอใจ</span>
                </div>
                <div class="stat-sep" />
                <div class="stat">
                    <span class="stat-num">24/7</span>
                    <span class="stat-label">พร้อมบริการ</span>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p class="footer-copy">© 2026 AVA Clinic · เก็บรักษาข้อมูลตามมาตรฐาน PDPA</p>
            <div class="footer-row">
                <div class="socials">
                    <a href="#" aria-label="LinkedIn" class="soc-icon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                            <rect x="2" y="9" width="4" height="12" />
                            <circle cx="4" cy="4" r="2" />
                        </svg>
                    </a>
                    <a href="#" aria-label="Instagram" class="soc-icon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                            <circle cx="12" cy="12" r="4" />
                            <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                        </svg>
                    </a>
                    <a href="#" aria-label="Facebook" class="soc-icon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                        </svg>
                    </a>
                    <a href="#" aria-label="X" class="soc-icon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                    </a>
                </div>
                <div class="contacts">
                    <span class="contact-item">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.5a16 16 0 0 0 5.55 5.55l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 15.5v3l.92 1.42z" />
                        </svg>
                        02-XXX-XXXX
                    </span>
                    <span class="contact-item">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                            <polyline points="22,6 12,13 2,6" />
                        </svg>
                        info@avaclinic.th
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .hero {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding: 32px 40px 28px;
        height: 100%;
        background: linear-gradient(160deg, #312e81 0%, #4c1d95 30%, #5b21b6 60%, #6d28d9 100%);
        position: relative;
        overflow: hidden;
    }

    /* Background blobs */
    .blob {
        position: absolute;
        border-radius: 50%;
        filter: blur(72px);
        pointer-events: none;
        z-index: 0;
    }
    .blob-1 {
        width: 500px; height: 500px;
        background: rgba(139, 92, 246, 0.3);
        top: -160px; right: -140px;
        animation: blob-drift 16s ease-in-out infinite alternate;
    }
    .blob-2 {
        width: 380px; height: 380px;
        background: rgba(76, 29, 149, 0.4);
        bottom: -120px; left: -100px;
        animation: blob-drift 20s ease-in-out infinite alternate-reverse;
    }
    .blob-3 {
        width: 260px; height: 260px;
        background: rgba(236, 72, 153, 0.12);
        top: 45%; left: 20%;
        animation: blob-drift 24s ease-in-out infinite alternate;
    }
    @keyframes blob-drift {
        from { transform: translate(0, 0) scale(1); }
        to   { transform: translate(24px, 32px) scale(1.1); }
    }

    /* ── TOPBAR ─────────────────────────────── */
    .topbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        z-index: 10;
    }
    .logo {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    /* App icon */
    .logo-appicon {
        width: 58px; height: 58px;
        border-radius: 16px;
        background: linear-gradient(145deg, rgba(255,255,255,0.92) 0%, rgba(221,214,254,0.85) 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 20px rgba(0,0,0,0.22), 0 1px 4px rgba(0,0,0,0.15);
        padding: 6px;
        border: 1px solid rgba(255,255,255,0.6);
    }
    .appicon-inner {
        width: 100%; height: 100%;
        background: linear-gradient(145deg, #7c3aed, #4c1d95);
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: inset 0 1px 3px rgba(255,255,255,0.2);
    }
    .appicon-a {
        font-size: 22px;
        font-weight: 900;
        color: white;
        font-style: normal;
        line-height: 1;
        text-shadow: 0 1px 4px rgba(0,0,0,0.3);
    }

    .logo-text {
        display: flex;
        flex-direction: column;
        gap: 1px;
    }
    .logo-name {
        font-size: 19px;
        font-weight: 800;
        line-height: 1.1;
        letter-spacing: 0.2px;
    }
    .logo-a { color: #fb923c; }
    .logo-va { color: white; }
    .logo-clinic { color: white; font-style: normal; }
    .logo-sub {
        font-size: 10px;
        color: rgba(255,255,255,0.5);
        font-weight: 500;
        letter-spacing: 0.5px;
    }

    /* Lang toggle */
    .lang-toggle {
        display: flex;
        background: rgba(255,255,255,0.14);
        border: 1px solid rgba(255,255,255,0.22);
        border-radius: 22px;
        padding: 3px;
        gap: 2px;
        backdrop-filter: blur(8px);
    }
    .lang-btn {
        background: none;
        border: none;
        color: rgba(255,255,255,0.55);
        font-size: 12px;
        font-weight: 700;
        cursor: pointer;
        padding: 5px 14px;
        border-radius: 18px;
        transition: all 0.22s;
        letter-spacing: 0.6px;
    }
    .lang-btn.active {
        background: white;
        color: #4c1d95;
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    }

    /* ── CENTER ─────────────────────────────── */
    .center {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        z-index: 10;
        text-align: center;
    }

    /* ── SQUIRCLE WRAP ───────────────────────── */
    .squircle-wrap {
        position: relative;
        width: 270px;
        height: 270px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    /* Orbit rings — rotate in opposite directions */
    .ring {
        position: absolute;
        border-radius: 50%;
        border: 1px dashed rgba(255,255,255,0.18);
        pointer-events: none;
    }
    .ring-2 {
        width: 220px; height: 220px;
        animation: rotate-cw 14s linear infinite;
    }
    .ring-3 {
        width: 268px; height: 268px;
        animation: rotate-ccw 22s linear infinite;
    }
    @keyframes rotate-cw  { to { transform: rotate(360deg); } }
    @keyframes rotate-ccw { to { transform: rotate(-360deg); } }

    /* Orbit dot wrappers — rotate same speed as their ring so dot follows the edge */
    .orbit {
        position: absolute;
        border-radius: 50%;
        pointer-events: none;
        display: flex;
        align-items: flex-start;
        justify-content: center;
    }
    .orbit-outer {
        width: 268px; height: 268px;
        animation: rotate-ccw 22s linear infinite;
    }
    .orbit-inner {
        width: 220px; height: 220px;
        animation: rotate-cw 14s linear infinite;
    }
    .orbit-dot {
        width: 9px; height: 9px;
        border-radius: 50%;
        margin-top: -4.5px;
        flex-shrink: 0;
    }
    .orbit-gold {
        background: radial-gradient(circle, #fde68a 30%, #f59e0b 100%);
        box-shadow: 0 0 10px rgba(251,191,36,0.95), 0 0 4px rgba(251,191,36,0.6);
    }
    .orbit-pearl {
        background: radial-gradient(circle, #e9d5ff 30%, #a78bfa 100%);
        box-shadow: 0 0 8px rgba(167,139,250,0.9), 0 0 3px rgba(167,139,250,0.5);
    }

    /* Float wrapper — only handles vertical drift */
    .squircle-floater {
        z-index: 2;
        animation: squircle-float 4s ease-in-out infinite;
    }
    @keyframes squircle-float {
        0%, 100% { transform: translateY(0px); }
        50%       { transform: translateY(-10px); }
    }

    /* Squircle card — only handles breathing scale */
    .squircle {
        width: 200px;
        height: 200px;
        border-radius: 44px;
        background: linear-gradient(145deg,
            rgba(255,255,255,0.9) 0%,
            rgba(237,233,254,0.78) 55%,
            rgba(221,214,254,0.68) 100%);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255,255,255,0.72);
        box-shadow:
            0 20px 60px rgba(0,0,0,0.22),
            0 4px 16px rgba(0,0,0,0.13),
            inset 0 1px 2px rgba(255,255,255,0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        animation: squircle-breath 3s ease-in-out infinite;
    }
    @keyframes squircle-breath {
        0%, 100% { transform: scale(1);    box-shadow: 0 20px 60px rgba(0,0,0,0.22), 0 4px 16px rgba(0,0,0,0.13), inset 0 1px 2px rgba(255,255,255,0.95); }
        50%       { transform: scale(1.04); box-shadow: 0 24px 70px rgba(124,58,237,0.18), 0 6px 20px rgba(0,0,0,0.15), inset 0 1px 2px rgba(255,255,255,0.95); }
    }

    /* Glow orb behind circle — soft radiate */
    .circle-glow {
        position: absolute;
        width: 110px; height: 110px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(124,58,237,0.3) 0%, transparent 70%);
        animation: glow-radiate 3s ease-in-out infinite;
        pointer-events: none;
    }
    @keyframes glow-radiate {
        0%, 100% { transform: scale(1);    opacity: 0.6; }
        50%       { transform: scale(1.35); opacity: 0; }
    }

    /* Purple circle — heartbeat pulse */
    .squircle-circle {
        width: 88px; height: 88px;
        border-radius: 50%;
        background: linear-gradient(145deg, #7c3aed, #4c1d95);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 8px 24px rgba(124,58,237,0.45), inset 0 1px 3px rgba(255,255,255,0.2);
        position: relative;
        z-index: 1;
        animation: heartbeat 2s ease-in-out infinite;
    }
    @keyframes heartbeat {
        0%        { transform: scale(1);    box-shadow: 0 8px 24px rgba(124,58,237,0.45); }
        14%       { transform: scale(1.11); box-shadow: 0 10px 32px rgba(124,58,237,0.7); }
        28%       { transform: scale(0.97); box-shadow: 0 7px 20px rgba(124,58,237,0.35); }
        42%       { transform: scale(1.07); box-shadow: 0 9px 28px rgba(124,58,237,0.6); }
        56%, 100% { transform: scale(1);    box-shadow: 0 8px 24px rgba(124,58,237,0.45); }
    }
    .squircle-a {
        font-size: 40px;
        font-weight: 900;
        color: white;
        font-style: normal;
        line-height: 1;
        text-shadow: 0 2px 8px rgba(0,0,0,0.25);
    }

    /* Version badge */
    .version-badge {
        display: flex;
        align-items: center;
        gap: 7px;
        background: rgba(255,255,255,0.1);
        border: 1px solid rgba(255,255,255,0.2);
        border-radius: 20px;
        padding: 5px 16px;
        font-size: 11.5px;
        font-weight: 600;
        color: rgba(255,255,255,0.85);
        letter-spacing: 0.3px;
    }
    .badge-dot {
        width: 7px; height: 7px;
        background: #4ade80;
        border-radius: 50%;
        box-shadow: 0 0 7px rgba(74,222,128,0.9);
        animation: dot-pulse 2s ease-in-out infinite;
    }
    @keyframes dot-pulse {
        0%, 100% { opacity: 1; box-shadow: 0 0 7px rgba(74,222,128,0.9); }
        50%       { opacity: 0.6; box-shadow: 0 0 3px rgba(74,222,128,0.4); }
    }

    /* Title */
    .title {
        font-size: 32px;
        font-weight: 800;
        color: white;
        line-height: 1.3;
        margin: 0;
    }
    .brand {
        color: #fb923c;
        font-style: normal;
        font-weight: 900;
    }
    .subtitle {
        font-size: 13.5px;
        color: rgba(255,255,255,0.6);
        line-height: 1.8;
        margin: 0;
    }

    /* Stats */
    .stats {
        display: flex;
        align-items: center;
        gap: 20px;
        background: rgba(255,255,255,0.08);
        border: 1px solid rgba(255,255,255,0.16);
        border-radius: 20px;
        padding: 16px 32px;
        backdrop-filter: blur(12px);
    }
    .stat { display: flex; flex-direction: column; align-items: center; gap: 3px; }
    .stat-num { font-size: 21px; font-weight: 900; color: white; }
    .stat-label { font-size: 10.5px; color: rgba(255,255,255,0.55); font-weight: 500; }
    .stat-sep { width: 1px; height: 34px; background: rgba(255,255,255,0.2); }

    /* ── FOOTER ─────────────────────────────── */
    .footer {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        z-index: 10;
        width: 100%;
    }
    .footer-copy {
        font-size: 10px;
        color: rgba(255,255,255,0.32);
        margin: 0;
    }
    .footer-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }
    .socials { display: flex; gap: 4px; }
    .soc-icon {
        color: rgba(255,255,255,0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        width: 26px; height: 26px;
        border-radius: 7px;
        transition: all 0.2s;
        text-decoration: none;
    }
    .soc-icon:hover { color: white; background: rgba(255,255,255,0.1); }
    .contacts { display: flex; gap: 14px; }
    .contact-item {
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 10.5px;
        color: rgba(255,255,255,0.38);
    }
</style>
