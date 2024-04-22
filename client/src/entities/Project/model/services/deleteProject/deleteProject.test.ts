import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { deleteProject } from './deleteProject'

describe('deleteProject.test', () => {
    test('success', async () => {
        const data = {data: {
            deleteProject: {
                _id: '1',
            }
        }}

        const thunk = new TestAsyncThunk(deleteProject)
        thunk.api.post.mockReturnValue(Promise.resolve({data}))

        const result = await thunk.callThunk('1')

        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(data.data.deleteProject)
    })
    test('error fetch', async () => {
        const thunk = new TestAsyncThunk(deleteProject)
        thunk.api.post.mockReturnValue(Promise.resolve({status: 403}))

        const result = await thunk.callThunk('1')

        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('rejected')
    })
})