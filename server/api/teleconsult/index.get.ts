import {
    mockTeleconsultSummary,
    mockTeleconsultSchedule,
    mockTeleconsultWaitingRoom,
    mockTeleconsultDoctors,
    mockTeleconsultLiveConsult,
    mockTeleconsultStatistics
} from '../../utils/db'
import { simulateDelay } from '../../utils/delay'

export default defineEventHandler(async () => {
    await simulateDelay(400)

    return {
        status: 'success',
        data: {
            summary: mockTeleconsultSummary,
            schedule: mockTeleconsultSchedule,
            waitingRoom: mockTeleconsultWaitingRoom,
            doctors: mockTeleconsultDoctors,
            liveConsult: mockTeleconsultLiveConsult,
            statistics: mockTeleconsultStatistics
        }
    }
})
