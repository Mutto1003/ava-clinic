import { simulateDelay } from '../../utils/delay'

export default defineEventHandler(async (event) => {
    await simulateDelay(400)
    const body = await readBody(event)

    return {
        status: 'success',
        data: body
    }
})
