import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { updateStage } from './updateStage'

describe('updateStage.test', () => {
    test('success', async () => {
        const data = {data: {
            updateProjectStage: {
                _id: '1',
                name: 'New Name'
            }
        }}

        const thunk = new TestAsyncThunk(updateStage)
        thunk.api.post.mockReturnValue(Promise.resolve({data}))

        const result = await thunk.callThunk({_id: '1', name: 'New Name'})

        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(data.data.updateProjectStage)
    })
    test('fetch error', async () => {
        const thunk = new TestAsyncThunk(updateStage)
        thunk.api.post.mockReturnValue(Promise.resolve({status: 403}))

        const result = await thunk.callThunk({_id: '1', name: 'New Name'})

        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('rejected')
    })
})