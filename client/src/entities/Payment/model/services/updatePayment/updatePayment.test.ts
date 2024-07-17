import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { updatePayment } from './updatePayment'

describe('updatePayment.test', () => {
    test('success', async () => {
        const data = {
            data: {
                updatePayment: {
                    _id: '643c34fj3ytg43e22868a6eb63c',
                    amount: '5999'
                }
            }
        }

        const thunk = new TestAsyncThunk(updatePayment)
        thunk.api.post.mockReturnValue(Promise.resolve({data}))

        const result = await thunk.callThunk({id:'643c34fj3ytg43e22868a6eb63c', data: {amount: '5999'}})

        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(data.data.updatePayment)
    })
    test('error fetch', async () => {
        const thunk = new TestAsyncThunk(updatePayment)
        thunk.api.post.mockReturnValue(Promise.resolve({status: 403}))
        const result = await thunk.callThunk({id:'643c34fj3ytg43e22868a6eb63c', data: {amount: '5999'}})
        expect(result.meta.requestStatus).toBe('rejected')
    })
})