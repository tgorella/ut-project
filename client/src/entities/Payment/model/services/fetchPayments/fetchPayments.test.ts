import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { fetchPayments } from './fetchPayments'

describe('fetchPayments', () => {
    test('success', async () => {
        const data = { data: {
            payments: [{
                _id: '643c34fj3ytg43e22868a6eb63c',
            },
            {
                _id: '123c343e22868a6eb6sfdsg33d',
            },
            {
                _id: '123c343e22868a6eb6asd32d3d',
            }]
        }}

        const thunk = new TestAsyncThunk(fetchPayments)
        thunk.api.post.mockReturnValue(Promise.resolve({data}))

        const result = await thunk.callThunk('_id')

        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(data.data.payments)
    })
    test('error fetch', async () => {
        const thunk = new TestAsyncThunk(fetchPayments)
        thunk.api.post.mockReturnValue(Promise.resolve({status: 403}))
        const result = await thunk.callThunk('_id')

        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('rejected')
    })
})