import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { addStage } from './addStage'

describe('addStage.test', () => {
    test('success', async () => {
        const data = { data: {
            addProjectStage: {
                _id: '1',
                name: 'Stage',
                projectId: '1'
            }
        }}

        const thunk = new TestAsyncThunk(addStage)
        thunk.api.post.mockReturnValue(Promise.resolve({data}))

        const result = await thunk.callThunk({name: 'Stage', projectId: '1'})

        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(data.data.addProjectStage)
    })
    test('error fetch', async () => {
        const thunk = new TestAsyncThunk(addStage)
        thunk.api.post.mockReturnValueOnce(Promise.resolve({status: 403}))

        const result = await thunk.callThunk({name: 'Stage', projectId: '1'})

        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('rejected')
    })
})