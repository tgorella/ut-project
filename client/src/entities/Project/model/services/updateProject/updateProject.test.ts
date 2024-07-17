import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { updateProject } from './updateProject'

describe('updateProject.test', () => {
    test('success', async () => {
        const data= {data: {
            updateProject: {
                _id: '1',
                name: 'New Name'
            }
        }}

        const thunk = new TestAsyncThunk(updateProject)
        thunk.api.post.mockReturnValue(Promise.resolve({data}))

        const result = await thunk.callThunk({_id: '1', name: 'New Name'})

        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(data.data.updateProject)
    })
    test('fetch error', async () => {
        const thunk = new TestAsyncThunk(updateProject)
        thunk.api.post.mockReturnValue(Promise.resolve({status: 403}))

        const result = await thunk.callThunk({_id: '1', name: 'New Name'})

        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('rejected')
    })
})