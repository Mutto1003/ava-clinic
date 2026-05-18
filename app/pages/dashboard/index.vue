<script setup lang="ts">
    import { useAuthStore } from '~/stores/auth'

    definePageMeta({
        layout: 'main',
        middleware: ['auth']
    })

    const authStore = useAuthStore()
    const searchQuery = ref('')

    const quickActions = [
        {
            title: 'เพิ่มลูกค้าใหม่',
            icon: 'i-lucide-user-plus',
            gradient: 'linear-gradient(135deg, #3b82f6, #2563eb)',
            to: '/customerNew'
        },
        {
            title: 'ลงทะเบียน',
            icon: 'i-lucide-clipboard-check',
            gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
            action: () => navigateTo('/register')
        },
        {
            title: 'คิวรับบริการ',
            icon: 'i-lucide-clock',
            gradient: 'linear-gradient(135deg, #10b981, #059669)'
        },
        {
            title: 'ปฏิทินนัดหมาย',
            icon: 'i-lucide-calendar',
            gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)'
        },
        {
            title: 'รับเข้าสินค้า',
            icon: 'i-lucide-package-plus',
            gradient: 'linear-gradient(135deg, #f97316, #ea580c)'
        }
    ]

    const summaryCards = [
        {
            title: 'สินค้าหมดอายุ',
            value: 12,
            icon: 'i-lucide-alert-triangle',
            iconColor: '#f59e0b',
            iconBg: '#fef3c7',
            description: ''
        },
        {
            title: 'ต้องสั่งซื้อเพิ่ม',
            value: 5,
            icon: 'i-lucide-shopping-cart',
            iconColor: '#8b5cf6',
            iconBg: '#ede9fe',
            description: 'รอดำเนินการ'
        },
        {
            title: 'นัดหมายวันนี้',
            value: 8,
            icon: 'i-lucide-calendar-days',
            iconColor: '#3b82f6',
            iconBg: '#dbeafe',
            description: ''
        },
        {
            title: 'LINE / เลื่อนนัด',
            value: 3,
            icon: 'i-lucide-message-square',
            iconColor: '#10b981',
            iconBg: '#d1fae5',
            description: 'รอการตอบกลับ'
        }
    ]
</script>

<template>
    <div class="dash-page p-4 md:p-4 max-w-6xl mx-auto min-h-screen">
        <!-- ── Clinic Header & Search ── -->
        <DashboardClinicHeader v-model:searchQuery="searchQuery" />

        <!-- ── Quick Actions ── -->
        <div class="quick-actions-grid mb-8">
            <DashboardQuickActionCard
                v-for="(action, idx) in quickActions"
                :key="idx"
                :title="action.title"
                :icon="action.icon"
                :gradient="action.gradient"
                @click="action.to ? navigateTo(action.to) : action.action?.()"
            />
        </div>

        <!-- ── Summary Cards ── -->
        <div class="summary-grid mb-8">
            <DashboardSummaryCard
                v-for="(card, idx) in summaryCards"
                :key="idx"
                :title="card.title"
                :value="card.value"
                :icon="card.icon"
                :icon-color="card.iconColor"
                :icon-bg="card.iconBg"
                :description="card.description"
            >
                <template v-if="card.title === 'สินค้าหมดอายุ'" #description>
                    <UIcon
                        name="i-lucide-trending-up"
                        style="width: 12px; height: 12px; color: #f59e0b"
                    />
                    <span style="color: #f59e0b">+2 จากเมื่อวาน</span>
                </template>
                <template v-else-if="card.title === 'นัดหมายวันนี้'" #description>
                    <UIcon name="i-lucide-clock" style="width: 12px; height: 12px" />
                    <span>นัดถัดไป 14:00 น.</span>
                </template>
            </DashboardSummaryCard>
        </div>

        <!-- ── Bottom: Table + Right Panel ── -->
        <div class="bottom-grid">
            <!-- Appointment table (left 2/3) -->
            <div class="table-col">
                <DashboardAppointmentTable />
            </div>

            <!-- Right panel (1/3) -->
            <div class="right-col">
                <DashboardAnnouncementCard />

                <!-- Recent Activities -->
                <DashboardRecentActivities />
            </div>
        </div>
    </div>
</template>

<style scoped>
    .dash-page {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 4px 32px;
        display: flex;
        flex-direction: column;
        gap: 24px;
    }


    /* ── Quick Actions ── */
    .quick-actions-grid {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 16px;
    }

    /* ── Summary Cards ── */
    .summary-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 16px;
    }

    /* ── Bottom Grid ── */
    .bottom-grid {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 20px;
        align-items: start;
    }
    .table-col {
        min-width: 0;
    }
    .right-col {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }


    /* Responsive */
    @media (max-width: 1024px) {
        .quick-actions-grid {
            grid-template-columns: repeat(3, 1fr);
        }
        .summary-grid {
            grid-template-columns: repeat(2, 1fr);
        }
        .bottom-grid {
            grid-template-columns: 1fr;
        }
    }
    @media (max-width: 640px) {
        .quick-actions-grid {
            grid-template-columns: repeat(2, 1fr);
        }
        .summary-grid {
            grid-template-columns: 1fr 1fr;
        }
    }
</style>
