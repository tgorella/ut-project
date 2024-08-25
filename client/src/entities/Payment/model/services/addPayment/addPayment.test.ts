import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { addPayment } from './addPayment'

describe('addPayment.test', () => {
    test('seccess', async () => {
        const data = { data: {
            addPayment: {
                _id: '1',
                number: '1',
                date: '2022-01-01',
                method: 'alf',
                order: '1',
                amount: '4999',
                notes: 'Some notes'
            }
        }}

        const thunk = new TestAsyncThunk(addPayment)
        thunk.api.post.mockReturnValue(Promise.resolve({data}))

        const result = await thunk.callThunk({
            newPaymentData: {
                number: '1',
                date: '2022-01-01',
                method: 'alf',
                order: '1',
                amount: '4999',
                notes: 'Some notes'
            },
            res: '_id number date method order amount notes'
          
        })

        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(data.data.addPayment)
    })
    test('fetch error', async () => {
        const thunk = new TestAsyncThunk(addPayment)
        thunk.api.post.mockReturnValue(Promise.resolve({status: 403}))

        const result = await thunk.callThunk({})

        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('rejected')
    })
})