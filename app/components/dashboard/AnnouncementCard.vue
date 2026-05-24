<template>
    <div class="announce-card" data-testid="announcement-card">
        <!-- Background decoration -->
        <div class="announce-blob" />

        <!-- Content -->
        <div class="announce-body">
            <p class="announce-section">🚩 ข่าวสารพนักงาน</p>
            <p class="announce-text">ประกาศปรับปรุงระบบ Teleconsult<br />ประจำเดือนพฤษภาคม 2569</p>
            <button class="announce-btn" type="button">อ่านรายละเอียด</button>
        </div>
    </div>
</template>

<style scoped>
    .announce-card {
        background: linear-gradient(135deg, #059669 0%, #0d9488 100%);
        border-radius: 16px;
        padding: 24px 22px;
        position: relative;
        overflow: hidden;
        box-shadow: 0 4px 20px rgba(5, 150, 105, 0.3);
    }
    .announce-blob {
        position: absolute;
        width: 130px;
        height: 130px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 50%;
        bottom: -40px;
        right: -30px;
        pointer-events: none;
    }
    .announce-body {
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .announce-section {
        font-size: 11px;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.7);
        letter-spacing: 0.5px;
        margin: 0;
        text-transform: uppercase;
    }
    .announce-text {
        font-size: 15px;
        font-weight: 700;
        color: white;
        line-height: 1.5;
        margin: 0;
    }
    .announce-btn {
        margin-top: 6px;
        background: rgba(255, 255, 255, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.35);
        color: white;
        font-size: 12.5px;
        font-weight: 600;
        padding: 8px 18px;
        border-radius: 8px;
        cursor: pointer;
        width: fit-content;
        transition: background 0.15s;
        backdrop-filter: blur(4px);
    }
    .announce-btn:hover {
        background: rgba(255, 255, 255, 0.3);
    }
</style>
