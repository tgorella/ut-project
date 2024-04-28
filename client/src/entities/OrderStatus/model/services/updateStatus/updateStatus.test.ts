import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { updateStatus } from './updateStatus'

describe('updateStatus.test', () => {
    test('success', async () => {
        const data = {
            data: {
                updateOrderStatus: {
                    _id: 'id',
                    color: 'color',
                    name: 'name'
                }
            }
        }

        const thunk = new TestAsyncThunk(updateStatus)
        thunk.api.post.mockReturnValue(Promise.resolve({data}))

        const result = await thunk.callThunk({color: 'color', name: 'name', _id: 'id'})

        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(data.data.updateOrderStatus)
    })
    test('error fetch', async () => {
        const thunk = new TestAsyncThunk(updateStatus)
        thunk.api.post.mockReturnValue(Promise.resolve({status: 403}))
    })
})