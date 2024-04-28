import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { deleteProjectStage } from './deleteStage'

describe('deleteStage.test', () => {
    test('success', async () => {
        const data = {data: {
            deleteProjectStage: {
                _id: '1',
            }
        }}

        const thunk = new TestAsyncThunk(deleteProjectStage)
        thunk.api.post.mockReturnValue(Promise.resolve({data}))

        const result = await thunk.callThunk('1')

        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(data.data.deleteProjectStage)
    })
})
test('fetch error', async () => {
    const thunk = new TestAsyncThunk(deleteProjectStage)
    thunk.api.post.mockReturnValue(Promise.resolve({status: 403}))
    const result = await thunk.callThunk('1')
    expect(thunk.api.post).toHaveBeenCalled()
    expect(result.meta.requestStatus).toBe('rejected')
})