import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { fetchAllProducts } from './fetchAllProducts'

describe('fetchAllProducts.test', () => {
    test('success', async () => {
        const data = {data: {
            products: [
                {
                    _id: '1',
                    name: 'Product 1'
                },
                {
                    _id: '2',
                    name: 'Product 2'
                }
            ]
        }}

        const thunk = new TestAsyncThunk(fetchAllProducts)
        thunk.api.post.mockReturnValue(Promise.resolve({data}))

        const result = await thunk.callThunk({resParams: '_id name'})

        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(data.data.products)
    })
    test('fetch error', async () => {
        const thunk = new TestAsyncThunk(fetchAllProducts)
        thunk.api.post.mockReturnValue(Promise.resolve({status: 403}))

        const result = await thunk.callThunk({resParams: '_id name'})

        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('rejected')
    })
})