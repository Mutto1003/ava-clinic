import {
    mockReportMetrics,
    mockTopServices,
    mockStaffRevenue,
    mockRecentBills,
    mockDailyRevenue,
    mockPaymentMethods
} from '../../utils/db'
import { simulateDelay } from '../../utils/delay'

export default defineEventHandler(async event => {
    await simulateDelay(400)

    const query = getQuery(event)
    const period = (query.period as string) || 'daily'
    const compare = (query.compare as string) || 'previous'

    const periodMeta = {
        daily: { label: '1 พ.ค. - 14 พ.ค. 2026', days: 14 },
        weekly: { label: 'สัปดาห์ที่ 18-19 พ.ค. 2026', days: 14 },
        monthly: { label: 'พฤษภาคม 2026', days: 31 },
        yearly: { label: 'ปี 2026', days: 365 },
        custom: { label: (query.startDate ?? '') + ' - ' + (query.endDate ?? ''), days: 14 }
    }

    return {
        status: 'success',
        data: {
            metrics: mockReportMetrics,
            topServices: mockTopServices,
            staffRevenue: mockStaffRevenue,
            recentBills: mockRecentBills,
            paymentMethods: mockPaymentMethods,
            dailyRevenue: mockDailyRevenue,
            totalBills: mockReportMetrics.bills.value,
            period: periodMeta[period as keyof typeof periodMeta] ?? periodMeta.daily,
            meta: { period, compare }
        }
    }
})
