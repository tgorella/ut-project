import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { deleteOrder } from './deleteOrder'

describe('deleteOrder.test', () => {
    test('success', async () => {
        const data= {
            data: {
                deleteOrder: {
                    _id: 'deletedOrder'
                }
            }
        }

        const thunk = new TestAsyncThunk(deleteOrder)
        thunk.api.post.mockReturnValue(Promise.resolve({data}))

        const result = await thunk.callThunk('deletedOrder')

        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(data.data.deleteOrder)
    })
    test('error fetch', async () => {
        const thunk = new TestAsyncThunk(deleteOrder)
        thunk.api.post.mockReturnValue(Promise.resolve({status: 403}))
        const result = await thunk.callThunk('deletedOrder')
        
        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('rejected')
    })
})