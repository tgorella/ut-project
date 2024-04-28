import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { fetchUserModules } from './fetchUserModules'

describe('fetchUserModules.test', () => {

    test('success', async() => {
        const data = {data: {
            modules: {
                _id: Date.now().toString(),
                clients: true,
                orders: true,
                calendar: true,
                projects: true
            }
        }}


        const thunk = new TestAsyncThunk(fetchUserModules)
        thunk.api.post.mockReturnValue(Promise.resolve({data}))

        const result = await thunk.callThunk()

        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(data.data.modules)

    })
    test('error fetch', async() => {
      
        const thunk = new TestAsyncThunk(fetchUserModules)
        thunk.api.post.mockReturnValue(Promise.resolve({status: 403}))
        const result = await thunk.callThunk()
      
        expect(result.meta.requestStatus).toBe('rejected')
    })
})