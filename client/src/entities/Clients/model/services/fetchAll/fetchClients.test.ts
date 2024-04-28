import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { fetchClients } from './fetchClients'

describe('fetchClients.test', () => {
    test('success', async () => {
        const data = {data: {
            clients: []
        }}

        const thunk = new TestAsyncThunk(fetchClients)
        thunk.api.post.mockReturnValue(Promise.resolve({data}))
        const result = await thunk.callThunk()

        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(data.data.clients)
    })
    test('error fetch', async () => {
        const thunk = new TestAsyncThunk(fetchClients)
        thunk.api.post.mockReturnValue(Promise.resolve({status: 403}))
        const result = await thunk.callThunk()

        expect(result.meta.requestStatus).toBe('rejected')
    })
})