import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { getProductById } from './getProductById'

describe('getProductById.test', () => {
    test('success', async () => {
        const data = {data: {
            product: {
                _id: '1',
                name: 'Product 1'
            }
        }}

        const thunk = new TestAsyncThunk(getProductById)
        thunk.api.post.mockReturnValue(Promise.resolve({data}))

        const result = await thunk.callThunk('1')

        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(data.data.product)
    })
    test('fetch error', async () => {
        const thunk = new TestAsyncThunk(getProductById)
        thunk.api.post.mockReturnValue(Promise.resolve({status: 403}))

        const result = await thunk.callThunk('1')

        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('rejected')
    })
})