import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { deletePayment } from './deletePayment'

describe('deletePayment.test', () => {
    test('success', async () => {
        const data= {
            data: {
                deletePayment: {
                    _id: '12345890r'
                }
            }
        }

        const thunk = new TestAsyncThunk(deletePayment)
        thunk.api.post.mockReturnValue(Promise.resolve({data}))

        const result = await thunk.callThunk('12345890r')

        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(data.data.deletePayment)
    })
    test('error', async () => {
        const thunk = new TestAsyncThunk(deletePayment)
        thunk.api.post.mockReturnValue(Promise.resolve({status: 403}))
        const result = await thunk.callThunk('12345890r')
        
        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('rejected')
    })
})