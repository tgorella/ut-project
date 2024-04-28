import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { addOrderStatus } from './addOrderStatus'

describe('addOrderStatus.test', () => {
    test('success', async () => {
        const data = {
            data: {
                addOrderStatus: {
                    _id: 'id',
                    color: 'color',
                    name: 'name'
                }
            }
        }

        const thunk = new TestAsyncThunk(addOrderStatus)
        thunk.api.post.mockReturnValue(Promise.resolve({data}))

        const result = await thunk.callThunk({color: 'color', name: 'name'})

        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(data.data.addOrderStatus)
    })
    test('error fetch', async () => {
        const thunk = new TestAsyncThunk(addOrderStatus)
        thunk.api.post.mockReturnValue(Promise.resolve({status: 403}))

        const result = await thunk.callThunk({color: 'color', name: 'name'})

        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('rejected')
    })
})