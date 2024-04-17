import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { updateOrderData } from './updateOrderData'

describe('updateOrderData.test', () => {
    test('success', async () => {
        const data = {
            data: {
                updateOrder: {
                    _id: '643c34fj3ytg43e22868a6eb63c',
                    title: 'test order'
                }
            }
        }

        const thunk = new TestAsyncThunk(updateOrderData, {
            orderDetails: {
                form: data.data.updateOrder
            }
        })
        thunk.api.post.mockReturnValue(Promise.resolve({data}))

        const result = await thunk.callThunk('643c34fj3ytg43e22868a6eb63c')

        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(data.data.updateOrder)
    })
    test('error fetch', async () => {
        const thunk = new TestAsyncThunk(updateOrderData)
        thunk.api.post.mockReturnValue(Promise.resolve({status: 403}))
        const result = await thunk.callThunk('643c34fj3ytg43e22868a6eb63c')
        expect(result.meta.requestStatus).toBe('rejected')
    })
})