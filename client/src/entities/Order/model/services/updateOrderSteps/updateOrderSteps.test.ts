import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { updateOrderSteps } from './updateOrderSteps'

describe('updateOrderSteps.test', () => {
    test('success', async () => {
        const data = { data : {
            updateOrder: {
                _id: '643c34fj3ytg43e22868a6eb63c',
                title: 'test order',
                steps: [
                    'in_progress','in_progress','in_progress'
                ]
            }
        }}

        const thunk = new TestAsyncThunk(updateOrderSteps)
        thunk.api.post.mockReturnValue(Promise.resolve({data}))
        const result = await thunk.callThunk({_id: '643c34fj3ytg43e22868a6eb63c', steps: []})

        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(data.data.updateOrder)
    })
    test('error fetch', async () => {
        const thunk = new TestAsyncThunk(updateOrderSteps)
        thunk.api.post.mockReturnValue(Promise.resolve({status: 403}))
        const result = await thunk.callThunk({_id: '643c34fj3ytg43e22868a6eb63c', steps: []})

        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('rejected')
    })
})