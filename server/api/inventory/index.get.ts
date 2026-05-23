import {
    mockInventorySummary,
    mockInventoryCategories,
    mockInventoryLocations,
    mockInventoryItems,
    mockInventoryExpiring,
    mockInventoryMovements,
    mockInventoryCategoryValues
} from '../../utils/db'
import { simulateDelay } from '../../utils/delay'

export default defineEventHandler(async () => {
    await simulateDelay(400)

    return {
        status: 'success',
        data: {
            summary: mockInventorySummary,
            categories: mockInventoryCategories,
            locations: mockInventoryLocations,
            items: mockInventoryItems,
            expiring: mockInventoryExpiring,
            movements: mockInventoryMovements,
            categoryValues: mockInventoryCategoryValues
        }
    }
})
