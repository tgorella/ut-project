import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { getClientOrders } from './getClientOrders'

describe('getClientOrders.test', () => {
    test('success', async () => {

        const data = {data: {
            ordersByClient: [
                {
                    _id: '643c5fe7013e22868a6eb63c',
                    title: 'Заказ 1',
                    status: {
                        color: 'green',
                        name: 'В обработке',
                        _id: '643c5fe7013e22868a6eb63c'
                    },
                    orderNumber: '12345',}
            ]
        }}

        const thunk = new TestAsyncThunk(getClientOrders)
        thunk.api.post.mockReturnValue(Promise.resolve({data}))

        const result = await thunk.callThunk('643c5fe7013e22868a6eb63c')
        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(data.data.ordersByClient)
    })
    test('error fetch', async () => {
        const thunk = new TestAsyncThunk(getClientOrders)
        thunk.api.post.mockReturnValue(Promise.resolve({status: 403}))
        const result = await thunk.callThunk('643c5fe7013e22868a6eb63c')
        
        expect(result.meta.requestStatus).toBe('rejected')
    })
})