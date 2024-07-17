import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { getOrderById } from './getOrderById'

describe('getOrderbyId.test', () => {
    test('success', async () => {
        const data = {
            data: {
                order: {
                    _id: '643c34fj3ytg43e22868a6eb63c',
                    title: 'test order'
                }
            }
        }

        const thunk = new TestAsyncThunk(getOrderById)
        thunk.api.post.mockReturnValue(Promise.resolve({data}))

        const result = await thunk.callThunk('643c34fj3ytg43e22868a6eb63c')

        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(data.data.order)
    })
    test('error fetch', async () => {
        const thunk = new TestAsyncThunk(getOrderById)
        thunk.api.post.mockReturnValue(Promise.resolve({status: 403}))

        const result = await thunk.callThunk('643c34fj3ytg43e22868a6eb63c')
        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('rejected')
    })
})