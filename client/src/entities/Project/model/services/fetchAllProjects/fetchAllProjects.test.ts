import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { fetchProjects } from './fetchAllProjects'

describe('fetchAllProjects.test', () => {
    test('success', async () => {
        const data = {data: {
            projects: [
                {
                    _id: '1',
                    name: 'Project 1'
                },
                {
                    _id: '2',
                    name: 'Project 2'
                }
            ]
        }}

        const thunk = new TestAsyncThunk(fetchProjects)
        thunk.api.post.mockReturnValue(Promise.resolve({data}))

        const result = await thunk.callThunk()

        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(data.data.projects)
    })
    test('fetch error', async () => {
        const thunk = new TestAsyncThunk(fetchProjects)
        thunk.api.post.mockReturnValue(Promise.resolve({status: 403}))

        const result = await thunk.callThunk()

        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('rejected')
    })
})