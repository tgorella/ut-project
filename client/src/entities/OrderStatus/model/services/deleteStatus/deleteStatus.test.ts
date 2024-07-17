import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { deleteStatus } from './deleteStatus'

describe('deleteStatus.test', () => {
    test('should return value', async () => {
        const data = {
            data: {
                deleteOrderStatus: {
                    _id: 'deleted status'
                }
            }
        }

        const thunk = new TestAsyncThunk(deleteStatus)
        thunk.api.post.mockReturnValue(Promise.resolve({data}))

        const result = await thunk.callThunk('deleted status')

        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(data.data.deleteOrderStatus)
    })
    test('error fetch', async () => {
        const thunk = new TestAsyncThunk(deleteStatus)
        thunk.api.post.mockReturnValue(Promise.resolve({status: 403}))
    })

})