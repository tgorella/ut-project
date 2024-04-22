import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { fetchOrderStatuses } from './fetchOrderStatuses'

describe('fetchOrderStatuses.test', () => {
    test('should return value', async () => {
        const data = {
            data: {
                orderStatuses: [
                    {
                        _id: '6467834500aba6813881d4',
                        name: 'Новый',
                        color: '',
                        isDefault: true
                    }
                ]
            }
        }
        const thunk = new TestAsyncThunk(fetchOrderStatuses)
        thunk.api.post.mockReturnValue(Promise.resolve({data}))

        const result = await thunk.callThunk()

        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(data.data.orderStatuses)
    })
    test('error fetch', async () => {
        const thunk = new TestAsyncThunk(fetchOrderStatuses)
        thunk.api.post.mockReturnValue(Promise.resolve({status: 403}))
    })
})