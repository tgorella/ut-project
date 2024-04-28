import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { deleteClient } from './deleteClient'

describe('deleteClient.test', () => {
    test('success', async () => {
        const data = { data: {
            deleteClient: '643c34fj3ytg43e22868a6eb63c'
        }}

        const thunk = new TestAsyncThunk(deleteClient)
        thunk.api.post.mockReturnValue(Promise.resolve({data}))

        const result = await thunk.callThunk('643c34fj3ytg43e22868a6eb63c')
        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(data.data.deleteClient)
    })
    test('error fetch', async () => {
        const thunk = new TestAsyncThunk(deleteClient)
        thunk.api.post.mockReturnValue(Promise.resolve({status: 403}))
        const result = await thunk.callThunk('643c34fj3ytg43e22868a6eb63c')
        expect(result.meta.requestStatus).toBe('rejected')
    })
})