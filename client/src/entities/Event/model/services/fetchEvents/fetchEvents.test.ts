import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { fetchEvents } from './fetchEvents'

describe('fetchEvents.test', () => {
    test('success', async () => {
        const data = {data: {
            events: [1],
            orders: [2]
        }
        }
        const thunk = new TestAsyncThunk(fetchEvents)
        thunk.api.post.mockReturnValue(Promise.resolve({data}))

        const result = await thunk.callThunk()
        expect(thunk.api.post).toHaveBeenCalledTimes(2)
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual([1,2])
    })
    test('error fetch', async () => {
        const thunk = new TestAsyncThunk(fetchEvents)
        thunk.api.post.mockReturnValue(Promise.resolve({status: 403}))
        const result = await thunk.callThunk()
        expect(thunk.api.post).toHaveBeenCalledTimes(2)
        expect(result.meta.requestStatus).toBe('rejected')

    })
})