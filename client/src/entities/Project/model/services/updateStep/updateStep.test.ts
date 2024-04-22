import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { updateStep } from './updateStep'

describe('updateStep.test', () => {
    test('success', async () => {
        const data = { data: {
            updateProjectStep: {
                _id: '1',
                name: 'New Name'
            }
        }}

        const thunk = new TestAsyncThunk(updateStep)
        thunk.api.post.mockReturnValue(Promise.resolve({data}))

        const result = await thunk.callThunk({_id: '1', name: 'New Name'})

        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(data.data.updateProjectStep)
    })
    test('fetch error', async () => {
        const thunk = new TestAsyncThunk(updateStep)
        thunk.api.post.mockReturnValue(Promise.resolve({status: 403}))

        const result = await thunk.callThunk({_id: '1', name: 'New Name'})

        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('rejected')
    })
})