import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { deleteEventType } from './deleteEventType'

describe('deleteEventType', () => {
    test('success', async () => {
        const data = {
            data: {
                deleteEventType: {
                    id: '643c34fj3ytg43e22868a6eb63c'
                }
            }
        }

        const thunk = new TestAsyncThunk(deleteEventType)
        thunk.api.post.mockReturnValue(Promise.resolve({data}))

        const result = await thunk.callThunk('643c34fj3ytg43e22868a6eb63c')

        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(data.data.deleteEventType)
    })
    test('error fetch', async () => {

        const thunk = new TestAsyncThunk(deleteEventType)
        thunk.api.post.mockReturnValue(Promise.resolve({status: 403}))

        const result = await thunk.callThunk('643c34fj3ytg43e22868a6eb63c')

        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('rejected')
    })
})