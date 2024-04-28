import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { updateProfilePassword } from './updateProfilePassword'

describe('updateProfilePassword.test', () => {
    test('success', async () => {
        const data = {
            data: {
                updatePass: {
                    pass: 'password'
                }
            }
        }

        const thunk = new TestAsyncThunk(updateProfilePassword)
        thunk.api.post.mockReturnValue(Promise.resolve({data}))

        const result = await thunk.callThunk('password')

        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(data.data.updatePass)
    })
    test('error fetch', async () => {
        const thunk = new TestAsyncThunk(updateProfilePassword)
        thunk.api.post.mockReturnValue(Promise.resolve({status: 403}))
        const result = await thunk.callThunk('password')
        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('rejected')
    })
})