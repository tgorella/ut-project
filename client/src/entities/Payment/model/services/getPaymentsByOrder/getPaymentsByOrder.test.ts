import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { getPaymentsByOrder } from './getPaymentsByOrder'

describe('getPaymentByOrderId.test', () => {
    test('success', async () => {
        const data = {
            data: {
                paymentsByOrder: [{
                    _id: '235425',
                    orderId: '643c34fj3ytg43e22868a6eb63c',
                }]
            }
        }

        const thunk = new TestAsyncThunk(getPaymentsByOrder)
        thunk.api.post.mockReturnValue(Promise.resolve({data}))

        const result = await thunk.callThunk({orderId:'643c34fj3ytg43e22868a6eb63c', resParams: '_id'})

        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(data.data.paymentsByOrder)
    })
    test('error', async () => {
        const thunk = new TestAsyncThunk(getPaymentsByOrder)
        thunk.api.post.mockReturnValue(Promise.resolve({status: 403}))

        const result = await thunk.callThunk({orderId:'643c34fj3ytg43e22868a6eb63c', resParams: '_id'})
        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('rejected')
    })
})