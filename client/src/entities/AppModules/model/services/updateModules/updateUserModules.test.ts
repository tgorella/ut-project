import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { updateModules } from './updateModules'

describe('updateUserModules.test', () => {

    test('success', async() => {
        const data = { data: { 
            updateModules: {
                _id: Date.now().toString(),
                clients: true,
                orders: true,
                calendar: true,
                projects: true
            }}}

        const thunk = new TestAsyncThunk(updateModules, {
            userModules: {
                data: data.data.updateModules
            }
        })
        thunk.api.post.mockReturnValue(Promise.resolve({data}))

        const result = await thunk.callThunk()

        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(data.data.updateModules)

    })
    test('error fetch', async() => {
      
        const thunk = new TestAsyncThunk(updateModules)
        thunk.api.post.mockReturnValue(Promise.resolve({status: 403}))
        const result = await thunk.callThunk()
      
        expect(result.meta.requestStatus).toBe('rejected')
    })
})