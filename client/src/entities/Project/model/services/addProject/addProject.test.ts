import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { addProject } from './addProject'

describe('addProject.test', () => {
    test('success', async () => {
        const data = {data: {
            addProject: {
                _id: '1',
                name: 'Project',
                stages: []
            }
        }}

        const thunk = new TestAsyncThunk(addProject)
        thunk.api.post.mockReturnValue(Promise.resolve({data}))

        const result = await thunk.callThunk({name: 'Project'})

        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(data.data.addProject)
    })
    test('error fetch', async () => {
        const thunk = new TestAsyncThunk(addProject)
        thunk.api.post.mockReturnValueOnce(Promise.resolve({status: 403}))
        const result = await thunk.callThunk({name: 'Project'})

        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('rejected')
    })
})