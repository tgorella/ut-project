import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { fetchOrders } from './fetchOrders'

describe('fetchOrders', () => {
    test('success', async () => {
        const data = { data: {
            orders: [{
                _id: '643c34fj3ytg43e22868a6eb63c',
            },
            {
                _id: '123c343e22868a6eb63d',
            }]
        }}

        const thunk = new TestAsyncThunk(fetchOrders)
        thunk.api.post.mockReturnValue(Promise.resolve({data}))

        const result = await thunk.callThunk({text: '', resParams: ''})

        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(data.data.orders)
    })
    test('error fetch', async () => {
        const thunk = new TestAsyncThunk(fetchOrders)
        thunk.api.post.mockReturnValue(Promise.resolve({status: 403}))
        const result = await thunk.callThunk({text: '', resParams: ''})

        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('rejected')
    })
})